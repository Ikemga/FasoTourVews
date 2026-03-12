import { Route } from "lucide-react";
import {MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const numberedIcon = (number) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width:30px; height:30px; border-radius:50%;
        background:#c1440e; color:white;
        display:flex; align-items:center; justify-content:center;
        font-weight:bold; font-size:13px;
        border: 2px solid white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">${number}</div>`,
    iconSize:   [30, 30],
    iconAnchor: [15, 15],
  });

// Géocode un texte → { lat, lng } via Nominatim
const geocode = async (localisation) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(localisation)}&format=json&limit=1`,
      { headers: { "Accept-Language": "fr" } }
    );
    const data = await res.json();
    if (data.length > 0) {
      return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    }
  } catch { /* silencieux */ }
  return null;
};

const CircuitSites = ({ sites = [] }) => {
  const [sitesGeo, setSitesGeo] = useState([]);
  const [loading, setLoading]   = useState(false);

  useEffect(() => {
    if (!sites.length) return;
    setLoading(true);

    const fetchAll = async () => {
      const results = await Promise.all(
        sites.map(async (site) => {
          const coords = await geocode(site.localisation ?? site.nom ?? "");
          return { ...site, coords };
        })
      );
      setSitesGeo(results);
      setLoading(false);
    };

    fetchAll();
  }, [sites]);

  if (!sites.length) return null;

  const sitesAvecCoords = sitesGeo.filter(s => s.coords);
  const polylinePoints  = sitesAvecCoords.map(s => [s.coords.lat, s.coords.lng]);

  const center = sitesAvecCoords.length
    ? [
        sitesAvecCoords.reduce((sum, s) => sum + s.coords.lat, 0) / sitesAvecCoords.length,
        sitesAvecCoords.reduce((sum, s) => sum + s.coords.lng, 0) / sitesAvecCoords.length,
      ]
    : [12.3714, -1.5197];

  return (
    <div className="mb-6">
      <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
        <Route className="w-5 h-5 text-[#c1440e]" />
        Itinéraire du circuit
      </h3>

      {/* Carte */}
      <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-4 h-84">
        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm bg-gray-50">
            Chargement de la carte...
          </div>
        ) : (
          <MapContainer
            center={center}
            zoom={sitesAvecCoords.length === 1 ? 10 : 8}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              Attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Ligne pointillée */}
            {polylinePoints.length > 1 && (
              <Polyline
                positions={polylinePoints}
                pathOptions={{
                  color:     "#c1440e",
                  weight:    3,
                  dashArray: "8, 8",
                  opacity:   0.8,
                }}
              />
            )}

            {/* Marqueurs numérotés */}
            {sitesAvecCoords.map((site, i) => (
              <Marker
                key={site.id ?? i}
                position={[site.coords.lat, site.coords.lng]}
                icon={numberedIcon(i + 1)}
              >
                <Popup>{site.nom}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-2">
        {sites.map((site, i) => (
          <span
            key={site.id ?? i}
            className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-[#c1440e] rounded-full text-sm font-medium border border-orange-200"
          >
            <span className="w-5 h-5 rounded-full bg-[#c1440e] text-white text-xs flex items-center justify-center font-bold flex-shrink-0">
              {i + 1}
            </span>
            {site.nom ?? site}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CircuitSites;