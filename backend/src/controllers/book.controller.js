import conn from "../db/connect.js";
import asyncHandler from 'express-async-handler';
import { validationResult } from "express-validator";
const db = await conn();
const libro = db.collection('libro');

const addNewBook = asyncHandler(async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors);

        const { codigo, titulo, autor, editorial, cantidadPaginas, descripcion, enStock } = req.body

        let existingBook = await libro.findOne({ $or: [{ codigo: req.body.codigo }, { titulo: req.body.titulo }] });
        if (existingBook) res.json({ action: false, message: 'the book is already created' })

        let addBook = await libro.insertOne({
            codigo,
            titulo,
            autor,
            editorial,
            cantidadPaginas,
            fechaEdicion: new Date(req.body.fechaEdicion),
            descripcion,
            enStock
        })

        addBook.insertedId !== null ? res.json({ action: true, message: "successfully registered book" }) : res.json({ action: false, message: "Sorry, Something is wrong" })
    } catch (error) {
        res.send(error)
    }
})

const deleteBook = asyncHandler(async (req, res) => {
    try {
        let result = await libro.deleteOne({ codigo: req.body.codigo })
        res.json({ action: true, message: 'record successfully deleted' })
    } catch (error) {
        res.send(error)
    }
})

const getAllBooks = asyncHandler(async (req, res) => {
    try {
        let result = await libro.find({}).toArray();
        if (!result) res.json({ action: false, message: 'Ups, something went wrong' })
        res.json({ action: true, message: 'Success', data: result })
    } catch (error) {
        res.send(error)
    }
})

export const bookController = {
    addNewBook,
    deleteBook,
    getAllBooks
}