import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import existUser from "../middlewares/existUser.js";
import { userDTO } from "../Dtos/userDto.js";
const router = Router();

router.post('/register', userDTO, existUser, authController.registerUser);

export default router;