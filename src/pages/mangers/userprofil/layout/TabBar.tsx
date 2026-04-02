import { TABS } from "../profile/data";

export function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-2 border-b border-gray-300 mb-7">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2
              font-sans text-sm font-bold
              rounded-t-md
              transition-all duration-200
              ${isActive ? "bg-amber-600/10 border-b-2 border-amber-600 text-amber-700" : "bg-transparent border-b-2 border-transparent text-gray-500"}
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {isActive && (
              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full ml-1" />
            )}
          </button>
        );
      })}
    </div>
  );
}