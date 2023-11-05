import httpMocks  from "node-mocks-http";
import { isAuth } from "../auth";
import * as userRepository from '../../data/auth.js'
import { createRandomUser, fakeToken } from "../../test/fakeData.js";
import jwt from 'jsonwebtoken';

jest.mock("../../data/auth.js")
jest.mock("jsonwebtoken")

describe("Auth middle ware", () => {
    let next;
    let res;
    beforeEach(() => {
        res = httpMocks.createResponse();
        next = jest.fn()
    })

    it("returns 401 for the request without Authorization header", async ()=> {
        const req = createhttpRequest({})

        await isAuth(req, res, next)

        expect(res.statusCode).toBe(401)
        expect(res._getJSONData().message).toBe("Authentication Error")
        expect(next).not.toHaveBeenCalled()
    })

    it("returns 401 for the request with unsupported Authorization header", async ()=> {
        const req = createhttpRequest({headers: {authorization: "Basic"}})

        await isAuth(req, res, next)

        expect(res.statusCode).toBe(401)
        expect(res._getJSONData().message).toBe("Authentication Error")
        expect(next).not.toHaveBeenCalled()
    })

    it("returns 401 for the request with invalid JWT", async ()=> {
        const req = createhttpRequest({headers: {authorization: `Bearer ${fakeToken}`}})
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(new Error(), undefined)
        })

        await isAuth(req, res, next)

        expect(res.statusCode).toBe(401)
        expect(res._getJSONData().message).toBe("Authentication Error")
        expect(next).not.toHaveBeenCalled()
    })

    it("return 401 when cannot find a user by id from the JWT", async () => {
        const req = createhttpRequest({
            authorization: `Bearer ${fakeToken}`
        }) 
        const fakeUser = createRandomUser()
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(undefined, fakeUser.id)
        })
        userRepository.findById.mockImplementation(async (id) => null)
        
        await isAuth(req, res, next)
        
        expect(res.statusCode).toBe(401)
        expect(res._getJSONData().message).toBe("Authentication Error")
        expect(next).not.toHaveBeenCalled()
    })

    it("passes a request with a valid Authorization header and token", async () => {
        const req = createhttpRequest({
            authorization: `Bearer ${fakeToken}`
        }) 
        const fakeUser = createRandomUser()
        jwt.verify.mockImplementation((token, secret, callback) => {
            callback(undefined, fakeUser.id)
        })
        userRepository.findById.mockImplementation(async (id) => fakeUser)
        
        await isAuth(req, res, next)
        
        expect(res.statusCode).toBe(200)
        expect(req.token).toBe(fakeToken)
        expect(req.userId).toBe(fakeUser.id)
        expect(req).toMatchObject,({token:fakeToken,userId:fakeUser.id})
        expect(next).toHaveBeenCalledTimes(1)
    })

    function createhttpRequest(headers) {
        return httpMocks.createRequest({
            method: "GET",
            headers,
            url: "/tweets"
        })
    }
})


