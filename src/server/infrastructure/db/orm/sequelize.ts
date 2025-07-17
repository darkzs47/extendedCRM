import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { UserModel } from '../models/UserModel/UserModel';
import {TokenModel} from "../models/TokenModel/TokenModel";
import {CustomerModel} from "../models/CustomerModel/CustomerModel";
import {BranchModel} from "../models/BranchModel/BranchModel";
import {RepresentativeModel} from "../models/RepresentativeModel/RepresentativeModel";
import {AddressModel} from "../models/AddressModel/AddressModel";
import {SupplierModel} from "../models/SupplierModel/SupplierModel";
import {CategoryModel} from "../models/CategoryModel/CategoryModel";
import {ToolModel} from "../models/ToolModel/ToolModel";
import {DistanceCoefficientModel} from "../models/CoefficientsModels/DistanceCoefficientModel";
import {SeasonCoefficientModel} from "../models/CoefficientsModels/SeasonCoefficientModel";
import {OrderModel} from "../models/OrderModel/OrderModel";
import {OrderToolModel} from "../models/OrderToolModel/OrderToolModel";

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [
        UserModel,
        TokenModel,
        CustomerModel,
        SupplierModel,
        BranchModel,
        RepresentativeModel,
        AddressModel,
        ToolModel,
        CategoryModel,
        DistanceCoefficientModel,
        SeasonCoefficientModel,
        OrderModel,
        OrderToolModel,
    ],
    logging: false,
});