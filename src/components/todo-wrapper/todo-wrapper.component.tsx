import React, { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import styles from "./todo-wrapper.module.scss";
import TodoList from "../todo-list/todo-list.component";
import InteractionArea from "../interaction-area/interaction-area.component";
import { temporaryToDoData } from "../../__mocks__/fake-todo-data";
import SearchIcon from "../../assets/icons/search-icon";
import Search from "../../shared/components/search-bar/search-bar.component";
import CloseIcon from "../../assets/icons/close-icon";

export interface DataInterface {
  id: number;
  title: string;
}

const TODO_LIST_TITLE = `There's your To-Do list:`;
const TODO_LIST_CLEAN_BUTTON_AREA_TITLE = "Delete all";
const INTERACTION_AREA_ADD_BUTTON_TEXT = "Add";
const RESULT_BOX_WAITING_TEXT = "Nothing was found...";

const TodoWrapper = () => {
  const [searchBarActive, setSearchBarActive] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<DataInterface[]>([]);
  const [todoList, setTodoList] = useState<DataInterface[]>(temporaryToDoData);
  const [value, setValue] = useState<string>("");

  const handleSearchInputValue = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(target.value);
      setSearchResults(
        todoList.filter(({ title }) =>
          title.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    },
    [todoList, searchValue]
  );

  const handleToggleSearchBoxView = () => {
    setSearchBarActive((prevState) => !prevState);
  };

  const handleInputValue = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    []
  );

  const handleAddTodoValueInList = useCallback(() => {
    if (value.length > 0) {
      setTodoList((prev) => prev.concat([{ id: Math.random(), title: value }]));
      setValue("");
    }
  }, [value]);

  const cleanAllList = useCallback(() => {
    setTodoList([]);
  }, []);

  const deleteListElement = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      setTodoList(
        todoList.filter(
          ({ id }) => id !== +(event.target as HTMLButtonElement).id
        )
      );
    },
    [todoList]
  );

  return (
    <div className={styles.todoWrapper}>
      {!searchBarActive && (
        <button
          onClick={handleToggleSearchBoxView}
          className={`${styles.openSearchBar}`}
        >
          <SearchIcon />
        </button>
      )}
      {searchBarActive && (
        <Search
          searchContainerClassName={`${styles.searchContainer}`}
          buttonClassName={styles.searchContainerButton}
          buttonChildren={<CloseIcon />}
          buttonOnClick={handleToggleSearchBoxView}
          searchBoxClassName={`${styles.searchBox}`}
          searchBoxProps={{
            value: searchValue,
            onChange: handleSearchInputValue,
          }}
          resultBoxClassName={`${styles.resultBox}`}
          resultData={searchResults}
          resultItemClassName={`${styles.resultItem}`}
          resultBoxWaitingText={RESULT_BOX_WAITING_TEXT}
        />
      )}
      <InteractionArea
        inputValue={value}
        handleInputCallBack={handleInputValue}
        addButton={handleAddTodoValueInList}
        addButtonText={INTERACTION_AREA_ADD_BUTTON_TEXT}
      />
      <TodoList
        title={TODO_LIST_TITLE}
        data={todoList}
        cleanButtonTitle={TODO_LIST_CLEAN_BUTTON_AREA_TITLE}
        cleanButtonCallback={cleanAllList}
        deleteListElementCallBack={deleteListElement}
      />
    </div>
  );
};

export default TodoWrapper;
