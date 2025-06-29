import {logger} from "./logger";

const { startServer } = require('./server');
import dotenv from 'dotenv';
dotenv.config();
startServer();
