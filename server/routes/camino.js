const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta que calcula el camino más corto usando Dijkstra
router.get('/', async (req, res) => {
    const inicio = parseInt(req.query.inicio);
    const fin = parseInt(req.query.fin);
    if (!inicio || !fin) {
        return res.status(400).json({ error: 'Faltan parámetros ?inicio=ID&fin=ID' });
    }

    try {
        // Realizar la consulta a la vista ya existente
        const [conexiones] = await db.promise().query('SELECT * FROM vista_conexiones');

        const grafo = construirGrafo(conexiones);
        const resultado = dijkstra(grafo, inicio, fin);

        // Reconstruir la lista detallada de conexiones con dirección correcta
        const conexionesEnRuta = resultado.camino.map(({ id, origen, destino }) => {
            const c = conexiones.find(conexion => conexion.id_conexion === id);
            // Aquí nos aseguramos de que la conexión está correctamente orientada
            if (origen === c.edificio_origen) {
                return {
                    id: c.id_conexion,
                    distancia: c.distancia,
                    origen: { id: origen, nombre: c.nombre_origen },
                    destino: { id: destino, nombre: c.nombre_destino }
                };
            } else {
                return {
                    id: c.id_conexion,
                    distancia: c.distancia,
                    origen: { id: destino, nombre: c.nombre_destino },
                    destino: { id: origen, nombre: c.nombre_origen }
                };
            }
        });

        res.json({
            distancia: resultado.distancia,
            conexiones: conexionesEnRuta
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Construye un grafo como lista de adyacencia
function construirGrafo(conexiones) {
    const grafo = {};

    for (const { id_conexion, edificio_origen, edificio_destino, distancia } of conexiones) {
        if (!grafo[edificio_origen]) grafo[edificio_origen] = [];
        if (!grafo[edificio_destino]) grafo[edificio_destino] = [];

        grafo[edificio_origen].push({
            nodo: edificio_destino,
            peso: distancia,
            conexionId: id_conexion
        });

        grafo[edificio_destino].push({
            nodo: edificio_origen,
            peso: distancia,
            conexionId: id_conexion
        }); // Si es bidireccional
    }

    return grafo;
}

// Dijkstra que devuelve el camino como lista de objetos con conexión, origen y destino reales
function dijkstra(grafo, inicio, fin) {
    const distancias = {};
    const previos = {};
    const conexionUsada = {};
    const origenUsado = {};

    const noVisitados = new Set(Object.keys(grafo));

    for (const nodo of noVisitados) {
        distancias[nodo] = Infinity;
    }
    distancias[inicio] = 0;

    while (noVisitados.size > 0) {
        let nodoActual = null;
        for (const nodo of noVisitados) {
            if (nodoActual === null || distancias[nodo] < distancias[nodoActual]) {
                nodoActual = nodo;
            }
        }

        if (distancias[nodoActual] === Infinity) break;
        noVisitados.delete(nodoActual);

        for (const vecino of grafo[nodoActual]) {
            const nuevaDist = distancias[nodoActual] + vecino.peso;
            if (nuevaDist < distancias[vecino.nodo]) {
                distancias[vecino.nodo] = nuevaDist;
                previos[vecino.nodo] = nodoActual;
                conexionUsada[vecino.nodo] = vecino.conexionId;
                origenUsado[vecino.nodo] = parseInt(nodoActual);
            }
        }
    }

    // Reconstruir el camino: [{ id, origen, destino }, ...]
    const caminoDetallado = [];
    let actual = String(fin);

    while (previos[actual] !== undefined) {
        const idConexion = conexionUsada[actual];
        const origen = origenUsado[actual];
        const destino = parseInt(actual);
        caminoDetallado.unshift({ id: idConexion, origen, destino });
        actual = previos[actual];
    }

    return {
        distancia: distancias[fin],
        camino: caminoDetallado
    };
}

module.exports = router;
