import {
  Clock,
  Users,
  Star,
  MapPin,
  Pencil,
  Trash2,
  CalendarDays,
} from "lucide-react";
import { Boutton } from "../../ui/Bt";

const CircuitIdDetail = () => {

  const steps = [
    "Parc National du Kaboré Tambi",
    "Village Artisanal de Koupèla",
    "Cascade Blanche de Banfora",
  ];

  return (
    <div className="p-8 bg-[#f5f1ec] min-h-screen">

      {/* TOP SECTION */}
      <div className="grid grid-cols-3 gap-6">

        {/* IMAGE */}
        <div className="col-span-2 relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            alt="circuit"
            className="w-full h-[320px] object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-3xl font-bold">
              Circuit Savane Dorée
            </h1>
          </div>
        </div>

        {/* INFO CARD */}
        <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">

          <div>
            <h2 className="font-semibold text-lg mb-4">
              Informations
            </h2>

            <div className="space-y-4 text-sm">

              <InfoRow label="Prix par personne">
                <span className="text-orange-600 font-semibold">
                  150 000 FCFA
                </span>
              </InfoRow>

              <InfoRow label="Durée">
                <span className="flex items-center gap-1">
                  <Clock size={16}/> 3 jours
                </span>
              </InfoRow>

              <InfoRow label="Date début">
                <span className="flex items-center gap-1">
                  <CalendarDays size={16}/> 01/04/2026
                </span>
              </InfoRow>

              <InfoRow label="Date fin">
                <span className="flex items-center gap-1">
                  <CalendarDays size={16}/> 03/04/2026
                </span>
              </InfoRow>

              <InfoRow label="Participants">
                <span className="flex items-center gap-1">
                  <Users size={16}/> 4 - 12 pers.
                </span>
              </InfoRow>

              <InfoRow label="Agence">
                FasoTour Agency
              </InfoRow>

              <InfoRow label="Transport">
                <span className="flex items-center gap-1 text-white bg-primary px-3 py-1 rounded-full text-xs">
                  <Star size={14}/> Inclus
                </span>
              </InfoRow>

            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-6">

            <div className="flex-1">
              <Boutton
                icon={<Pencil size={16}/>}
                label="Modifier"
              />
            </div>

            <button className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 transition">
              <Trash2 size={18}/>
            </button>

          </div>

        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="grid grid-cols-3 gap-6 mt-6">

        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm text-left">
          <h3 className="font-semibold mb-3">
            Description
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed">
            Un voyage inoubliable à travers les savanes dorées avec des arrêts
            aux villages artisanaux et cascades naturelles. Ce circuit vous
            emmène au cœur du Burkina Faso entre nature, culture et rencontres
            authentiques.
          </p>
        </div>

      </div>

      {/* STEPS */}
      <div className="grid grid-cols-3 gap-6 mt-6">

        <div className="col-span-2 bg-white rounded-2xl p-6 shadow-sm text-left">

          <h3 className="font-semibold mb-4">
            Étapes du circuit
          </h3>

          <div className="space-y-4">

            {steps.map((step, index) => (

              <div key={index} className="flex items-center gap-4">

                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white text-sm font-semibold">
                  {index + 1}
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={16} className="text-orange-500"/>
                  {step}
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

const InfoRow = ({ label, children }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-500">{label}</span>
    <span>{children}</span>
  </div>
);

export default CircuitIdDetail;