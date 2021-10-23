import React, {ChangeEvent, FC, KeyboardEvent} from "react";
import styles from "./interaction-area.module.scss";
import PlusIcon from "../../assets/icons/plus-icon";

interface Props {
  inputValue: string;
  handleInputCallBack: (event: ChangeEvent<HTMLInputElement>) => void;
  addButton: () => void;
  addButtonText: string;
}

const InteractionArea: FC<Props> = ({inputValue, handleInputCallBack, addButton}) => {
  const handleTodoAddingOnKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Enter" || event.location === 3) {
      addButton();
    }
  };
  return (
    <div className={styles.Container}>
      <input onKeyPress={handleTodoAddingOnKeyDown} value={inputValue} onChange={handleInputCallBack}/>
      <button onClick={addButton}><PlusIcon/></button>
    </div>
  )
}

export default InteractionArea