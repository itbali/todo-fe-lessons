import { createSlice } from '@reduxjs/toolkit'

type TUser = {access_token:string, username: string}

type TUserSlice = {
    user?: TUser,
    isLoggedIn: boolean,
    error: string,
}

const  initialUserState : TUserSlice = {
        user: undefined,
        isLoggedIn: false,
        error: '',
    }

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = undefined
            state.isLoggedIn = false
        }
    },
    selectors: {
        selectUser: (state) => state.user,
        selectIsLoggendIn: (state) => state.isLoggedIn,
        selectError: (state) => state.error,
    }
})

// Action creators are generated for each case reducer function
export const { setIsLoggedIn, logout, setUser } = userSlice.actions;
export const {selectUser, selectIsLoggendIn, selectError} = userSlice.selectors

