export default function Sidebar({
    edificios,
    sourceId,
    targetId,
    setSourceId,
    setTargetId,
    handleCalculateRoute,
    ruta = [],
    distanciaTotal
}) {
    return (
        <div className="sidebar">
            <h2>Ruta más corta</h2>

            {/* Selects */}
            <div className="dropdown-wrapper">
                <label className="dropdown-label" htmlFor="source-select">Edificio de origen:</label>
                <div className="dropdown-container">
                    <select
                        id="source-select"
                        className="dropdown-select"
                        value={sourceId || ''}
                        onChange={(e) => setSourceId(parseInt(e.target.value))}
                    >
                        <option value="" disabled>Selecciona un edificio</option>
                        {edificios.map((edificio) => (
                            <option key={edificio.id} value={edificio.id}>
                                {edificio.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="dropdown-wrapper">
                <label className="dropdown-label" htmlFor="target-select">Edificio de destino:</label>
                <div className="dropdown-container">
                    <select
                        id="target-select"
                        className="dropdown-select"
                        value={targetId || ''}
                        onChange={(e) => setTargetId(parseInt(e.target.value))}
                    >
                        <option value="" disabled>Selecciona un edificio</option>
                        {edificios.map((edificio) => (
                            <option key={edificio.id} value={edificio.id}>
                                {edificio.nombre}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botón */}
            <button className='calculate-button'
                disabled={!sourceId || !targetId || sourceId === targetId}
                onClick={() => handleCalculateRoute(sourceId, targetId)}
            >
                Calcular ruta
            </button>

            {/* Lista de pasos */}
            {ruta.length > 0 && (
                <div className="ruta-info">
                    <h3>Camino calculado:</h3>
                    <p><strong>Distancia total:</strong> {Math.round(distanciaTotal)} m</p>
                    <ol>
                        {ruta.map((conexion, index) => (
                            <li key={conexion.id}>
                                {conexion.origen.nombre} → {conexion.destino.nombre} ({conexion.distancia} m)
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
}