const InfoRow = ({ label, value, highlight }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-400 font-medium">{label}</span>
        <span className={`text-sm font-bold ${highlight ? "text-orange-500 text-lg" : "text-gray-800"}`}>
            {value}
        </span>
    </div>
);

export default InfoRow;