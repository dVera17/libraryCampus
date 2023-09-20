import express from 'express';
import { config } from "dotenv";
import routerAuth from './routes/auth.routes.js';
config();
const app = express();
app.set('port', process.env.PORT_SERVER);
app.use(express.json());

app.use('/auth', routerAuth)

export default app;