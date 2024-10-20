import {createSlice} from '@reduxjs/toolkit'
import {TTodoItem} from "./todoItem.type.ts";
import {testTodo} from "./todoArray.ts";

type TTodoSlice = {
    todos: TTodoItem[],
    error: string
}

const initialTodoState: TTodoSlice = {
    todos: testTodo,
    error: '',
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState: initialTodoState,
    reducers: {
        setAddTodo: (state, action) => {
            state.todos = [...state.todos, action.payload]
        },
        setDeleteTodo: (state, action) => {
            state.todos = state.todos.filter(t => t._id !== action.payload._id)
        },
        setUpdateTodo: (state, action) => {
            state.todos = state.todos.map(t => t._id === action.payload._id ? action.payload : t)
        }
    },
    selectors: {
        selectTodos: (state) => state.todos
    }
})

export const {setAddTodo, setUpdateTodo, setDeleteTodo} = todoSlice.actions
export const {selectTodos} = todoSlice.selectors