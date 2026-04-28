import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart, Pie, Cell, Tooltip,
  Legend, ResponsiveContainer
} from "recharts";
import { getSitesParCategorie } from "../../service/SiteService";

const COLORS = [
  "#3266ad", "#1D9E75", "#D85A30",
  "#BA7517", "#888780", "#9B59B6", "#E74C3C"
];

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return percent > 0.05 ? (
    <text
      x={x} y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={500}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { categorie, nombre } = payload[0].payload;
    return (
      <div style={{
        background: "#fff", border: "0.5px solid #e0e0e0",
        borderRadius: "8px", padding: "10px 14px", fontSize: "13px"
      }}>
        <p style={{ margin: 0, fontWeight: 500 }}>{categorie}</p>
        <p style={{ margin: "4px 0 0", color: "#666" }}>{nombre} site{nombre > 1 ? "s" : ""}</p>
      </div>
    );
  }
  return null;
};

const SitesParCategorieChart = () => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    getSitesParCategorie()
      .then(res => setData(res.data))
      .catch(() => setError("Impossible de charger les données."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center", padding: "2rem", color: "#888" }}>Chargement...</p>;
  if (error)   return <p style={{ color: "red", padding: "1rem" }}>{error}</p>;

  const total = data.reduce((acc, s) => acc + s.nombre, 0);

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
          Sites par catégorie
        </h3>
        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#888" }}>
          {total} sites · {data.length} catégories
        </p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="nombre"
            nameKey="categorie"
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={CustomLabel}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ fontSize: "13px", color: "#444" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default SitesParCategorieChart;