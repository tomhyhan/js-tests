function add(x,y) {
    return x+y
}

function sub(x,y) {
    return x-y
}

function mul(x,y) {
    return x*y
}

function div(x,y) {
    if (y == 0) {
        throw new Error("Can not divide by 0")
    }
    return x / y
}

module.exports = {add, sub, div, mul}