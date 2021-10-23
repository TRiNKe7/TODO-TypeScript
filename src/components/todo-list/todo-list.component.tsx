import React, { FC, MouseEvent } from "react";
import styles from "./todo-list.module.scss";
import { DataInterface } from "../todo-wrapper/todo-wrapper.component";
import TodoListItem from "../todo-list-item/todo-list-item.component";
import { useDrag } from "react-dnd";
import TodoListDroppableWrapper from "../todo-list-droppable-wrapper/todo-list-droppable-wrapper.component";

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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TO-DO",
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));
  return (
    <div className={styles.todoList}>
      <button
        className={styles.SearchTodoButton}
        onClick={handleShowingModalWindowCallBack}
      >
        Search for TO-DO
      </button>
      <div className={styles.header}>
        <span>{title}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.todoDataBox}>
          {data.length > 0 ? (
            data.map(({ id, title }) => (
              <TodoListDroppableWrapper
                itemId={id}
                className={`${styles.itemWrapper}`}
                deleteButtonClassName={`${styles.itemDeleteButton}`}
                onClick={deleteListElementCallBack}
                children={
                  <TodoListItem
                    drag={drag}
                    key={id}
                    className={`${styles.listElement}`}
                    title={title}
                    titleClassName={`${styles.itemTitle}`}
                    draggingClassName={`${styles.draggingItem}`}
                    isDragging={isDragging}
                  />
                }
              />
            ))
          ) : (
            <div className={styles.listElement}>
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
