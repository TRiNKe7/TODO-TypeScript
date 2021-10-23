import React, { ChangeEvent, FC, MouseEvent } from "react";
import { DataInterface } from "../todo-wrapper/todo-wrapper.component";
import styles from "./search-bar-modal-window.module.scss";

interface SearchBarModalWindowProps {
  handleShowingModalWindowCallBack: (
    event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLElement>
  ) => void;
  searchBarValue: string;
  searchResult: DataInterface[];
  handleInputCallBack: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSearchButtonCallBack: () => void;
  searchButtonText: string;
}

const SearchBarModalWindow: FC<SearchBarModalWindowProps> = ({
  handleShowingModalWindowCallBack,
  searchBarValue,
  handleInputCallBack,
  handleSearchButtonCallBack,
  searchButtonText,
  searchResult,
}) => {
  // const searchForTodoViaKeyDown = (event: KeyboardEvent) =>
  //   handleSearchButtonCallBack();
  return (
    <div onClick={handleShowingModalWindowCallBack} className={styles.ModalWindowBox}>
      <div className={styles.searchBox}>
        <div className={styles.searchBarContainer}>
          <input
            value={searchBarValue}
            type={"text"}
            onChange={handleInputCallBack}
            // onKeyDown={searchForTodoViaKeyDown}
          />
          {searchBarValue.length > 0 ?? <span>Clean</span>}
          <button onClick={handleSearchButtonCallBack}>
            {searchButtonText}
          </button>
        </div>
      </div>
      {searchResult.length > 0 ?? (
        <div className={styles.resultBox}>
          {searchResult.map((el) => (
            <span key={el.id}>{el.title}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarModalWindow;