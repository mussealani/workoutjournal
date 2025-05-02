import pool from '../helpers/database.js';
import { Router } from 'express';

const router = Router(); 

router.get('/', async(req, res) => {
    try {
        const sql = 'SELECT * FROM workouttypes';
        const [ rows ] = await pool.query(sql);
        res.json(rows);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
});

// Fungerar inte
router.post('/', async (req, res) => {
    const { workouttypes_name } = req.body;

    if(!workouttypes_name) {
        return res.status(400).json({ message: 'Träningstyp namn är obligatorisk!' });
    }

    try {
        // Workout Name +
        const sql = 'INSERT INTO workouttypes (workouttype_name) VALUES (?)';
        const [ result ] = await pool.query(
            sql, 
            
            [ workouttypes_name ]
        );

        res.status(201).json({
            message: 'Workouttyp är nu skapad.',
            workoutId: result.insertId
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }

});

export default router;