import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { logger } from './logger';
import { sequelize } from './infrastructure/db/orm/sequelize';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

export const startServer = async () => {
    await sequelize.authenticate();

    const app = express();
    app.use(pinoHttp({ logger }));
    app.use(cors())
    app.use(bodyParser.json());

    app.use('/auth', authRoutes);
    app.use('/users', userRoutes);

    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`🚀 Server running on http://localhost:${port}`);
    });
};