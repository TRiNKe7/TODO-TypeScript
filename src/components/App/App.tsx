import React, {FC} from "react";
import styles from "./App.module.scss";
import TodoWrapper from "../todo-wrapper/todo-wrapper.component";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.App}>
        <TodoWrapper/>
      </div>
    </DndProvider>
  );
};

export default App;
