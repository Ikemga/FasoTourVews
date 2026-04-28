import { useEffect, useState }          from "react";
import { motion }                        from "framer-motion";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Cell, ResponsiveContainer, ReferenceLine
} from "recharts";
import { getTauxReservationCircuits }    from "../../service/DashboardAgenceService";

const getBarColor = (taux) => {
    if (taux >= 80) return "#1D9E75";
    if (taux >= 60) return "#3266ad";
    if (taux >= 40) return "#BA7517";
    return "#D85A30";
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { circuitName, taux, nbReservations, nombreExact } = payload[0].payload;
        return (
            <div style={{
                background: "#fff", border: "0.5px solid #e0e0e0",
                borderRadius: "8px", padding: "10px 14px", fontSize: "13px"
            }}>
                <p style={{ margin: 0, fontWeight: 500 }}>{circuitName}</p>
                <p style={{ margin: "4px 0 0", color: "#666" }}>
                    Taux : <strong>{taux.toFixed(1)}%</strong>
                </p>
                <p style={{ margin: "2px 0 0", color: "#888" }}>
                    {nbReservations} / {nombreExact} réservations
                </p>
            </div>
        );
    }
    return null;
};

const CircuitsTauxReservationAgence = () => {
    const [data,    setData]    = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        getTauxReservationCircuits()
            .then(setData)
            .catch(() => setError("Impossible de charger les circuits."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", gap: "10px" }}>
            <div style={{ width: "20px", height: "20px", border: "2px solid #3266ad", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <span style={{ fontSize: "13px", color: "#888" }}>Chargement...</span>
        </div>
    );

    if (error) return <p style={{ color: "red", padding: "1rem" }}>{error}</p>;

    const moyenne     = data.length
        ? Math.round(data.reduce((acc, c) => acc + c.taux, 0) / data.length)
        : 0;
    const chartHeight = Math.max(280, data.length * 44 + 60);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
                background: "#fff", borderRadius: "12px",
                padding: "1.5rem", border: "0.5px solid #e0e0e0"
            }}
        >
            <div style={{ marginBottom: "1rem" }}>
                <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 500 }}>
                    Taux de réservation — circuits actifs
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#888" }}>
                    {data.length} circuit{data.length > 1 ? "s" : ""} · Moyenne : {moyenne}%
                </p>
            </div>

            {/* Légende */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "12px", fontSize: "12px", color: "#666" }}>
                {[
                    { label: "Excellent ≥ 80%", color: "#1D9E75" },
                    { label: "Bon 60–79%",       color: "#3266ad" },
                    { label: "Moyen 40–59%",     color: "#BA7517" },
                    { label: "Faible < 40%",     color: "#D85A30" },
                ].map(({ label, color }) => (
                    <span key={label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: color, display: "inline-block" }} />
                        {label}
                    </span>
                ))}
            </div>

            <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ left: 10, right: 30, top: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                        type="number"
                        domain={[0, 100]}
                        tickFormatter={(v) => `${v}%`}
                        tick={{ fontSize: 11 }}
                    />
                    <YAxis
                        type="category"
                        dataKey="circuitName"   // ← circuitName au lieu de nom
                        width={120}
                        tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                        x={moyenne}
                        stroke="#999"
                        strokeDasharray="4 4"
                        label={{ value: `Moy. ${moyenne}%`, position: "top", fontSize: 11, fill: "#999" }}
                    />
                    <Bar dataKey="taux" radius={[0, 4, 4, 0]} maxBarSize={28}>  {/* ← taux au lieu de tauxReservation */}
                        {data.map((entry, index) => (
                            <Cell key={index} fill={getBarColor(entry.taux)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default CircuitsTauxReservationAgence;