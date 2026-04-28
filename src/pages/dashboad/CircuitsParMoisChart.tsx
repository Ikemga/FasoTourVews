import { useEffect, useState }  from "react";
import { motion }               from "framer-motion";
import {
    BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip,
    Legend, ResponsiveContainer
} from "recharts";
import { getCircuitsParMois } from "../../service/DashboardAgenceService";

const MOIS_LABELS = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
const PALETTE     = ["#3266ad","#1D9E75","#D85A30","#BA7517","#9B59B6","#E74C3C"];

const buildChartData = (raw) => {
    const annees = [...new Set(raw.map((d) => d.annee))].sort();
    return MOIS_LABELS.map((label, i) => {
        const moisNum = i + 1;
        const entry: any = { mois: label };
        annees.forEach((annee) => {
            const found = raw.find((d) => d.annee === annee && d.mois === moisNum);
            entry[String(annee)] = found?.total ?? 0;
        });
        return entry;
    });
};

const CircuitsParMoisChart = () => {
    const [data,    setData]    = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState(null);

    useEffect(() => {
        getCircuitsParMois()
            .then(setData)
            .catch(() => setError("Impossible de charger les données."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", gap: "10px" }}>
            <div style={{ width: "20px", height: "20px", border: "2px solid #3266ad", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
            <span style={{ fontSize: "13px", color: "#888" }}>Chargement...</span>
        </div>
    );

    if (error) return <p style={{ color: "red", padding: "1rem" }}>{error}</p>;

    const chartData = buildChartData(data);
    const annees    = [...new Set(data.map((d: any) => d.annee))].sort();
    const total     = data.reduce((acc: number, d: any) => acc + d.total, 0);

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
                    Circuits par mois
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#888" }}>
                    {total} circuit{total > 1 ? "s" : ""} · {annees.length} année{annees.length > 1 ? "s" : ""}
                </p>
            </div>

            <ResponsiveContainer width="100%" height={280}>
                <BarChart data={chartData} barCategoryGap="20%" barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis dataKey="mois" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip
                        formatter={(value: any, name: any) =>
                            [`${value} circuit${value > 1 ? "s" : ""}`, name]
                        }
                    />
                    <Legend
                        formatter={(value) => (
                            <span style={{ fontSize: "13px", color: "#444" }}>{value}</span>
                        )}
                    />
                    {annees.map((annee: any, i) => (
                        <Bar
                            key={annee}
                            dataKey={String(annee)}
                            fill={PALETTE[i % PALETTE.length]}
                            radius={[4, 4, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </motion.div>
    );
};

export default CircuitsParMoisChart;