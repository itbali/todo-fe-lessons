import {describe, expect, it} from "vitest";
import {render, screen, fireEvent, act} from '@testing-library/react'
import AboutContent from "./AboutContent.tsx"

describe('About content page',()=>{
    it('should render component', ()=>{
        const rendered = render(<AboutContent />)
        expect(rendered.baseElement).toMatchSnapshot()
        // expect(screen.getByText('About')).toBeDefined()
        // const button = screen.getByText('show')
        //
        // expect(button).toBeDefined()
        //
        // act(()=>{
        //     fireEvent.click(button)
        // })
        //
        // expect(screen.getByText('This is simple ToDo application')).toBeDefined()
    })
})