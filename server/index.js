import express from 'express';
import mongoose from 'mongoose'
import routerAuth from './routes/auth.route.js';
import routerMain from './routes/main.route.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;
const mongoPath = 'mongodb+srv://admin:admin@cluster0.s2pg5n5.mongodb.net/task4?retryWrites=true&w=majority';


app.use(cors());
app.use(express.json({extended: true}))
app.use('/api/auth', routerAuth)
app.use('/api/main', routerMain)

async function start() {
    try {
        await mongoose
            .connect(mongoPath)
            .then(()=> console.log('DB ok'))
            .catch((e) => console.log('DB error', e));

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`)
        })
    } catch (err) {
        console.error(err)
    }
}
start();