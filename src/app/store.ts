import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from "../entities/user/model/userSlice.ts";

export const rootStore =  configureStore({
    reducer: {
        [userSlice.name]: userSlice.reducer
    }
})