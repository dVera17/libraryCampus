import { body } from 'express-validator'

export const reserveDTO = [
    body('dniUser').notEmpty().isNumeric().not().isString().withMessage('dniUser is required'),
    body('codigoLibro').notEmpty().isNumeric().not().isString().withMessage('codigoLibro is required'),
    body('fechaPrestamo').notEmpty().isISO8601().withMessage('fechaPrestamo is required'),
    body('fechaDevolucion').notEmpty().isISO8601().withMessage('fechaDevolucion is required'),
    body('estado').notEmpty().isString().isIn(['pendiente', 'aceptado']).withMessage("Estado is required"),
]