const {calculator, evaluate, tokenize} = require("../calc")

describe("tokenize", () => {
    test("throw error if expression is invalid", () => {
        expect(() => {
            tokenize("1 + 2 & 5 ")
        }).toThrow("not a valid expression")
    })

    test("throw error if no space between expression tokens", () => {
        expect(() => {
            tokenize("(1 + 2) * 5 ")
        }).toThrow("not a valid token!")
    })

    test("1 + 2 * 5 correctly tokenize to ['1','2','5','*','+']" ,() => {
        expect(tokenize("1 + 2 * 5")).toStrictEqual(['1','2','5','*','+'])
    })
})

describe("evaluate", () => {
    test("['1','2','5','*','+'] evaluated to 11",()=> {
        expect(evaluate(['1','2','5','*','+'])).toBe(11)
    })
})


describe("calculator", () => {
    test("( 1 + 2 ) * ( 3 * ( 4 + 5 ) ) calculates to 81",() => {
        expect(calculator("( 1 + 2 ) * ( 3 * ( 4 + 5 ) )")).toBe(81)
    })
})
