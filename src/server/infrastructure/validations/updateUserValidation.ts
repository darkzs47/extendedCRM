import { check } from 'express-validator';
import {UserRole} from "../../core/models/User/User";

const allowedRoles: UserRole[] = ["admin", "user", "supplier", "employee"];

export const updateUserValidation = [
    check('phone')
        .notEmpty().withMessage('Телефон обязателен')
        .isMobilePhone('ru-RU').withMessage('Неверный формат телефона'),

    check('email')
        .notEmpty().withMessage('Email обязателен')
        .isEmail().withMessage('Неверный формат email'),

    check('role')
    .notEmpty().withMessage('Роль обязательна')
    .isIn(allowedRoles).withMessage('Недопустимая роль')
];
