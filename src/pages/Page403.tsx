import { useNavigate } from "react-router-dom";

const Page403 = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1c1713] text-white gap-4">
      <h1 className="text-6xl font-bold text-orange-400">403</h1>
      <p className="text-gray-300">Vous n'avez pas accès à cette page.</p>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-white"
      >
        Retour
      </button>
    </div>
  );
};

export default Page403;