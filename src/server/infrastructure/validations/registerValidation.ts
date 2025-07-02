import { check } from 'express-validator';

export const registrationValidation = [
    check('secondName')
        .notEmpty().withMessage('Фамилия обязательна')
        .isAlpha('ru-RU').withMessage('Фамилия должна содержать только русские буквы'),

    check('name')
        .notEmpty().withMessage('Имя обязательно')
        .isAlpha('ru-RU').withMessage('Имя должно содержать только русские буквы'),

    check('lastName')
        .notEmpty().withMessage('Отчество обязательно')
        .isAlpha('ru-RU').withMessage('Отчество должно содержать только русские буквы'),

    check('phone')
        .notEmpty().withMessage('Телефон обязателен')
        .isMobilePhone('ru-RU').withMessage('Неверный формат телефона'),

    check('email')
        .notEmpty().withMessage('Email обязателен')
        .isEmail().withMessage('Неверный формат email'),

    check('password')
        .notEmpty().withMessage('Пароль обязателен')
        .isLength({ min: 8 }).withMessage('Пароль должен быть не менее 8 символов')
        .matches(/[A-Z]/).withMessage('Пароль должен содержать заглавную букву')
        .matches(/[0-9]/).withMessage('Пароль должен содержать хотя бы одну цифру')
        .matches(/[!@#$%^&*]/).withMessage('Пароль должен содержать спецсимвол'),
];
