import conn from "../db/connect.js";
import asyncHandler from 'express-async-handler';
import { validationResult } from "express-validator";
const db = await conn();
const user = db.collection('usuario');

const existUser = asyncHandler(async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        const existingUser = await user.findOne({ user: req.body.user });
        const existingEmail = await user.findOne({ email: req.body.email });

        if (existingUser === null && existingEmail === null) next();
        if (existingUser || existingEmail) {
            existingUser ? res.json({ message: 'User is already token' }) : res.json({ message: 'Email is already token' });
        }

    } catch (error) {
        res.send(error)
    }
})

export default existUser;