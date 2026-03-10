import { useState } from "react";

const UserTabGroup = ({ tabs = [], activeTab = 0, onChange }) => {
  const [active, setActive] = useState(activeTab);

  const handleClick = (index) => {
    setActive(index);
    onChange?.(index);
  };

  return (
    <div className="inline-flex gap-1 bg-white rounded-3xl p-1.5 relative max-w-fit">
      {tabs.map((tab, index) => (
        <button
          key={tab.label}
          onClick={() => handleClick(index)}
          className={`px-4 py-2 rounded-3xl text-sm font-medium transition-all duration-200 whitespace-nowrap
            ${active === index
              ? "bg-[#fdf0e8] text-gray-900"
              : "text-gray-400 hover:text-gray-600"
            }`}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};

export default UserTabGroup;