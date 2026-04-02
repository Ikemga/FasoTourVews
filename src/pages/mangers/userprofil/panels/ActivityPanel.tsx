import Card from "../primitives/Card";
import { ACTIVITIES }   from "../profile/data";
import ActivityItem from "./ActivityItem";

/**
 * ActivityPanel — liste complète de l'historique d'activité.
 */
const ActivityPanel = () =>{
  return (
    <div style={{ animation: "fadeUp .3s ease" }}>
      <Card title="Historique d'activité" sub="Vos dernières actions sur le compte">
        {ACTIVITIES.map((a, i) => (
          <ActivityItem key={i} {...a} />
        ))}
      </Card>
    </div>
  );
}
export default ActivityPanel;