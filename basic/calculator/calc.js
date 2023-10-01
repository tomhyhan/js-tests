const {add,sub,div,mul} = require("./utils.js")

const MATH_OPERATIONS = {
    "+": add,
    "-": sub,
    "*": mul,
    "/": div,
}

function tokenize(expression) {
    const split_expression = expression.split(" ")
    const stack = []
    const tokens = []
    for (const token of split_expression) {
        if (!isNaN(token)) {
            tokens.push(token)
        } else {
            switch (token) {
                case "+":
                case "-":
                    while (stack.length != 0 && ["*", "%"].includes(stack[stack.length - 1])) {
                        const take_presidence = stack.pop() 
                        tokens.push(take_presidence)    
                    }
                    stack.push(token)
                    break
                case "*":
                case "/":
                case "(":
                    stack.push(token)
                    break
                case ")":
                    let current = stack.pop()
                    while (stack.length != 0 && current != "(") {
                        tokens.push(current)
                        current = stack.pop()
                    }
                    break
            }
        }
    }
    while (stack.length != 0) {
        tokens.push(stack.pop())
    }
    return tokens
}

function evaluate(tokens) {
    const stack = []
    for (const token of tokens) {
        if (!isNaN(token)) {
            stack.push(token)
        } else {
            const y = parseInt(stack.pop())
            const x = parseInt(stack.pop())
            const result = MATH_OPERATIONS[token](x,y)
            stack.push(result)
        }
    }
    return stack[0]
}

function calculator(expression) {
    const tokens = tokenize(expression)
    return evaluate(tokens)
}
// console.log(calculator("1 / 0")
// )

module.exports = calculator