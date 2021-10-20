import React, {ChangeEvent, MouseEvent, useCallback, useState} from 'react';
import styles from './todo-wrapper.module.scss'
import TodoList from "../todo-list/todo-list.component";
import InteractionArea from "../interaction-area/interaction-area.component";


export interface DataInterface{
    id: number;
    title: string;
}

const TODO_LIST_TITLE = 'GRISHA LIST!!!'
const TODO_LIST_CLEAN_BUTTON_AREA_TITLE = "ПОМОЙ МЕНЯ!"
const INTERACTION_AREA_ADD_BUTTON_TEXT = 'Добавить'

const TodoWrapper = () => {
    const [todoList, setTodoList] = useState<DataInterface[]>([])
    const [value, setValue] = useState<string>('');

    const handleInputValue = useCallback(({target}: ChangeEvent<HTMLInputElement>) => {
            setValue(target.value);
        }
        , [])


    const handleAddTodoValueInList = useCallback(() => {
        if(value.length > 0 ){
            setTodoList(prev => prev.concat([{id: Math.random(), title: value}]))
            setValue('')
        }

    }, [value])

    const cleanAllList = useCallback(() => {
            setTodoList([])
    }, [])

    const deleteListElement = useCallback((event: MouseEvent<HTMLButtonElement>) => {

        setTodoList(todoList.filter(({id}) => id !== +(event.target as HTMLButtonElement).id))
    }, [todoList])

    return(
        <div className={styles.todoWrapper}>
            <TodoList title={TODO_LIST_TITLE} data={todoList} cleanButtonTitle={TODO_LIST_CLEAN_BUTTON_AREA_TITLE} cleanButtonCallback={cleanAllList} deleteListElementCallBack={deleteListElement}/>
            <InteractionArea inputValue={value} handleInputCallBack={handleInputValue} addButton={handleAddTodoValueInList} addButtonText={INTERACTION_AREA_ADD_BUTTON_TEXT}/>
        </div>
    )

}

export default TodoWrapper