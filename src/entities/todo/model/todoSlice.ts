import { createSlice } from '@reduxjs/toolkit'

type TTodo = {
    _id: string,
    title: string,
    completed: boolean,
    description: string,
    createdAt: string,
    updatedAt: string
}

type TTodoSlice = {
    todos: TTodo[],
    error: string,
}

const initialTodoState:TTodoSlice = {
    todos: [{
        _id: "id1",
        title: "title1",
        completed: false,
        description: "description1",
        createdAt: "2024-08-21T12:00:00Z",
        updatedAt: "2024-08-21T12:00:00Z"
    },
        {
            _id: "id2",
            title: "title2",
            completed: false,
            description: "description2",
            createdAt: "2024-08-21T12:00:00Z",
            updatedAt: "2024-08-21T12:00:00Z"
        }],
    error: '',
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState: initialTodoState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo._id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo._id !== action.payload)
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
    selectors: {
        selectTodos: state => state.todos,
        selectError: state => state.error,
    }
})

export const { addTodo, toggleTodo, removeTodo, setError } = todosSlice.actions;
export const { selectTodos, selectError } = todosSlice.selectors;
