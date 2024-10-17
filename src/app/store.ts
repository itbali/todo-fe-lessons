import {configureStore} from '@reduxjs/toolkit'
import {userSlice} from "../entities/user/model/userSlice.ts";
import {todoSlice} from "../entities/todo/model/todoSlice.ts";
import {api} from "./api.ts";

export const rootStore = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [todoSlice.name]: todoSlice.reducer,
        [api.reducerPath]: api.reducer,
    }, middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof rootStore.getState>