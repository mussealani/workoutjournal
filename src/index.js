import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
import workoutsRouter from './routes/workouts.js';
import workouttypesRouter from './routes/workouttypes.js';
import workoutsSessionsRouter from './routes/workoutsessions.js';

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Add the workouts routes
app.use('/', workoutsRouter);

// Add the workouts sessions routes
app.use('/', workoutsSessionsRouter);

// Add the workouttypes routes
app.use('/workouttypes', workouttypesRouter);


app.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});