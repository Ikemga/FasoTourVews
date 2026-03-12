import { useLocation, useNavigate } from "react-router-dom";
import SitesDetail from "./siteDetail/SitesDetail";
;

/**
 * Page wrapper pour SitesDetail.
 * Navigue vers /detail en passant le site via state :
 *   navigate("/detail", { state: { site } })
 */
const SitesDetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const site = location.state?.site ?? null;

    const handleBack = () => navigate(-1);
    const handleDelete = () => {
        // TODO: appel API suppression puis retour
        navigate(-1);
    };
    const handleToggleSidebar = () => {
        // TODO: logique sidebar globale
    };

    return (
        <SitesDetail
            site={site}
            onBack={handleBack}
            onDelete={handleDelete}
            onToggleSidebar={handleToggleSidebar}
        />
    );
};

export default SitesDetailPage;