import { Eye, Pencil, Trash2 } from "lucide-react";


const avatarColors = [
  "bg-orange-100 text-orange-500",
  "bg-blue-100 text-blue-500",
  "bg-green-100 text-green-500",
  "bg-purple-100 text-purple-500",
  "bg-pink-100 text-pink-500",
  "bg-yellow-100 text-yellow-600",
];

export const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

export const getAvatarColor = (name = "") =>
  avatarColors[name.charCodeAt(0) % avatarColors.length];

export const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
};

// ─── Renderers réutilisables pour les cellules ─────────────────────────────────

export const Renderers = {
  /** Avatar circulaire + texte en gras */
  avatar: (value) => (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${getAvatarColor(value)}`}>
        {getInitials(value)}
      </div>
      <span className="font-semibold text-gray-800">{value ?? "—"}</span>
    </div>
  ),

  /** Texte discret (emails, téléphones…) */
  muted: (value) => <span className="text-gray-400">{value ?? "—"}</span>,

  subtle: (value) => <span className="text-gray-500">{value ?? "—"}</span>,

  /** Badge générique avec une map couleur */
  badge:
    (colorMap, defaultClass = "border border-gray-300 text-gray-500 bg-gray-50") =>
    (value) => {
      const key = String(value ?? "").toLowerCase();
      const cls = Object.entries(colorMap).find(([k]) => key.includes(k))?.[1] ?? defaultClass;
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>
          {value ?? "—"}
        </span>
      );
    },

  /** Date formatée */
  date: (value) => <span className="text-gray-400">{formatDate(value)}</span>,

  /** Booléen → actif / inactif */
  boolStatut: (value) => {
    const label = value === true ? "actif" : value === false ? "inactif" : String(value ?? "—");
    const cls =
      label === "actif"
        ? "bg-emerald-600 text-white"
        : label === "suspendu"
        ? "border border-red-300 text-red-500 bg-red-50"
        : "border border-gray-300 text-gray-500 bg-white";
    return <span className={`px-3 py-1 rounded-full text-xs font-medium ${cls}`}>{label}</span>;
  },
};

// ─── Composant principal ───────────────────────────────────────────────────────

const DataTable = ({
  rows = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  emptyText = "Aucune donnée trouvée.",
}) => {
  const hasActions = onView || onEdit || onDelete;

  return (
    <div className="rounded-2xl overflow-x-auto  border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#f7f5f0] text-gray-400 font-medium text-xs uppercase tracking-wide">
            {columns.map((col) => (
              <th key={col.key} className={`py-3 px-4 text-left ${col.headerClass ?? ""}`}>
                {col.label}
              </th>
            ))}
            {hasActions && (
              <th className="py-3 px-4 text-right">Actions</th>
            )}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="py-12 text-left text-gray-300 text-sm"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id ?? i}
                className="group border-t border-gray-100 hover:bg-[#faf9f6] transition-colors duration-150"
              >
                {columns.map((col) => {
                  const rawValue = col.accessor ? col.accessor(row) : row[col.key];
                  return (
                    <td key={col.key} className={`text-left py-4 px-4 ${col.cellClass ?? ""}`}>
                      {col.render ? col.render(rawValue, row) : (rawValue ?? "—")}
                    </td>
                  );
                })}

                {hasActions && (
                  <td className="py-4 px-4">
                    <div className="flex justify-end items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-1.5 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;