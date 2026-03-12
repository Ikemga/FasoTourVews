import { Eye, Pencil, Trash2 } from "lucide-react";

// Couleurs des avatars selon les initiales
const avatarColors = [
  "bg-orange-100 text-orange-500",
  "bg-blue-100 text-blue-500",
  "bg-green-100 text-green-500",
  "bg-purple-100 text-purple-500",
  "bg-pink-100 text-pink-500",
  "bg-yellow-100 text-yellow-600",
];

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const getAvatarColor = (name = "") => {
  const index = name.charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
};

// Badge Rôle
const roleBadgeClass = (role = "") => {
  const r = role.toLowerCase();
  if (r.includes("admin"))      return "border border-red-300 text-red-500 bg-red-50";
  if (r.includes("guide"))      return "border border-orange-300 text-orange-500 bg-orange-50";
  if (r.includes("touriste"))   return "border border-teal-300 text-teal-600 bg-teal-50";
  if (r.includes("gestion"))    return "border border-amber-300 text-amber-600 bg-amber-50";
  return "border border-gray-300 text-gray-500 bg-gray-50";
};

// Badge Statut
const statutBadgeClass = (statut = "") => {
  const s = statut.toLowerCase();
  if (s === "actif")     return "bg-emerald-600 text-white";
  if (s === "inactif")   return "border border-gray-300 text-gray-500 bg-white";
  if (s === "suspendu")  return "border border-red-300 text-red-500 bg-red-50";
  return "bg-gray-100 text-gray-500";
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const UserTable = ({ users = [], onDelete }) => {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f7f5f0] text-gray-400 font-medium text-xs uppercase tracking-wide">
            <th className="py-3 px-5 text-left">Utilisateur</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Téléphone</th>
            <th className="py-3 px-4 text-left">Rôle</th>
            <th className="py-3 px-4 text-left">Statut</th>
            <th className="py-3 px-4 text-left">Inscrit le</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-12 text-center text-gray-300 text-sm">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          ) : (
            users.map(({ id, nomComplet, mail, telephone, roles, actif, createAt }) => {
              const role = Array.isArray(roles) ? roles.join(", ") : (roles || "—");
              const statut = actif === true ? "actif" : actif === false ? "inactif" : String(actif ?? "—");

              return (
                <tr key={id} className="group border-t border-gray-100 hover:bg-[#faf9f6] transition-colors duration-150">
                  {/* Avatar + Nom */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${getAvatarColor(nomComplet)}`}>
                        {getInitials(nomComplet)}
                      </div>
                      <span className="font-semibold text-gray-800">{nomComplet}</span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="py-4 px-4 text-gray-400">{mail}</td>

                  {/* Téléphone */}
                  <td className="py-4 px-4 text-gray-500">{telephone}</td>

                  {/* Rôle */}
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${roleBadgeClass(role)}`}>
                      {role}
                    </span>
                  </td>

                  {/* Statut */}
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statutBadgeClass(statut)}`}>
                      {statut}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 text-gray-400">{formatDate(createAt)}</td>

                  {/* Actions */}
                  <td className="py-4 px-4">
                    <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete(id)}
                        className="p-1.5 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;