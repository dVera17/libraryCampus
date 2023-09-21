import conn from "../db/connect.js";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
const db = await conn();
const usuario = db.collection('usuario');

const validateCredentials = asyncHandler(async (req, res, next) => {
    try {
        const result = await usuario.findOne({ $or: [{ user: req.body.user }, { email: req.body.user }] });
        const matchPassword = await bcrypt.compare(req.body.password, result.password);
        matchPassword ? next() : res.json({ message: "User or password are incorrect" })
    } catch (error) {
        res.send(error);
    }
})

export default validateCredentials;