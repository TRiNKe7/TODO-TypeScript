import React, { ChangeEvent, FC, KeyboardEvent } from "react";
import styles from "./interaction-area.module.scss";

interface Props {
  inputValue: string;
  handleInputCallBack: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddTodoValueInList: () => void;
  infoTitleText: string;
}

const InteractionArea: FC<Props> = ({
  inputValue,
  handleInputCallBack,
  handleAddTodoValueInList,
  infoTitleText,
}) => {
  const addTodoViaKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleAddTodoValueInList();
    }
    return;
  };
  return (
    <div className={styles.interactionArea}>
      <input
        value={inputValue}
        onChange={handleInputCallBack}
        onKeyPress={addTodoViaKeyPressHandler}
      />
      <span className={styles.infoTitle} onClick={handleAddTodoValueInList}>{infoTitleText}</span>
    </div>
  );
};

export default InteractionArea;
