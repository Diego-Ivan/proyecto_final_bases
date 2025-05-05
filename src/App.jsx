import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import GraphView from './GraphView';
import './App.css';

function App() {
  const [edificios, setEdificios] = useState([]);
  const [conexiones, setConexiones] = useState([]);
  const [sourceId, setSourceId] = useState(null);
  const [targetId, setTargetId] = useState(null);
  const [ruta, setRuta] = useState([]);
  const [distanciaTotal, setDistanciaTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const eRes = await fetch('http://localhost:3000/api/edificios');
      const lRes = await fetch('http://localhost:3000/api/conexiones');
      setEdificios(await eRes.json());
      setConexiones(await lRes.json());
    };
    fetchData();
  }, []);

  const handleCalculateRoute = async (source, target) => {
    try {
      const res = await fetch(`http://localhost:3000/api/camino?inicio=${source}&fin=${target}`);
      const data = await res.json();
      setRuta(data.conexiones || []);
      setDistanciaTotal(data.distancia || 0);
    } catch (err) {
      console.error('Error al obtener la ruta:', err);
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        edificios={edificios}
        sourceId={sourceId}
        targetId={targetId}
        setSourceId={setSourceId}
        setTargetId={setTargetId}
        handleCalculateRoute={handleCalculateRoute}
        ruta={ruta}
        distanciaTotal={distanciaTotal}
      />
      <div className="graph-container">
        <GraphView
          conexiones={conexiones}
          ruta={ruta}
        />
      </div>
    </div>
  );
}

export default App;
