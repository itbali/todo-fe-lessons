import {RootState} from "../../../../app/store.ts";

export const selectTodoById = (id: string) => (state: RootState) => state.todo.todos.find(t => t._id == id)