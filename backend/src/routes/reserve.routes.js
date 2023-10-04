import { Router } from "express";
import { reserveController } from "../controllers/reserve.controller.js";
import { reserveDTO } from "../Dtos/reserveDto.js";
const router = Router();

router.post('/new', reserveDTO, reserveController.newReserve)
router.get('/all', reserveController.getReserves)
router.put('/aceptar', reserveController.aceptarReserva)
router.get('/r_accepted', reserveController.getReservesAccepted)

export default router;