import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import HeaderActions from "./HeaderActions";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* ── Main header bar ── */}
      <header className="sticky top-0 z-50 w-full bg-header-bg shadow-sm">
        <div className="px-4 sm:px-8 lg:px-16 xl:px-20 py-3 flex items-center justify-between gap-4">

          {/* Logo */}
          <HeaderLogo />

          {/* Desktop nav — hidden below lg */}
          <div className="hidden lg:flex flex-1 justify-center">
            <HeaderNav onClose={closeMenu} />
          </div>

          {/* Desktop actions — hidden below lg */}
          <div className="hidden lg:flex">
            <HeaderActions onClose={closeMenu} />
          </div>

          {/* Mobile right side: Connexion + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Show Connexion button on mobile too */}
            <div className="flex sm:hidden">
              <HeaderActions onClose={closeMenu} />
            </div>
            <div className="hidden sm:flex lg:hidden">
              <HeaderActions onClose={closeMenu} />
            </div>

            {/* Hamburger toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              className="p-2 rounded-xl text-text-soft hover:bg-white/10 transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {/* Backdrop */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden
                    ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-down panel */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-header-bg shadow-xl pt-20 pb-6 px-6
                    transform transition-transform duration-300 ease-in-out lg:hidden
                    ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Mobile nav links */}
        <nav className="flex flex-col gap-1 mb-6">
          {[
            { name: "Accueil", target: "welcome" },
            { name: "Sites Touristiques", target: "sites" },
            { name: "Circuits", target: "circuits" },
            { name: "Guides", target: "guides" },
            { name: "À propos", target: "footer" },
          ].map((item) => (
            <a
              key={item.name}
              href={`#${item.target}`}
              onClick={closeMenu}
              className="text-text-soft text-base px-3 py-2.5 rounded-xl
                         hover:bg-white/10 hover:text-primary transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-white/10 mb-5" />

        {/* Mobile CTA buttons */}
        <div className="flex flex-col gap-3">
          <a
            href="/register"
            onClick={closeMenu}
            className="w-full text-center border-2 border-primary text-primary
                       px-5 py-2.5 rounded-xl font-medium text-sm
                       hover:bg-primary hover:text-white transition-all duration-200"
          >
            Inscription
          </a>
          <a
            href="/login"
            onClick={closeMenu}
            className="w-full text-center bg-primary text-white
                       px-5 py-2.5 rounded-xl font-medium text-sm shadow-md
                       hover:bg-primaryDark transition-all duration-200"
          >
            Connexion
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;