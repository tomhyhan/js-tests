import { startServer, stopServer } from "../../app.js";
import { faker } from '@faker-js/faker';
import axios from 'axios';
import { sequelize } from "../../db/database.js";
import { createReqWithToken, createTweets, createUser } from "../utils.js";

describe("Auth Route", () => {
    let server, formdata, request;
    
    beforeAll(async () => {
        server = await startServer()
        request = axios.create({
            baseURL: `http://localhost:${server.address().port}`,
            validateStatus: null
        })
    })
    
    beforeEach(() => {
        formdata = {
            name: faker.internet.userName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            url: faker.internet.url(),
            password: faker.internet.password()
        }
    })
    
    afterAll(async () => {
        // await sequelize.drop()
        await stopServer(server)
    })

    describe("Tweets API", () => {
        describe("POST /tweets", () => {
            it("returns 201 and creates a tweet", async () => {
                const user = await createUser(request)
                const {res, text} = await createTweets(user, request)

                expect(res.status).toBe(201)
                expect(res.data.text).toBe(text)
            })
        })
        
        describe("GET /tweets", () => {
            it("returns 200 with all tweets when username is not provided", async () => {
                const user = await createUser(request)
                const user2 = await createUser(request)
                await createTweets(user, request)
                await createTweets(user2, request)

                const res = await createReqWithToken("/tweets", user, request)

                expect(res.status).toBe(200)
                expect(res.data.length).toBeGreaterThanOrEqual(2)
            }) 

            it("returns 200 with user tweets when username is provided", async () => {
                const user = await createUser(request)
                const user2 = await createUser(request)
                await createTweets(user, request)
                await createTweets(user2, request)

                const res = await createReqWithToken(`/tweets?username=${user.username}`, user, request)

                expect(res.status).toBe(200)
                expect(res.data.length).toBe(1)
            })
        })
    })

})

