import { Router } from "express";
import { loanDTO } from '../Dtos/loanDto.js'
import { loanController } from "../controllers/loan.controller.js";
const router = Router();

router.post('/new', loanDTO, loanController.newLoan)
router.put('/closeLoan', loanController.changeStatus)

export default router;