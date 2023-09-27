import { body } from 'express-validator'

export const bookDTO = [
    body('codigo').notEmpty().isNumeric().not().isString().withMessage('codigo is required and must be a number'),
    body('titulo').notEmpty().isString().withMessage('titulo is required and must be a string'),
    body('autor').notEmpty().isString().withMessage('autor is required and must be a string'),
    body('editorial').notEmpty().isString().withMessage('editorial is required and must be a string'),
    body('cantidadPaginas').notEmpty().isNumeric().not().isString().withMessage('cantidadPaginas is required and must be a number'),
    body('fechaEdicion').notEmpty().isISO8601().withMessage('fechaEdicion is required'),
    body('descripcion').notEmpty().isString().withMessage('descripcion is required and must be a string'),
    body('enStock').notEmpty().isNumeric().not().isString().withMessage('enStock is required and must be a number')
]