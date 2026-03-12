import { X } from "lucide-react";
import { motion } from "framer-motion";
import CircuitForm from "../../../pages/mangers/circuits/CircuitForm";


const AddCircuitModal = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-2xl rounded-2xl shadow-2xl bg-white backdrop-blur-xl border border-white/20"
            >
                <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[90vh]">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                        <h2 className="text-xl font-bold">Nouveau circuit</h2>
                        <button onClick={onClose} className="cursor-pointer text-gray-400 hover:text-black transition">
                            <X size={30} className="m-2 p-1 shadow-sm border rounded-2xl hover:border-red-500 hover:text-red-500" />
                        </button>
                    </div>

                    {/* Corps scrollable */}
                    <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
                        <CircuitForm onClose={onClose} 
                        onSuccess={() => fetchCircuits()}
                        />
                    </div>

                </div>
            </motion.div>
        </div>
    );
};

export default AddCircuitModal;