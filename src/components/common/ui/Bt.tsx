import React from "react";

const Bt = ({ label }: { label: string }) => {
  return (
    <div>
      <button
        type="button"
        className="bg-primary cursor-pointer border-[#C45A1C] text-white px-6 py-3 rounded-xl font-bold hover:bg-amber-700 transition shadow-md"
      >
        {label}
      </button>
    </div>
  );
};

const Bt1 = () => {
  return (
    <input
      type="text"
      placeholder="Rechercher un site touristique..."
      className="text-black min-w-full mx-1 px-5 py-3 rounded-xl border border-gray-300 outline-none focus:shadow-lg"
    />
  );
};

export { Bt, Bt1 };