const ActivityItem = ({ icon: Icon, color, title, meta, time }) => {
  return (
    <div className="text-left flex justify-between items-center gap-3 py-3 border-b border-b-black/20 hover:bg-amber-700/5 p-4">
      
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: color }}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm ">{title}</p>
        <p className="text-xs  mt-0.5">
          {meta}
        </p>
      </div>

      <span className="text-xs text-[var(--muted)] whitespace-nowrap">
        {time}
      </span>
      
    </div>
  );
};

export default ActivityItem;