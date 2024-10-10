import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from "../entities/user/model/userSlice.ts";
import {todoSlice} from "../entities/todo/model/todoSlice.ts";

export const rootStore =  configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [todoSlice.name]: todoSlice.reducer
    }
})