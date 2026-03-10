
const Support = () => {

    return(
        <div className="text-left">
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
                {["Centre d'aide", "Conditions d'utilisation", "Politique de confidentialité", "Devenir Guide", "Partenaires"].map((link) => (
                <li key={link}>
                    <a href="#" className="hover:text-[#C45A1C] transition">{link}</a>
                </li>
                ))}
            </ul>
        </div>
    )
}
export default Support;