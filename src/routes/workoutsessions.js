import pool from '../helpers/database.js';
import { Router } from 'express';
import path from 'path';;

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
        // Get workout types name and id
        const sql = 'SELECT * FROM workouttypes';
        const [rows] = await pool.query(sql);
        
        const workoutId = req.params.id;
        // get workout session data
        const sql2 = 'SELECT * FROM workoutsessions INNER JOIN workouttypes ON workoutsessions.workouttype_id = workouttypes.workouttype_id WHERE workoutsessions.workout_id = ?';
        const [workoutSessions] = await pool.query(sql2, [workoutId]);
        
        // Get workout session types name and id
        res.render(path.join("traningssessionar"), { workoutId, workouttypes: rows, workoutSessions });
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

router.post('/workoutsession', async (req, res) => {
    try {
        const { workouttype_id, workoutsession_length, workout_id } = req.body;
        const sql = 'INSERT INTO workoutsessions (workoutsession_time, workouttype_id, workout_id) VALUES (?, ?, ?)';
        const [ result ] = await pool.query(
            sql, 
            [workoutsession_length, workouttype_id, workout_id ]
        );

        res.status(201).json({
            message: 'Workout session created'
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error'});
    }

});

export default router;