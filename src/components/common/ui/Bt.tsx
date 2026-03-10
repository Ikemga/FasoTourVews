
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"


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

const Bt2 = ({ label }: { label: string }) => {
  return (
    <div>
      <Link
        to={`/${label.toLowerCase()}`}
        className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-xl font-bold 
                  hover:bg-amber-700 hover:text-white transition-all duration-300 ease-in-out cursor-pointer group"
      >
        <span>{label}</span>
        <ChevronRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
      </Link>
    </div>
  );
};
const Bt1 = () => {
  return (
    <input
      type="text"
      placeholder="Rechercher un site touristique..."
      className="text-black min-w-full mx-1 px-5 py-3 rounded-xl border border-gray-300 outline-none  focus:border-primary focus:shadow-orange-500/40 transition"
    />
  );
};

const Boutton = ({ label, icon }) => {
  return (
    <button className="font-bold flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-2xl hover:opacity-90 transition whitespace-nowrap">
      {icon}
      <span>{label}</span>
    </button>
  );
};

const BouttonPopUp = ({ onClick,label, icon }) => {
  return (
    <button 
    onClick={onClick}
    className="cursor-pointer font-bold flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-2xl hover:opacity-90 transition whitespace-nowrap">
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Select = ({ label, options = [], ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-600">{label}</label>
    <select
      {...props}
      className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      {options.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  </div>
);

const Back = ({to,icon,label}) =>{
  return(
    <div className="w-auto">
      <Link
      to = {to} className="flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-primary/20 hover:rounded-2xl hover:text-primary ">
        {icon}
        <span className="text-black font-semibold hover:text-primary">{label}</span>
      </Link>
    </div>
    
  )
}



export { Bt, Bt1, Bt2,Boutton, BouttonPopUp, Select,Back };