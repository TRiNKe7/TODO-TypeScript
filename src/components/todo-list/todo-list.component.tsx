import React, { FC, MouseEvent } from "react";
import styles from "./todo-list.module.scss";
import { DataInterface } from "../todo-wrapper/todo-wrapper.component";
import TodoListItem from "../todo-list-item/todo-list-item.component";

interface Props {
  title: string;
  emptyBoxTitle: string;
  data: DataInterface[];
  cleanButtonTitle: string;
  cleanButtonCallback: () => void;
  deleteListElementCallBack: (event: MouseEvent<HTMLButtonElement>) => void;
  handleShowingModalWindowCallBack: (
    event: MouseEvent<HTMLButtonElement>
  ) => void;
}

const TodoList: FC<Props> = ({
  title,
  emptyBoxTitle,
  data,
  cleanButtonCallback,
  cleanButtonTitle,
  deleteListElementCallBack,
  handleShowingModalWindowCallBack,
}) => {
  return (
    <div className={styles.todoList}>
      <button className={styles.SearchTodoButton} onClick={handleShowingModalWindowCallBack}>Search for TO-DO</button>
      <div className={styles.header}>
        <span>{title}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.todoDataBox}>
          {data.length > 0 ? (
            data.map(({ id, title }) => (
              <TodoListItem
                key={id}
                className={`${styles.listElement}`}
                title={title}
                titleClassName={`${styles.itemTitle}`}
                deleteButtonClassName={`${styles.itemDeleteButton}`}
                onClick={deleteListElementCallBack}
                draggingClassName={`${styles.draggingItem}`}
              />
            ))
          ) : (
            <div className={`${styles.listElement} ${styles.emptyBoxTitle}`}>
              {emptyBoxTitle}
            </div>
          )}
        </div>
      </div>
      <div className={styles.cleanButtonArea}>
        <button onClick={cleanButtonCallback}>{cleanButtonTitle}</button>
      </div>
    </div>
  );
};

export default TodoList;
