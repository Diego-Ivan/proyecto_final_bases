const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/conexiones
router.get('/', (_req, res) => {
    const query = 'SELECT id, edificio_origen AS source, edificio_destino AS target, distancia FROM conexiones';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener conexiones:', err);
            return res.status(500).json({ error: 'Error al obtener conexiones' });
        }
        res.json(results);
    });
});

module.exports = router;