import { Router } from "express";
import { reserveController } from "../controllers/reserve.controller.js";
import { reserveDTO } from "../Dtos/reserveDto.js";
const router = Router();

router.post('/new', reserveDTO, reserveController.newReserve)

export default router;