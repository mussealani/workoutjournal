import pool from '../helpers/database.js';
import { Router } from 'express';

const router = Router(); 

router.get('/', async(req, res) => {
    try {
        const sql = 'SELECT * FROM workouts-workouttypes';
        const [ rows ] = await pool.query(sql);
        res.json(rows);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Database error' });
    }
});

export default router;