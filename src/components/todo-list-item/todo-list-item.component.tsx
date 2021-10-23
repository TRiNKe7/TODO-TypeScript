import React, { FC } from "react";
import { ConnectDragSource } from "react-dnd";

interface Props {
  drag: ConnectDragSource;
  className: string;
  titleClassName: string;
  title: string;
  draggingClassName: string;
  isDragging: boolean;
}

const TodoListItem: FC<Props> = ({
  drag,
  className,
  titleClassName,
  title,
  draggingClassName,
  isDragging,
}) => {
  return (
    <div
      ref={drag}
      className={`${className} ${isDragging ?? draggingClassName}`}
    >
      <span className={titleClassName}>{title}</span>
    </div>
  );
};

export default TodoListItem;
