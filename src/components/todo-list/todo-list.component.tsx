import React, { FC, MouseEvent } from "react";
import styles from "./todo-list.module.scss";
import { DataInterface } from "../todo-wrapper/todo-wrapper.component";
import DeleteIcon from "../../assets/icons/delete-icon";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

interface Props {
  title: string;
  data: DataInterface[];
  cleanButtonTitle: string;
  cleanButtonCallback: () => void;
  deleteListElementCallBack: (event: MouseEvent<HTMLDivElement>) => void;
  onDragEnd: (result: DropResult) => void;
}

const TodoList: FC<Props> = ({
  title,
  data,
  cleanButtonCallback,
  cleanButtonTitle,
  deleteListElementCallBack,
  onDragEnd,
}) => {
  return (
    <div className={styles.todoList}>
      <div className={styles.header}>
        <span>{title}</span>
      </div>
      <div className={styles.cleanButtonArea}>
        <button onClick={cleanButtonCallback}>
          {cleanButtonTitle} <DeleteIcon />
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"To-DO"}>
          {(provided) => (
            <div
              className={styles.box}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.map(({ id, title }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided1, snapshot) => (
                    <div
                      ref={provided1.innerRef}
                      {...provided1.draggableProps}
                      {...provided1.dragHandleProps}
                      key={id}
                      className={`${styles.listElement} ${snapshot.isDragging && styles.dragging}`}
                    >
                      <p>{title}</p>
                      <div
                        className={styles.deleteItem}
                        id={`${id}`}
                        onClick={deleteListElementCallBack}
                      >
                        <DeleteIcon id={`${id}`} />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TodoList;
