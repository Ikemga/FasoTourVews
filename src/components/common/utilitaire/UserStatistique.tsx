import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getUserStats } from "../../../service/DashboardService";

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const StatCard = ({ icon: Icon, value, label, delta, positive, index }) => (
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
        {value}
      </motion.p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  </motion.div>
);

const UserStatistique = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const { data } = await getUserStats();

        // Mapping du DTO backend vers UI
        const mappedStats = [
          { icon: Users, value: data.totalUtilisateurs, label: "Total", delta: "+0", positive: true },
          { icon: Users, value: data.totalAgences, label: "Agences", delta: "+0", positive: true },
          { icon: Users, value: data.totalGuides, label: "Guides", delta: "+0", positive: true },
          { icon: Users, value: data.utilisateursActifs, label: "Actifs", delta: "+0", positive: true },
          { icon: Users, value: data.totalTouristes, label: "Touristes", delta: "+0", positive: true },
        ];

        setStats(mappedStats);
      } catch (error) {
        console.error("Erreur chargement stats utilisateur :", error);
      }
    };

    fetchUserStats();
  }, []);

  if (!stats.length) return <p className="p-6">Chargement des statistiques utilisateur...</p>;

  return (
    <div className="w-full p-6 bg-[#faf7f4]">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} index={i} />
        ))}
      </div>
    </div>
  );
};

export default UserStatistique;