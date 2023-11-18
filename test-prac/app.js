import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';
import { config } from './config.js';
import { getSocketIO, initSocket } from './connection/socket.js';
import { sequelize } from './db/database.js';
import * as TweetRepository from './data/tweet.js';
import TweetController from './controller/tweet.js';


export async function startServer(port) {
    const app = express();
    
    const corsOption = {
      origin: config.cors.allowedOrigin,
      optionsSuccessStatus: 200,
    };
    app.use(express.json());
    app.use(helmet());
    app.use(cors(corsOption));
    app.use(morgan('tiny'));
    
    app.use('/tweets', tweetsRouter(new TweetController(TweetRepository, () => getSocketIO())));
    
    app.use('/auth', authRouter);
    
    app.use((req, res, next) => {
      res.sendStatus(404);
    });
    
    app.use((error, req, res, next) => {
      console.error(error);
      res.sendStatus(500);
    });
    
    await sequelize.sync()

    // console.log('Server is started....');
    const server = app.listen(port);
    initSocket(server);
    return server
}


export async function stopServer(server) {
    return new Promise((res, rej) => {
        try {
            server.close(async () => {
                await sequelize.close()
                res()
            })
        } catch (err) {
            rej(err)
        }
    })
}
