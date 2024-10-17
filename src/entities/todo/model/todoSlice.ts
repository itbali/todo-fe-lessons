import {createSlice} from '@reduxjs/toolkit'
import {TTodoItem} from "./todoItem.type.ts";

type TTodoSlice = {
    todos: TTodoItem[],
    error: string
}

const initialTodoState: TTodoSlice = {
    todos: [],
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
        },
        setTodos: (state, action) => {
            state.todos = action.payload
        }
    },
    selectors: {
        selectTodos: (state) => state.todos,
        selectError: (state) => state.error
    }
})

export const {setAddTodo, setUpdateTodo, setDeleteTodo, setTodos} = todoSlice.actions
export const {selectTodos, selectError} = todoSlice.selectors