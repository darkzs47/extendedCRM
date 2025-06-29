import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { UserService } from './core/services/UserService/UserService';
import { HttpUserController } from './infrastructure/controllers/User/HttpUserController';
import { UserRepositoryJSON } from './infrastructure/db/repository/UserRepositoryJSON';
import pinoHttp from 'pino-http';
import { logger } from './logger';
import { sequelize } from './infrastructure/db/orm/sequelize';
import {UserRepositoryPostgres} from "./infrastructure/db/repository/UserRepositoryPostgres";

export const startServer = async () => {
    await sequelize.authenticate();

    // const userRepositoryJSON = new UserRepositoryJSON('./users.json');
    // const userServiceJSON = new UserService(userRepositoryJSON);
    // const httpUserController = new HttpUserController(userServiceJSON);

    const userRepositoryPostgres = new UserRepositoryPostgres();
    const userServicePostgres = new UserService(userRepositoryPostgres);
    const postgresUserController = new HttpUserController(userServicePostgres);

    const app = express();
    app.use(pinoHttp({ logger }));
    app.use(bodyParser.json());

    app.post('/users', (req: Request, res: Response) => {
        // httpUserController.createUser(req, res);
        postgresUserController.createUser(req, res);
    });

    // app.get('/users', (req: Request, res: Response) => {
    //     httpUserController.getAll(req, res);
    // });

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
};

