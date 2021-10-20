import React, {FC, useEffect, useReducer, useState} from 'react'
import styles from "./App.module.scss";
import {AppProps} from "../../Interfaces/AppProps";
import {ITodo} from "../../Interfaces/ITodo";
import {TodosReducer} from "../../Reducer/TodoReducer";


const App: FC<AppProps> = () => {
  const [state, dispatch] = useReducer(TodosReducer, {todos: []});
  const [inputValue, setInputValue] = useState<string>('');
  const [TodoListHidden, setTodoListShownMode] = useState<boolean>(false);

  useEffect(()=>{}, [state])

  const addTodoHandler = () => {
    dispatch({type: 'addTodo', payload: {id: state.todos ? state.todos.length : 0, text: inputValue, done: false}});
    setInputValue('');
  }
  const deleteTodosHandler = () => {
    dispatch({type: 'delete', payload: {id: 1, text: inputValue, done: false}})
  }

  const pressingEnter = (e: React.KeyboardEvent) =>{
    if( e.key == 'Enter') {
      addTodoHandler();
    }
  }
  const HidingTodosHandler = (e: React.MouseEvent<HTMLElement>) => {
    setTodoListShownMode(true)
  }
  return (
      <div className={styles.App}>
        <div className={styles.TodoList + ' ' + TodoListHidden ?? styles.menuHidden}>
          <span>There's your TO-DO List</span>
          <div className={styles.TODOs}>
            {state.todos.map((todo: ITodo) => <span className={styles.Todo + ' ' + todo.done ?? styles.done}>{todo.text}</span>)}
          </div>
          <span onClick={deleteTodosHandler}>Clean all TO-DOs</span>
        </div>
        <main onMouseOver={HidingTodosHandler}>
          <div className={styles.ToDoMaker}>
            <input onKeyPress={pressingEnter} value={inputValue} onChange={text => setInputValue(text.target.value)} className={styles.ToDoInput} type="text" placeholder='Enter here your ToDo'/>
            <button onClick={addTodoHandler} className={styles.enterToDo}>Save</button>
          </div>
        </main>
      </div>
  );
}

export default App;
