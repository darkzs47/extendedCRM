import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { UserModel } from '../models/User/UserModel';
import {TokenModel} from "../models/Token/TokenModel";
import {CustomerModel} from "../models/CustomerModel/CustomerModel";
import {BranchModel} from "../models/BranchModel/BranchModel";
import {RepresentativeModel} from "../models/RepresentativeModel/RepresentativeModel";
import {AddressModel} from "../models/AddressModel/AddressModel";

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [UserModel, TokenModel, CustomerModel, BranchModel, RepresentativeModel, AddressModel],
    logging: false,
});