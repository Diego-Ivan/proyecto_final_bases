// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const edificiosRouter = require('./routes/edificios');

app.use(cors()); // Permitir peticiones desde frontend React
app.use('/api/edificios', edificiosRouter);

const conexionesRouter = require('./routes/conexiones');
app.use('/api/conexiones', conexionesRouter);

const conexionesRuta = require('./routes/camino');
app.use('/api/camino', conexionesRuta);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

