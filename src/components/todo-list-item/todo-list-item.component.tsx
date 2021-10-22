import React, { FC, MouseEvent } from "react";
import { useDrag } from "react-dnd";

interface Props {
  className: string;
  titleClassName: string;
  title: string;
  deleteButtonClassName: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  draggingClassName: string;
}

const TodoListItem: FC<Props> = ({
  className,
  titleClassName,
  title,
  onClick,
  deleteButtonClassName,
  draggingClassName,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TO-DO",
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));
  return (
    <div
      ref={drag}
      className={`${className} ${isDragging ?? draggingClassName}`}
    >
      <span className={titleClassName}>
        {title}
      </span>
      <button className={deleteButtonClassName} onClick={onClick}>
        DELETE
      </button>
    </div>
  );
};

export default TodoListItem;
