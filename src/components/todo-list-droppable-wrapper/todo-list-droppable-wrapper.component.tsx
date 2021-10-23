import React, {FC, MouseEvent} from "react";
import { useDrop } from "react-dnd";

interface TodoListDroppableWrapperProps {
  itemId: number;
  className: string;
  deleteButtonClassName: string;
	onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const TodoListDroppableWrapper: FC<TodoListDroppableWrapperProps> = ({
  itemId,
  className,
  deleteButtonClassName,
	onClick,
  children,
}) => {
  const [, drop] = useDrop(
    () => ({
      accept: "TO-DO",
      drop: (item) => {},
    }),
    [itemId]
  );
  return (
    <div ref={drop} className={className}>
      {children}
      <button className={deleteButtonClassName} onClick={onClick}>
        DELETE
      </button>
    </div>
  );
};

export default TodoListDroppableWrapper;
