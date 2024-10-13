import {RootState} from "../../../../app/store.ts";

export const selectTodoById = (id: string | undefined) => (state: RootState) => {
    return state.todo.todos.find(t => t._id === id)
}