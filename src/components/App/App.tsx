import React, {FC} from 'react'
import styles from "./App.module.scss";


import TodoWrapper from "../todo-wrapper/todo-wrapper.component";


const App: FC = () => {


  return (
      <div className={styles.App}>
          <TodoWrapper/>
      </div>
  );
}

export default App;
