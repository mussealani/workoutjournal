import pool from '../helpers/database.js';
import { Router } from 'express';

const router = Router(); 

router.get('/workoutsessions', async(req, res) => {
    try {
        const sql = 'SELECT * FROM workoutsessions';
        const [ rows ] = await pool.query(sql);
        res.json(rows);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.get('/traningspass/:id', async(req, res) => {
    try {
        res.render('/traningssessionar/index.html');
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
});

router.post('/workoutsessions', async (req, res) => {
    try {
        const { workouttype_id, workoutsession_length } = req.body;
        const sql = 'INSERT INTO workoutession (workout_date, workout_name, workout_length, workout_comment) VALUES (?, ?, ?, ?)';
        const [ result ] = await pool.query(
            sql, 
            [ workout_date, workout_name, workout_length, workout_comment ]
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