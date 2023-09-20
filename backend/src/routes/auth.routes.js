import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { existInDB } from "../middlewares/existUser.js";
import { userDTO } from "../Dtos/userDto.js";
import { authDTO } from "../Dtos/authDto.js";
import { createToken } from "../helpers/jwt.js";
import validateCredentials from "../middlewares/validateCredentials.js";
const router = Router();

router.post('/register', userDTO, existInDB.existUserRegister, authController.registerUser);
router.post('/login', authDTO, existInDB.existUserLogin, validateCredentials, createToken, authController.loginUser);

export default router;