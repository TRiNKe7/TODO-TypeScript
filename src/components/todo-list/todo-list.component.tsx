import React, {FC, MouseEvent} from 'react'
import styles from './todo-list.module.scss'
import {DataInterface} from "../todo-wrapper/todo-wrapper.component";


interface Props {
    title: string;
    data: DataInterface[]
    cleanButtonTitle: string;
    cleanButtonCallback: () => void
    deleteListElementCallBack: (event: MouseEvent<HTMLButtonElement>) => void
}

const TodoList: FC<Props> = ({title, data, cleanButtonCallback, cleanButtonTitle, deleteListElementCallBack}) => {
    return(
        <div className={styles.todoList}>
            <div className={styles.header}>
                <span>{title}</span>
            </div>

            <div className={styles.box}>
                {data.map(({id, title}) => {
                    return <div key={id} className={styles.listElement}>{title}
                    <button id={`${id}`} onClick={deleteListElementCallBack} >DELETE</button>
                    </div>
                })}
            </div>
            <div className={styles.cleanButtonArea}>
                <button onClick={cleanButtonCallback}>{cleanButtonTitle}</button>
            </div>
        </div>
    )
}


export default TodoList