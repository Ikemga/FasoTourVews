import { useState } from "react";

import { INITIAL_USER }   from "./profile/data";
import { useToast }       from "./hooks/useToast";

import { TabBar }         from "./layout/TabBar";
import { Toast }          from "./layout/Toast";
import InfoPanel from "./panels/InfoPanel";
import EditPanel from "./panels/EditPanel";
import PasswordPanel from "./panels/PasswordPanel";
import AvatarPanel from "./panels/AvatarPanel";
import ActivityPanel from "./panels/ActivityPanel";
import ProfileHeader from "./layout/ProfileHeader";
import IdentityBar from "./layout/IdentityBar";
import HeaderTitle from "../../../components/common/utilitaire/HeaderTitle";


export default function UserProfile() {
  const [user, setUser]   = useState(INITIAL_USER);
  const [tab,  setTab]    = useState("info");
  const { toast, show: showToast } = useToast();

  // Handlers remontés depuis les enfants
  const handleAvatarChange = (src) => setUser((u) => ({ ...u, avatar: src }));
  const handleCoverChange  = (src) => setUser((u) => ({ ...u, cover:  src }));
  const handleSave         = (data) => setUser((u) => ({ ...u, ...data }));

  const PANELS = {
    info:     <InfoPanel     user={user} />,
    edit:     <EditPanel     user={user} onSave={handleSave} showToast={showToast} />,
    password: <PasswordPanel showToast={showToast} />,
    avatar:   <AvatarPanel   avatar={user.avatar} onAvatarChange={handleAvatarChange} showToast={showToast} />,
    activity: <ActivityPanel />,
  };

  return (
    <div className="w-full">
      <HeaderTitle
        title="Gestion de profil utilisateur"
        label="Vue d'ensemble des information"
        initiales="AD"
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <ProfileHeader
        user={user}
        onAvatarChange={handleAvatarChange}
        onCoverChange={handleCoverChange}
      />

      <div className="mx-10" >
        <IdentityBar user={user} />
        <TabBar active={tab} onChange={setTab} />
        {PANELS[tab]}
      </div>

      <Toast message={toast} />
    </div>
  );
}
