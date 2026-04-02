import { Mail, MapPin, Phone, User } from "lucide-react";
import Card from "../primitives/Card";

const InfoCell = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 rounded-2xl p-4 border border-gray-100">
    
    <div className="text-amber-700 font-bold">
        {icon}
    </div>
    <div className="text-left bg-gray-50 rounded-2xl p-1 border border-gray-100">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const InfoPanel = ({ user }) => {
  const fields = [
    { label: "Prénom",      value: user.firstName, icon: <User size={16} /> },
    { label: "Nom",         value: user.lastName,  icon: <User size={16} /> },
    { label: "Email",       value: user.email,     icon: <Mail size={16} /> },
    { label: "Téléphone",   value: user.phone,     icon: <Phone size={16} /> },
    { label: "Localisation",value: user.location,  icon: <MapPin size={16} /> },
  ];

    return (
        <div>
        <Card title="Informations du profil" sub="Vos données personnelles enregistrées">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {fields.map((field) => (
                <InfoCell
                key={field.label}
                icon={field.icon}
                label={field.label}
                value={field.value}
                />
            ))}
            </div>

            {/* Bio */}
            <div className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="text-sm font-medium text-gray-500 text-left ">Bio</div>
                <div className="text-gray-800 text-left font-bold">{user.bio}</div>
            </div>
        </Card>
        </div>
    );
};

export default InfoPanel;