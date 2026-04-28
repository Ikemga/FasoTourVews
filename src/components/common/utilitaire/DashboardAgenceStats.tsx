import { motion } from "framer-motion";
import { Map, MapPin, Users, CalendarCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardAgence } from "../../../service/DashboardAgenceService";

// ── Type ──────────────────────────────────────────────────────────────
interface StatItem {
  icon:     React.ElementType;
  value:    number;
  label:    string;
  delta:    string;
  positive: boolean;
}

// ── Animation ─────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

// ── Carte stat ─────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, value, label, delta, positive, index }: StatItem & { index: number }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.09)" }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className="w-full bg-white rounded-2xl border border-[#f0e8e0] p-2 flex flex-col gap-3 cursor-default"
  >
    <div className="flex items-start justify-between">
      <motion.div
        className="w-10 h-10 rounded-xl bg-[#fdf0e8] flex items-center justify-center"
        whileHover={{ rotate: 8, scale: 1.12 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Icon size={18} className="text-orange-500" strokeWidth={1.7} />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08 + 0.3, duration: 0.3 }}
        className={`text-xs font-semibold flex items-center gap-0.5 ${
          positive ? "text-green-600" : "text-red-400"
        }`}
      >
        <span>{positive ? "↗" : "↘"}</span>
        {delta}
      </motion.span>
    </div>
    <div className="text-left">
      <motion.p
        className="text-2xl font-extrabold text-gray-900 leading-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
      >
        {value ?? 0} {/* ✅ Evite NaN en affichant 0 si value est null/undefined */}
      </motion.p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  </motion.div>
);

// ── Composant principal ────────────────────────────────────────────────
const DashboadAgenceStats = () => {
  const [stats, setStats]     = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    getDashboardAgence()
      .then((data) => {
        // ✅ S'assurer que totalReservations existe et n'est pas NaN
        const totalReservations = Number(data.totalReservations) || 0;

        setStats([
          {
            icon:     Map,
            value:    data.circuits?.["ACTIF"] ?? 0,
            label:    "Circuits actifs",
            delta:    "+0",
            positive: true,
          },
          {
            icon:     MapPin,
            value: data.totalSites ?? 0,
            label:    "Sites touristiques",
            delta:    "+0",
            positive: true,
          },
          {
            icon:     Users,
            value: data.guides?.true ?? 0,
            label:    "Guides actifs",
            delta:    "+0",
            positive: true,
          },
          {
            icon:     Users,
            value: data.totalTouristes ?? 0,
            label:    "Touristes",
            delta:    "+0",
            positive: true,
          },
          {
            icon:     CalendarCheck,
            value:    totalReservations, // ✅ utilise le champ totalReservations
            label:    "Réservations totales",
            delta:    "+0%",
            positive: true,
          },
        ]);
      })
      .catch(() => setError("Impossible de charger le dashboard."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6 text-gray-400">Chargement des statistiques...</p>;
  if (error)   return <p className="p-6 text-red-400">{error}</p>;

  return (
    <div className="flex flex-col md:flex-row gap-4 p-6 bg-[#faf7f4] w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} index={i} />
        ))}
      </div>
    </div>
  );
};

export default DashboadAgenceStats;