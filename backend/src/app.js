import express from 'express';
import { config } from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routerAuth from './routes/auth.routes.js';
import { tokenVerification } from './helpers/jwt.js';
config();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

const app = express();
app.set('port', process.env.PORT_SERVER);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/auth', routerAuth)

export default app;