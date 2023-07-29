import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './dbconn/conn.js';
import userRouter from './routes/user_routes.js';
import announcementRouter from './routes/announcement_routes.js';

const app =  express();
dotenv.config({ path: './config.env' });

//db
connectDB();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/user',userRouter);
app.use('/announcement',announcementRouter);


app.get('/', (req, res) => {
    res.send(`Hello world app`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server up and running  at ${PORT}`);
});