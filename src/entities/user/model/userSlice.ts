import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type TUser = {
    access_token: string,
    username?: string
}

type TUserSlice = {
    user?: TUser,
    isLoggedIn: false,
    error: string
}

const initialUserState:TUserSlice = {
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
        setUser: (state, action: PayloadAction<TUser>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = undefined
            state.isLoggedIn = false
        }
    },
    selectors: {
        selectUser: (state) => state.user,
        selectIsLoggedIn: (state) => state.isLoggedIn,
        selectError: (state) => state.error
    }
})

export const {setIsLoggedIn, setUser, logout} = userSlice.actions
export const {selectUser, selectIsLoggedIn, selectError} = userSlice.selectors