import {ITodo} from "./ITodo";

export interface IState {
  todos: ITodo[];
}

export interface IAction {
  type: string
  payload: ITodo;
}