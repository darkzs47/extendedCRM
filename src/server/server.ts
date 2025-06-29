import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { UserService } from './core/services/UserService/UserService';
import { HttpUserController } from './infrastructure/controllers/User/HttpUserController';
import { UserRepositoryJSON } from './infrastructure/db/repository/UserRepositoryJSON';
import pinoHttp from 'pino-http';
import { logger } from './logger'

export const startServer = () => {
    const userRepository = new UserRepositoryJSON('./users.json');
    const userService = new UserService(userRepository);
    const httpUserController = new HttpUserController(userService);

    const app = express();
    app.use(pinoHttp({ logger }));
    app.use(bodyParser.json());

    app.post('/users', (req: Request, res: Response) => {
        httpUserController.createUser(req, res);
    });

    // app.get('/users', (req: Request, res: Response) => {
    //     httpUserController.getAll(req, res);
    // });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
};

