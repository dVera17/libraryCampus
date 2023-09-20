import { body } from 'express-validator'

export const authDTO = [
    body('user').notEmpty().isString().withMessage('user is required and must be a string'),
    body('email').notEmpty().optional().isString().matches("^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").withMessage('email must be a valid email'),
    body('password').notEmpty().isString().withMessage('password is required and must be a string'),
]