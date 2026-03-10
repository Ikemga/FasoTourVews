import { Bt, Bt1 } from "../ui/Bt";

const RechercheBarre = () => {
  return (
    <div className="cursor-pointer w-full sm:w-1/2 mt-5 bg-white p-4 md:p-6 rounded-3xl shadow-sm mx-auto hover:shadow-lg transition">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full">
          <Bt1 />
        </div>
        <Bt label="Recherche" />
      </div>
    </div>
  );
};

export default RechercheBarre;