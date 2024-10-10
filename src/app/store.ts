import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "../entities/user/model/userSlice.ts";
import {todosSlice} from "../entities/todo/model/todoSlice.ts";

export const rootStore = configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer,
        [todosSlice.name]: todosSlice.reducer
    }
})