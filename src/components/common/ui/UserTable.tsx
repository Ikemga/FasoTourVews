import { Edit2Icon, Eye, Trash2 } from "lucide-react";



const UserTable = ({ id, utilisateurs, mail, tel, role, statut, onDelete }) => {
    return (
        <div>
            <table className="m-2 w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead className="bg-primary/10 border-b transition">
                <tr>
                    <th className="py-2 border px-4 text-left">Utilisateurs</th>
                    <th className="py-2 border px-4 text-left">G-Mail</th>
                    <th className="py-2 border px-4 text-left">Téléphone</th>
                    <th className="py-2 border px-4 text-left">Rôle</th>
                    <th className="py-2 border px-4 text-left">Status</th>
                    <th className="py-2 border px-6 text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr className="group border-b hover:bg-gray-50 cursor-pointer transition">
                    <td className="py-2 px-4 text-left">{utilisateurs}</td>
                    <td className="py-2 px-4 text-left">{mail}</td>
                    <td className="py-2 px-4 text-left">{tel}</td>
                    <td className="py-2 px-4 text-left">{role}</td>
                    <td className="py-2 px-4 text-left">{statut}</td>
                    <td className="py-2 flex justify-center items-center gap-2">
                    <button className="opacity-0 group-hover:opacity-100 cursor-pointer rounded-full p-2 shadow-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="opacity-0 group-hover:opacity-100 cursor-pointer rounded-full p-2 shadow-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200">
                        <Edit2Icon className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(id)}
                        className="opacity-0 group-hover:opacity-100 cursor-pointer bg-white/95 rounded-full p-2 shadow-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;