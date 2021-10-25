import React, { ChangeEvent, FC } from "react";
import { DataInterface } from "../../../components/todo-wrapper/todo-wrapper.component";

export interface SearchInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchProps {
  searchContainerClassName: string;
  buttonClassName: string;
  buttonChildren: React.ReactNode;
  buttonOnClick: () => void;
  searchBoxClassName: string;
  searchBoxProps: SearchInputProps;
  resultBoxClassName: string;
  resultData: DataInterface[];
  resultItemClassName: string;
  resultBoxWaitingText: string;
}

const Search: FC<SearchProps> = ({
  searchContainerClassName,
  buttonClassName,
  buttonChildren,
  buttonOnClick,
  searchBoxClassName,
  searchBoxProps: { value, onChange},
  resultBoxClassName,
  resultData,
  resultItemClassName,
  resultBoxWaitingText,
}) => {
  return (
    <div className={searchContainerClassName}>
      <button onClick={buttonOnClick} className={buttonClassName}>
        {buttonChildren}
      </button>
      <div className={searchBoxClassName}>
        <input type="text" value={value} onChange={onChange} />
      </div>
      <div className={resultBoxClassName}>
        {resultData.length === 0 && (
          <span className={resultItemClassName}>{resultBoxWaitingText}</span>
        )}
        {resultData.length > 0 &&
          resultData.map(({ id, title }) => (
            <span key={id} className={resultItemClassName}>
              {title}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Search;