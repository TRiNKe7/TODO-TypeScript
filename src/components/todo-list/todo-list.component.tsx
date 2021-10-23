import React, { FC, MouseEvent } from "react";
import styles from "./todo-list.module.scss";
import { DataInterface } from "../todo-wrapper/todo-wrapper.component";
import DeleteIcon from "../../assets/icons/delete-icon";

interface Props {
  title: string;
  data: DataInterface[];
  cleanButtonTitle: string;
  cleanButtonCallback: () => void;
  deleteListElementCallBack: (event: MouseEvent<HTMLDivElement>) => void;
}

const TodoList: FC<Props> = ({
  title,
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
      <div className={styles.cleanButtonArea}>
        <button onClick={cleanButtonCallback}>{cleanButtonTitle} <DeleteIcon /></button>
      </div>
      <div className={styles.box}>
        {data.map(({ id, title }) => {
          return (
            <div key={id} className={styles.listElement}>
              {title}
              <div className={styles.deleteItem} id={`${id}`} onClick={deleteListElementCallBack}>
                <DeleteIcon id={`${id}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;
