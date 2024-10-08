import {create} from 'zustand'
import {testTodo} from "./todoArray.ts";
import {TTodoItem} from "./TTodoItem.ts";

export interface TodoState {
    todos: TTodoItem[]
    updateTodo: (todo: TTodoItem) => void
    deleteTodo: (id: string) => void
    addTodo: (newTodo: {
        createdAt: string;
        description: string;
        _id: string;
        completed: boolean;
        title: string;
        updatedAt: string
    }) => void
}

const useTodosStore = create<TodoState>((set) => ({
    todos: testTodo,
    updateTodo: (todo) => set((state) => ({todos: state.todos.map(t => t._id === todo._id ? todo : t)})),
    deleteTodo: (id) => set((state) => ({todos: state.todos.filter(t => t._id !== id)})),
    addTodo: (newTodo) => set((state) => ({todos: [...state.todos, newTodo]}))
}))

export default useTodosStore;
