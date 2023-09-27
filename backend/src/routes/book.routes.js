import { Router } from "express";
import { bookDTO } from "../Dtos/bookDto.js ";
import { bookController } from "../controllers/book.controller.js";
const router = Router();

router.post('/create', bookDTO, bookController.addNewBook)
router.get('/all', bookController.getAllBooks)

export default router;