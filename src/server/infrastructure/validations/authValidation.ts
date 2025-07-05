import { check } from 'express-validator';

export const loginValidation = [
    check('email')
        .notEmpty().withMessage('Email обязателен')
        .isEmail().withMessage('Неверный формат email'),

    check('password')
        .notEmpty().withMessage('Пароль обязателен')
];
