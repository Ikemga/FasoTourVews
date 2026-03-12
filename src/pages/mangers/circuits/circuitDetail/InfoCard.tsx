const InfoCard = ({ icon, label, value }) => (
    <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
        {icon}
        <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
        </div>
    </div>
);

export default InfoCard;