const HeaderNav = () => {

    const items = [
        { name: "Welcome", target: "welcome" },
        { name: "Sites Touristiques", target: "sites" },
        { name: "Circuits", target: "circuits" },
        { name: "Guides", target: "guides"},
        { name: "Apropos", target: "footer"},
    ]

    return (
        <aside>
        <nav>
            {items.map((item) => (
            <a
                key={item.name}
                href={`#${item.target}`}
                className="cursor-pointer text-sm text-text-soft mx-3 px-2 hover:text-primary transition"
            >
                {item.name}
            </a>
            ))}
        </nav>
        </aside>
    )
}

export default HeaderNav