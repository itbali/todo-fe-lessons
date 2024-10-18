import {api} from "../../../app/api.ts";
import {TTodoItem} from "../model/todoItem.type.ts";

export const todosApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTodos: builder.query<TTodoItem[], void>({
            query: () => 'todos',
            providesTags: ['Todo']
        }),
        getTodosInfo: builder.query<TTodoItem, string>({
            query: (id) => ({
                url: `/todos/${id}/`,
                method: 'GET',
            }),
            providesTags: ['Todo']
        }),
        deleteTodos: builder.mutation<TTodoItem, string>({
            query: (id) => ({
                url: `/todos/${id}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo']
        }),
        createTodos: builder.mutation<TTodoItem, { title: string, description: string }>({
            query: ({title, description}) => ({
                url: '/todos/',
                method: 'POST',
                body: {
                    title: title,
                    description: description,
                }
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodos: builder.mutation<TTodoItem, {
            id: string,
            completed: boolean,
        }>({
            query: ({id, completed}) => ({
                url: `/todos/${id}/`,
                method: 'PATCH',
                body: {
                    completed: completed,
                }
            }),
            invalidatesTags: ['Todo']
        }),
        changeTodos: builder.mutation<TTodoItem, {
            id: string,
            title: string,
            description: string
        }>({
            query: ({id, title, description}) => ({
                url: `/todos/${id}/`,
                method: 'PATCH',
                body: {
                    title: title,
                    description: description,
                }
            }),
            invalidatesTags: ['Todo']
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetTodosQuery,
    useCreateTodosMutation,
    useDeleteTodosMutation,
    useUpdateTodosMutation,
    useChangeTodosMutation,
    useGetTodosInfoQuery,
} = todosApi