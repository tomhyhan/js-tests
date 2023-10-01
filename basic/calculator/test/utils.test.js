const {add, mul, sub,div} = require('../utils');

describe("utility functions for creating calculator", () => {
    test("3 + 5 is 8", () => {
        expect(add(3,5)).toBe(8)
    })
    
    test("3 - 5 is -2", () => {
        expect(sub(3,5)).toBe(-2)
    })
    
    test("3 * 5 is 15", () => {
        expect(mul(3,5)).toBe(15)
    })

    test("3 / 5 is 0.6", () => {
        expect(div(3,5)).toBeCloseTo(0.6)
    })

    test("3 / 0 to thorw an error", () => {
        expect(() => {
            div(3,0)
        }).toThrow("Can not divide by 0")
    })
}) 

