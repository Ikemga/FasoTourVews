const LiensRapides = () => {
    const items = [
        { name: "Welcome", target: "welcome" },
        { name: "Sites Touristiques", target: "sites" },
        { name: "Circuits", target: "circuits" },
        { name: "Guides", target: "guides"},
        { name: "Apropos", target: "footer"},
    ]

  return (
    <div className="text-left ">
        <h4 className="text-white font-semibold text-lg mb-5 relative after:content-[''] after:block after:w-8 after:h-0.5 after:bg-[#C45A1C] after:mt-1">
            Liens Rapides
        </h4>
        <ul className="space-y-3 text-sm">
            {items.map((items) => (
            <li key={items.name} className="items-center  group">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C45A1C] opacity-0 group-hover:opacity-100 transition duration-300" />
                <a href={`#${items.target}`} className="text-gray-400 hover:text-[#C45A1C] hover:translate-x-1 transition-all duration-300">
                {items.name}
                </a>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default LiensRapides;