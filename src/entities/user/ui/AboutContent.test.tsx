import {describe, expect, it} from "vitest";
import {render} from '@testing-library/react'
import AboutContent from "./AboutContent.tsx"

describe('About content page', () => {
    it('should render component', () => {
        const rendered = render(<AboutContent/>)
        expect(rendered.baseElement).toMatchSnapshot()
    })
})