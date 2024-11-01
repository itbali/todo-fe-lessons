import {describe, expect, it, vi} from "vitest";
import {render, screen, fireEvent, act} from '@testing-library/react'
import UserInfo from "./UserInfo.tsx";
import {rootStore} from "../../../app/store.ts";
import {Provider} from "react-redux";
import {setUser} from "../model/userSlice.ts";

describe('UserInfo page',()=>{
    it('should render component with user data', ()=>{
        rootStore.dispatch(setUser({     access_token: '123',     username: "JOHN" }))

        const rendered = render(
            <Provider store={rootStore}>
                <UserInfo />
            </Provider>
        )

        // expect(screen.getByTestId('username')).toBeDefined()
        // expect(screen.getByTestId('token')).toBeDefined()

        expect(rendered.baseElement).toMatchSnapshot()
    })
})