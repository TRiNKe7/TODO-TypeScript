import React, { FC, MouseEvent } from "react";
import styles from "./todo-list.module.scss";
import { DataInterface } from "../todo-wrapper/todo-wrapper.component";

interface Props {
  title: string;
  emptyBoxTitle: string;
  data: DataInterface[];
  cleanButtonTitle: string;
  cleanButtonCallback: () => void;
  deleteListElementCallBack: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TodoList: FC<Props> = ({
  title,
  emptyBoxTitle,
  data,
  cleanButtonCallback,
  cleanButtonTitle,
  deleteListElementCallBack,
}) => {
  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <span>{title}</span>
      </div>
      <div className={styles.box}>
        {data.length > 0 ? (
          data.map(({ id, title }, index) => {
            return (
              <div key={id} className={styles.listElement}>
                <span className={styles.itemTitle}>{title}</span>
                <button
                  className={styles.itemDeleteButton}
                  id={`${id}`}
                  onClick={deleteListElementCallBack}
                >
                  DELETE
                </button>
              </div>
            );
          })
        ) : (
          <div className={`${styles.listElement} ${styles.emptyBoxTitle}`}>
            {emptyBoxTitle}
          </div>
        )}
      </div>
      <div className={styles.cleanButtonArea}>
        <button onClick={cleanButtonCallback}>{cleanButtonTitle}</button>
      </div>
    </div>
  );
};

export default TodoList;
