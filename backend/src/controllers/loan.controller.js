import conn from "../db/connect.js";
import asyncHandler from 'express-async-handler';
import { validationResult } from "express-validator";
const db = await conn();
const libro = db.collection('libro');
const prestamo = db.collection('prestamo');

const newLoan = asyncHandler(async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        // const {dniUser}
        let loan = await prestamo.insertOne({
            dniUser,
            codigoLibro,
            fechaPrestamo,
            fechaDevolucion,
            estado: new Date(req.body.fechaPrestamo),
        });

        loan.insertedId !== null ? res.json({ action: true, message: "successfully" }) : res.json({ action: false, message: "Sorry, Something is wrong" })
    } catch (error) {
        res.send(error)
    }
})

const changeStatus = asyncHandler(async (req, res) => {
    try {
        let status = await prestamo.updateOne({ codigo }, { $set: { estado: req.body.estado } });
        let updateStockBooks = await libro.updateOne({ tituloLibro }, { $inc: { 'enStock': 1 } });

        (status !== null && updateStockBooks !== null) ? res.json({ action: true, message: "successfully registered book" }) : res.json({ action: false, message: "Sorry, Something is wrong" });
    } catch (error) {
        res.send(error)
    }
})

export const loanController = {
    newLoan,
    changeStatus
}