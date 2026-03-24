const HeaderNav = ({ onClose }) => {
  const items = [
    { name: "Accueil", target: "welcome" },
    { name: "Sites Touristiques", target: "sites" },
    { name: "Circuits", target: "circuits" },
    { name: "Guides", target: "guides" },
    { name: "À propos", target: "footer" },
  ];

  return (
    <nav className="flex items-center">
      {items.map((item) => (
        <a
          key={item.name}
          href={`#${item.target}`}
          onClick={onClose}
          className="cursor-pointer text-sm text-text-soft mx-2 px-2 py-1 whitespace-nowrap
                     hover:text-primary transition-colors duration-200 rounded-md
                     hover:bg-white/10"
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
};

export default HeaderNav;