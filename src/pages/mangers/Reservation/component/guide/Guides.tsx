import { useEffect, useState } from "react";
import HeaderTitle from "../../../../../components/common/utilitaire/HeaderTitle";
import RechercheBarre from "../../../users/RechercheBarre";
import GuideManager from "../../../users/GuideManager";
import { UserCheck } from "lucide-react";
import GuideStatique from "../../../../../components/common/utilitaire/GuideStatique";
import { getMesGuidesStats } from "../../../../../service/GuideService";

const Guides = () => {
    const [search, setSearch] = useState("");
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await getMesGuidesStats();
                setStats(data);
            } catch (error) {
                console.error("Erreur stats guides", error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div>
            <HeaderTitle
                title="Gestion des guides"
                label="Liste des guides touristiques"
                initiales="GU"
                icon={<UserCheck className="w-6 h-6" />}
            />

            <main className="flex flex-col flex-1">

                <GuideStatique data={stats} />

                <div className="mx-5 py-5 flex justify-between items-center gap-6">
                    <RechercheBarre
                        value={search}
                        onChange={(val) => setSearch(val)}
                    />
                </div>

                <GuideManager search={search} />

            </main>
        </div>
    );
};

export default Guides;