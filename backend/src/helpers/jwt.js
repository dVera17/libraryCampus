import conn from "../db/connect.js";
import asyncHandler from 'express-async-handler';
import { SignJWT, jwtVerify } from "jose"
import { ObjectId } from "mongodb";
import { config } from "dotenv";
config();

const db = await conn();
const usuario = db.collection("usuario")

export const createToken = asyncHandler(async (req, res, next) => {
    try {
        if (Object.keys(req.body).length === 0) return res.status(400).send({ message: "Datos no enviados" });

        const result = await usuario.findOne({ $or: [{ user: req.body.user }, { email: req.body.email }] });
        if (!result) return res.status(401).send({ message: "Usuario no encontrado" });

        const id = result._id.toString();
        const jwtConstructor = await new SignJWT({ id: id })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setIssuedAt()
            .setExpirationTime('3h')
            .sign(new TextEncoder().encode(process.env.JWT_PRIVATE_KEY));
        req.data = { status: 200, message: jwtConstructor };
        next();
    } catch (error) {
        res.send(error)
    }
})

export const tokenVerification = asyncHandler(async (req, res, next) => {
    try {
        const jwtData = await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_PRIVATE_KEY)
        );
        let result = await usuario.findOne({ _id: new ObjectId(jwtData.payload.id) });
        if (!result) return;
        let { _id, permisos, ...usuario } = result;
        return usuario;
    } catch (error) {
        res.send(error)
    }
})