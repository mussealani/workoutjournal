import pool from '../helpers/database.js';
import { Router } from 'express';

const router = Router(); 

router.get('/workouts', async(req, res) => {
    try {
        const sql = 'SELECT * FROM workouts';
        const [ rows ] = await pool.query(sql);
        res.json(rows);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.post('/workouts', async (req, res) => {
    try {
        const { workout_date, workout_name, workout_comment } = req.body;
        const sql = 'INSERT INTO workouts (workout_date, workout_name, workout_comment) VALUES (?, ?, ?)';
        const [ result ] = await pool.query(
            sql, 
            [ workout_date, workout_name, workout_comment ]
        );
    
        res.status(201).json({
            message: 'Workout created'
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error'});
    }

});

export default router;