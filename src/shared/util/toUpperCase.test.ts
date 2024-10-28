import {describe, expect, test} from 'vitest'
import { toUpperCase } from "./toUpperCase.ts"

describe('to upper cases function should', () => {
    test('return BIG text if provided', () => {
        expect(toUpperCase('big')).toBe("BIG")
        expect(toUpperCase()).toBeTypeOf("string")
        expect(toUpperCase()).not.toBeUndefined()
    })
    test('work fine without input', () => {
        expect(toUpperCase()).toBeTypeOf("string")
    })
    test('shou match snapshot',()=>{
        expect(toUpperCase('bob')).toMatchInlineSnapshot(`"BOB"`)
    })
})

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))