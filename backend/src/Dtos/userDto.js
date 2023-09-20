import { body } from 'express-validator'

export const userDTO = [
    body('user').notEmpty().isString().withMessage('user is required and must be a string'),
    body('email').notEmpty().isString().matches("^[a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$").withMessage('email is required and must be a valid email'),
    body('telefono').notEmpty().isNumeric().not().isString().withMessage('telefono is required and must be a number'),
    body('primerNombre').notEmpty().isString().matches("^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$").withMessage('primerNombre is required and must be a string'),
    body('primerApellido').notEmpty().isString().matches('^[a-zA-ZáéíóúüÁÉÍÓÚÜñÑ\s]*$').withMessage('primerApellido is required and must be a string'),
    body('password').notEmpty().isString().withMessage('password is required and must be a string'),
    body('rol').notEmpty().isString().isIn(['cliente', 'empleado', 'gerente']).withMessage("rol is required and only can be ['cliente', 'empleado', 'gerente']"),
    body('fechaNac').notEmpty().isISO8601().withMessage('fechaNac is required')
]