const CategoryCard = ({ item, selected, onClick }) => (
    <button
        type="button"
        onClick={() => onClick(item.id)}
        className="flex-1 min-w-[130px] text-left p-4 rounded-2xl border-2 transition-all duration-200"
        style={{
            borderColor:     selected ? "#c1440e" : "#E5E7EB",
            backgroundColor: selected ? "#FFF3EB" : "#FFFFFF",
        }}
    >
        <div className="relative mb-3">
            <div
                className="w-9 h-9 flex items-center justify-center rounded-xl"
                style={{
                    border:          `1.5px solid ${selected ? "#c1440e" : "#D1D5DB"}`,
                    backgroundColor: selected ? "#FFE8D9" : "#F3F4F6",
                }}
            >
                <item.Icon size={18} style={{ color: selected ? "#c1440e" : "#9CA3AF" }} />
            </div>
            <div
                className="absolute top-0 right-0 w-3 h-3 rounded-full transition-all"
                style={{ backgroundColor: selected ? "#c1440e" : "#E5E7EB" }}
            />
        </div>
        <p className="font-bold text-sm text-gray-900">{item.label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
    </button>
);

export default CategoryCard;