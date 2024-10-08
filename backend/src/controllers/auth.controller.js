import conn from "../db/connect.js";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
const db = await conn();
const usuario = db.collection('usuario');

const registerUser = asyncHandler(async (req, res) => {
    try {
        const { user, email, telefono, primerNombre, primerApellido, rol } = req.body
        const hashPassword = await bcrypt.hash(req.body.password, 10);

        const insertUser = await usuario.insertOne({
            user,
            email,
            telefono,
            primerNombre,
            primerApellido,
            password: hashPassword,
            rol,
            fechaNac: new Date(req.body.fechaNac)
        });

        insertUser.insertedId !== null ? res.json({ action: true, message: "successfully registered user" }) : res.json({ message: "Sorry, Something is wrong" })
    } catch (error) {
        res.send(error)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    try {
        // res.cookie('token', , { httpOnly: true, secure: true, sameSite: 'strict', path: '/', domain: '*.localhost' });
        res.json({ action: true, message: "User successfully logged in", token: req.data.message, user: req.user })
    } catch (error) {
        res.send(error)
    }
})

const logoutUser = (req, res) => {
    res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'strict' });
    res.json({ action: true, message: 'User successfully logged out' })
}

export const authController = {
    registerUser,
    loginUser,
    logoutUser
}