import React, { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import styles from "./todo-wrapper.module.scss";
import TodoList from "../todo-list/todo-list.component";
import InteractionArea from "../interaction-area/interaction-area.component";
import SearchBar from "../search-bar/search-bar.component";

export interface DataInterface {
  id: number;
  title: string;
}

const TODO_LIST_TITLE = "There's your TO-DO List";
const TODO_LIST_CLEAN_BUTTON_AREA_TITLE = "Wash me please!";
const INTERACTION_AREA_INFO_TITLE_TEXT = `Press "Enter" to add this TO-DO`;
const SEARCH_BAR_BUTTON_TEXT = "Search TO-DO";
const EMPTY_TODO_LIST_BOX_TITLE = "Waiting for TO-DO..."

const TodoWrapper = () => {
  const [todoList, setTodoList] = useState<DataInterface[]>([]);
  const [value, setValue] = useState<string>("");
  const [searchBarValue, setSearchBarValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<DataInterface[]>([{id: 1, title: "suka"}])

  const handleInputValue = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setValue(target.value);
    },
    []
  );

  const handleSearchBarValue = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearchBarValue(target.value);
    },
    []
  );


  const handleAddTodoValueInList = useCallback(() => {
    if (value.length > 0) {
      setTodoList((prev) => prev.concat([{ id: Math.random(), title: value }]));
      setValue("");
    }
  }, [value]);

  const handleSearchingProcess = useCallback(() => {
    if (searchBarValue.length > 0) {
      setSearchResult(
        todoList.filter((el) => {
          return (
            el.title
              .split("", searchBarValue.length)
              .slice()
              .map((el) => el.toLowerCase())
              .join("") ===
            searchBarValue
              .split("")
              .map((el) => el.toLowerCase())
              .join("")
          );
        })
      );
    }
  }, [searchBarValue, todoList]);

  const cleanAllList = useCallback(() => {
    setTodoList([]);
  }, []);

  const deleteListElement = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setTodoList(
        todoList.filter(
          ({ id }) => id !== +(event.target as HTMLButtonElement).id
        )
      );
    },
    [todoList]
  );

  return (
    <div className={`${styles.todoWrapper}`}>
      <SearchBar
        value={searchBarValue}
        handleInputCallBack={handleSearchBarValue}
        handleSearchButtonCallBack={handleSearchingProcess}
        searchButtonText={SEARCH_BAR_BUTTON_TEXT}
        searchResult={searchResult}
      />
      <TodoList
        title={TODO_LIST_TITLE}
        emptyBoxTitle={EMPTY_TODO_LIST_BOX_TITLE}
        data={todoList}
        cleanButtonTitle={TODO_LIST_CLEAN_BUTTON_AREA_TITLE}
        cleanButtonCallback={cleanAllList}
        deleteListElementCallBack={deleteListElement}
      />
      <InteractionArea
        inputValue={value}
        handleInputCallBack={handleInputValue}
        handleAddTodoValueInList={handleAddTodoValueInList}
        infoTitleText={INTERACTION_AREA_INFO_TITLE_TEXT}
      />
    </div>
  );
};

export default TodoWrapper;
