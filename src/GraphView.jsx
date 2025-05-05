import React, { useEffect, useState, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const GraphView = ({ ruta }) => {
    const [graphData, setGraphData] = useState({ nodes: [], links: [] });
    const graphRef = useRef();
    const [highlightedLinks, setHighlightedLinks] = useState(new Set());

    // Cargar nodos y conexiones
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [nRes, lRes] = await Promise.all([
                    fetch('http://localhost:3000/api/edificios'),
                    fetch('http://localhost:3000/api/conexiones'),
                ]);

                const nodes = await nRes.json();
                const links = await lRes.json();

                const formattedNodes = nodes.map((n, i) => ({
                    id: n.id.toString(),
                    name: n.nombre,
                    label: n.abreviacion,
                    color: `hsl(${(i * 137.5) % 360}, 60%, 60%)`,
                }));

                const formattedLinks = links.map(l => ({
                    source: l.source.toString(),
                    target: l.target.toString(),
                    distance: l.distancia * 3,
                    id: l.id  // IMPORTANTE: asegúrate de tener 'id' en cada conexión
                }));

                setGraphData({ nodes: formattedNodes, links: formattedLinks });
            } catch (error) {
                console.error('Error cargando grafo:', error);
            }
        };

        fetchData();
    }, []);

    // Recalcular las conexiones resaltadas
    useEffect(() => {
        if (Array.isArray(ruta)) {
            const ids = new Set(ruta.map(c => c.id));
            setHighlightedLinks(ids);

            graphRef.current.d3Force('charge').strength(-120);
            graphRef.current.d3Force('link').distance(link => link.distance);
            graphRef.current.d3ReheatSimulation();
        }
    }, [ruta]);

    // Reforzar fuerzas físicas
    useEffect(() => {
        if (!graphRef.current) return;
        graphRef.current.d3Force('charge').strength(-120);
        graphRef.current.d3Force('link').distance(link => link.distance);
        graphRef.current.d3ReheatSimulation();
    }, [graphData]);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <ForceGraph2D
                ref={graphRef}
                graphData={graphData}
                enableNodeDrag={true}
                nodeLabel={node => node.name}
                nodeCanvasObject={(node, ctx, globalScale) => {
                    if (globalScale < 0.2) return;

                    const fontSize = Math.max(12, 14 * globalScale);
                    const radius = 20 * globalScale;

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
                    ctx.fillStyle = node.color || 'steelblue';
                    ctx.fill();
                    ctx.strokeStyle = 'white';
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    ctx.font = `${fontSize}px Inter, sans-serif`;
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(node.label, node.x, node.y);
                }}
                linkCanvasObject={(link, ctx, globalScale) => {
                    const start = link.source;
                    const end = link.target;
                    if (!start || !end) return;

                    const isHighlighted = highlightedLinks.has(link.id);
                    const strokeColor = isHighlighted ? '#8000b0' : 'rgba(0,0,0,0.3)';
                    const lineWidth = isHighlighted ? 6 : 2;

                    const text = `${Math.round(link.distance / 3)} m`;
                    const fontSize = 12 / globalScale;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(start.x, start.y);
                    ctx.lineTo(end.x, end.y);
                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = lineWidth;
                    ctx.stroke();

                    const midX = (start.x + end.x) / 2;
                    const midY = (start.y + end.y) / 2;

                    ctx.font = `${fontSize}px Inter, sans-serif`;
                    ctx.fillStyle = 'black';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    // Medir el tamaño del texto
                    const padding = 4;
                    const textWidth = ctx.measureText(text).width;
                    const textHeight = fontSize;

                    // Dibujar fondo blanco
                    ctx.fillStyle = 'white';
                    ctx.fillRect(midX - textWidth / 2 - padding, midY - textHeight / 2 - padding, textWidth + padding * 2, textHeight + padding * 2);

                    // Dibujar el texto encima
                    ctx.fillStyle = 'black';
                    ctx.fillText(text, midX, midY);

                    ctx.restore();
                }}
                nodePointerAreaPaint={(node, color, ctx) => {
                    ctx.fillStyle = color;
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
                    ctx.fill();
                }}
            />
        </div>
    );
};

export default GraphView;
