import { create } from 'zustand'
import {testTodo} from "./todoArray.ts";
import {TTodoItem} from "./todoItem.type.ts";
import {persist} from 'zustand/middleware'

export interface TodoState {
    todos: TTodoItem[]
    updateTodo: (todo: TTodoItem) => void
    deleteTodo: (id:string) => void
    addTodo: (newTodo: TTodoItem) => void
}

const useTodosStore = create<TodoState>()(
    persist((set) => ({
    todos: testTodo,
    updateTodo: (todo) => set((state) => ({ todos: state.todos.map((t) => t._id === todo._id ? todo : t )})),
    deleteTodo: (id:string) => set((state) => ({todos: state.todos.filter((t) => t._id !== id),})),
    addTodo: (newTodo: TTodoItem) => set((state) => ({todos: [...state.todos, newTodo],})),
}), {name: "todos"})
)

export default useTodosStore;