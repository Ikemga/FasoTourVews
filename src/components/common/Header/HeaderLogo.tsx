import { Map } from "lucide-react";

const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center shadow-md shrink-0">
        <Map className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-bold text-xl leading-none">
        <span className="text-white">Faso</span>
        <span className="text-primary">Tour</span>
      </h3>
    </div>
  );
};

export default HeaderLogo;