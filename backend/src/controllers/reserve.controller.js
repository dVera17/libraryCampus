import conn from "../db/connect.js";
import asyncHandler from 'express-async-handler';
import { validationResult } from "express-validator";
const db = await conn();
const reserva = db.collection('reserva');

const newReserve = asyncHandler(async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        const { dniUser, codigoLibro, estado } = req.body
        let addReserve = await reserva.insertOne({
            dniUser,
            codigoLibro,
            fechaPrestamo: new Date(req.body.fechaPrestamo),
            fechaDevolucion: new Date(req.body.fechaDevolucion),
            estado
        })

        addReserve.insertedId !== null ? res.json({ action: true, message: "successfully registered reserve" }) : res.json({ action: false, message: "Sorry, Something is wrong" });
    } catch (error) {
        console.log(error);
    }
})

const getReserves = asyncHandler(async (req, res) => {
    try {
        let allReserves = await reserva.find({}).toArray();
        res.send(allReserves)
    } catch (error) {
        console.log(error);
    }
})

const aceptarReserva = asyncHandler(async (req, res) => {
    try {
        let result = await reserva.updateOne({ dniUser: req.body.dniUser }, { $set: { estado: "aceptado" } })
        res.json({ action: true, message: "Success" });
    } catch (error) {
        console.log(error);
    }
})

export const reserveController = {
    newReserve,
    getReserves,
    aceptarReserva
}