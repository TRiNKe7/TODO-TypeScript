import {IAction, IState} from "../Interfaces/IState";


export const TodosReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case 'addTodo':
      return action.payload.text !== '' ? {todos: [...state.todos, action.payload]} : state;
      break;

    case 'delete':
      return {todos: []};
      break;
    default:
      return state;
  }
}



