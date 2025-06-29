import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { UserService } from './core/services/UserService/UserService';
import { UserController } from './infrastructure/controllers/User/UserController';
import { UserRepositoryImpl } from './infrastructure/db/repository/UserRepositoryImpl';
import pinoHttp from 'pino-http';
import { logger } from './logger'

export const startServer = () => {
    const userRepository = new UserRepositoryImpl('./users.json');
    const userService = new UserService(userRepository);
    const userController = new UserController(userService);

    const app = express();
    app.use(pinoHttp({ logger }));
    app.use(bodyParser.json());

    app.post('/users', (req: Request, res: Response) => {
        userController.createUser(req, res);
    });

    // app.get('/users', (req: Request, res: Response) => {
    //     userController.getAll(req, res);
    // });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
};

