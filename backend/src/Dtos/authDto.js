import { body } from 'express-validator'

export const authDTO = [
    body('user').notEmpty().isString().withMessage('user is required and must be a string'),
    body('password').notEmpty().isString().withMessage('password is required and must be a string'),
]