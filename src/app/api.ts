import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from "./store.ts";

export const api = createApi({
    reducerPath: 'rootApi',
    tagTypes: ['Todo'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://todos-be.vercel.app/',
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).user.user?.access_token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers;
        }
    }),
    endpoints: () => ({}),
})