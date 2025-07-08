import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import cookieParser from "cookie-parser"
import { logger } from './logger';
import { sequelize } from './infrastructure/db/orm/sequelize';
import authRoutes from './infrastructure/routes/auth.routes';
import userRoutes from './infrastructure/routes/user.routes';
import customerRoutes from './infrastructure/routes/customer.routes';
import supplierRoutes from "./infrastructure/routes/supplier.routes";

export const startServer = async () => {
    try {
        await sequelize.authenticate();

        const app = express();
        app.use(pinoHttp({logger}));
        app.use(cookieParser())
        app.use(cors({
            origin: process.env.CLIENT_URL,
            credentials: true,
        }))
        app.use(express.json());

        app.use('/auth', authRoutes);
        app.use('/users', userRoutes);
        app.use('/customers', customerRoutes)
        app.use('/suppliers', supplierRoutes)

        const port = process.env.PORT;
        app.listen(port, () => {
            console.log(`🚀 Server running on http://localhost:${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};