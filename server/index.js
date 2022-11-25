import express from 'express';
import mongoose from 'mongoose'
import routerAuth from './routes/auth.route.js';
import routerMain from './routes/main.route.js';
import cors from 'cors';

const app = express();
const PORT = 5000
const mongoPath = 'mongodb+srv://admin:admin@cluster0.s2pg5n5.mongodb.net/task4?retryWrites=true&w=majority';
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'PATCH']
}

app.use(cors(corsOptions));
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