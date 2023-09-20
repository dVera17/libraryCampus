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

        insertUser.insertedId !== null ? res.json({ message: "successfully registered user" }) : res.json({ message: "Sorry, Something is wrong" })
    } catch (error) {
        res.send(error)
    }
})

export const authController = {
    registerUser
}