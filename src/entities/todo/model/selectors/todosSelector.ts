import {TodoState} from "../todoStore.ts";

export const todosSelector = (state: TodoState) => {
    return state.todos
}