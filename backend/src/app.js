import express from 'express';
import { config } from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerAuth from './routes/auth.routes.js';
import routerBooks from './routes/book.routes.js';
import routerLoan from './routes/loan.routes.js';
import { tokenVerification } from './helpers/jwt.js';
config();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

const app = express();
app.set('port', process.env.PORT_SERVER);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/auth', routerAuth)
app.use('/home', tokenVerification, (req, res) => res.json({ action: true, message: "welcome" }))
app.use('/book', routerBooks)
app.use('/loan', routerLoan)

export default app;