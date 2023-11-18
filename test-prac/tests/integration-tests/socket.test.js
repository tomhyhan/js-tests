import axios from "axios";
import { startServer, stopServer } from "../../app";
import { createTweets, createUser } from "../utils";
import { io } from "socket.io-client";
import { faker } from "@faker-js/faker";

describe("Socket", () => {
    let server, formdata, request, socketClient, user;
    
    beforeAll(async () => {
        server = await startServer()
        request = axios.create({
            baseURL: `http://localhost:${server.address().port}`,
            validateStatus: null
        })
        user = await createUser(request)
    })
    
    beforeEach(() => {
        formdata = {
            name: faker.internet.userName(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            url: faker.internet.url(),
            password: faker.internet.password()
        }
        socketClient = io(`http://localhost:${server.address().port}`)
    })

    afterEach(() => {
        socketClient.disconnect();
        
    })

    afterAll(async () => {
        await stopServer(server)
    })

    // it("do not accept a connection without authorization token", (done) => {
    //     socketClient.on("connect_error", () => {
    //         done()
    //     })
    // })

    // it("accept a connection with authoization token", async () => {
    //     user = await createUser(request)
    //     socketClient.connect()
    //     socketClient.auth = (cb) => cb({
    //         token: user.token
    //     })
    //     const socketTest = new Promise((res, rej) => {
    //       socketClient.on("connect", () => {
    //         console.log("connected")
    //         res("success")
    //       })      
    //       socketClient.on("connect_error", () => {
    //           console.log("error")
    //           rej("failed")
    //       })
    //     })
        
    //     await expect(socketTest).resolves.toEqual("success")
    // })    
    
    it("emits tweets event when enw tweet is posted", async () => {
        user = await createUser(request)
        // socketClient.auth = (cb) => cb({
        //     token: user.token
        // })
        // let userText
        // socketClient.on("connect", async () => {
        //     const {text} = await createTweets(user, request)
        //     userText = text
        // })
        // socketClient.on("tweets", (tweet) => {
        //     expect(tweet.text).toBe(userText)
        //     res(tweet.text)
        // })      
        // socketClient.connect()
    })    
  
})