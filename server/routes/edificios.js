const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/edificios
router.get('/', (_req, res) => {
    const query = 'SELECT id, nombre, abreviacion FROM edificios ORDER BY nombre';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar edificios:', err);
            return res.status(500).json({ error: 'Error al obtener edificios' });
        }
        res.json(results);
    });
});

module.exports = router;