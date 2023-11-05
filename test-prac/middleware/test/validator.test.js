import { validationResult } from "express-validator";
import { validate } from "../validator";
import httpMocks from 'node-mocks-http';

jest.mock("express-validator")

describe("Validate Middleware" , () => {
    it("return 400 if there are validation errors",() => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()
        const next = jest.fn()
        const errorMsg = "error message"
        validationResult.mockImplementation(() => {
            return {
                isEmpty: () => false,
                array: () => [{msg: errorMsg}]
            }
        }) 

        validate(req, res, next)

        expect(next).not.toHaveBeenCalled()
        expect(res.statusCode).toBe(400)
        expect(res._getJSONData().message).toBe(errorMsg)
    })

    it("call next if are no validation errors",() => {
        const req = httpMocks.createRequest()
        const res = httpMocks.createResponse()
        const next = jest.fn()
        validationResult.mockImplementation(() => {
            return {
                isEmpty: () => true
            }
        }) 

        validate(req, res, next)

        expect(next).toHaveBeenCalledTimes(1)
    })
})

validate
validationResult