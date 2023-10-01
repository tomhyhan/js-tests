const calculator = require("../calc")

describe("calculator", () => {
    test("( 1 + 2 ) * ( 3 * ( 4 + 5 ) ) equals to 81",() => {
        expect(calculator("( 1 + 2 ) * ( 3 * ( 4 + 5 ) )")).toBe(81)
    })

    test("1 / 0",() => {
        expect(() => {
            console.log(calculator("1 / 0"))
        }).toThrow("Can not divide by 0")
    })
    
})
