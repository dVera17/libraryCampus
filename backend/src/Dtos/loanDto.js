import { body } from 'express-validator'

export const loanDTO = [
    body('codigo').notEmpty().isNumeric().not().isString().withMessage('codigo is required and must be a number'),
    body('tituloLibro').notEmpty().isString().withMessage('tituloLibro is required and must be a string'),
    body('emailCliente').notEmpty().isString().matches('^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$').withMessage('emailCliente is required and must be a valid email'),
    body('cantidad').notEmpty().isNumeric().not().isString().withMessage('cantidad is required and must be a number'),
    body('fechaPrestamo').notEmpty().isISO8601().withMessage('fechaPrestamo is required and must be a valid date'),
    body('fechaDevolucion').notEmpty().isISO8601().withMessage('fechaDevolucion is required and must be a valid date'),
    body('estado').notEmpty().isString().isIn(['prestado', 'devuelto']).withMessage('estado is required en only can be [prestado, devuelto]')
]