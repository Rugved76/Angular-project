// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://rugvedwagh02:rugved76@cluster0.0mvw1ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log('\nMongoDB connected')
    })
    .catch((err) => {
        console.log(err.message)
    });

import todoRoutes from './routes/todo.routes.js';

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT}`)
});