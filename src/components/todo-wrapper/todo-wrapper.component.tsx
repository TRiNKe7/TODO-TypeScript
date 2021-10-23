import React, { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import styles from "./todo-wrapper.module.scss";
import SearchBarModalWindow from "../search-bar-modal-window/search-bar-modal-window.component";
import InteractionArea from "../interaction-area/interaction-area.component";
import TodoList from "../todo-list/todo-list.component";
import {fakeTodoData} from "../../__mocks__/search-result-data";

export interface DataInterface {
  id: number;
  title: string;
}

const TODO_LIST_TITLE = "There's your TO-DO List:";
const TODO_LIST_CLEAN_BUTTON_AREA_TITLE = "Wash me please!";
const INTERACTION_AREA_INFO_TITLE_TEXT = `Press "Enter" to add this TO-DO`;
const SEARCH_BAR_BUTTON_TEXT = "Search";
const EMPTY_TODO_LIST_BOX_TITLE = "Waiting for TO-DO...";

const TodoWrapper = () => {
  const [
    isSearchBarModalWindowOpen,
    setIsSearchBarModalWindowOpen,
  ] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<DataInterface[]>([]);
  const [searchResult, setSearchResult] = useState<DataInterface[]>(fakeTodoData);
  const [value, setValue] = useState<string>("");
  const [searchBarValue, setSearchBarValue] = useState<string>("");

  const handleShowingModalWindowCallBack = useCallback(
    (event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLElement>) => {
      setIsSearchBarModalWindowOpen((prevState) => !prevState);
    },
    []
  );

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
      let resultUpdate = todoList.filter((el) => {
        return el.title.toLowerCase().search(searchBarValue.toLowerCase()) > 0;
      });
      setSearchResult((prevState) => [...prevState, ...resultUpdate]);
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
      {isSearchBarModalWindowOpen && (
        <SearchBarModalWindow
          handleShowingModalWindowCallBack={handleShowingModalWindowCallBack}
          searchBarValue={searchBarValue}
          handleInputCallBack={handleSearchBarValue}
          handleSearchButtonCallBack={handleSearchingProcess}
          searchButtonText={SEARCH_BAR_BUTTON_TEXT}
          searchResult={searchResult}
        />
      )}
      <TodoList
        title={TODO_LIST_TITLE}
        emptyBoxTitle={EMPTY_TODO_LIST_BOX_TITLE}
        data={todoList}
        cleanButtonTitle={TODO_LIST_CLEAN_BUTTON_AREA_TITLE}
        cleanButtonCallback={cleanAllList}
        deleteListElementCallBack={deleteListElement}
        handleShowingModalWindowCallBack={handleShowingModalWindowCallBack}
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
