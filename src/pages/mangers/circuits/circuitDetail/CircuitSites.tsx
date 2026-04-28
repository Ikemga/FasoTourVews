import { Route } from "lucide-react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import L from "leaflet";

// ─── Fix des icônes Leaflet (une seule fois, hors composant) ──────────────────
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
delete L.Icon.Default.prototype._getIconUrl;

// ─── Cache module-level pour ne pas re-géocoder entre remounts ────────────────
const geocodeCache = new Map();

const geocode = async (query, signal) => {
  if (!query) return null;
  if (geocodeCache.has(query)) return geocodeCache.get(query);

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
      { headers: { "Accept-Language": "fr" }, signal }
    );
    const data = await res.json();
    if (data.length > 0) {
      const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      geocodeCache.set(query, coords);
      return coords;
    }
  } catch (err) {
    if (err.name !== "AbortError") console.warn(`Geocode failed for "${query}"`, err);
  }
  return null;
};

// ─── Icônes mémoïsées par numéro ──────────────────────────────────────────────
const iconCache = new Map();
const numberedIcon = (number) => {
  if (iconCache.has(number)) return iconCache.get(number);
  const icon = L.divIcon({
    className: "",
    html: `<div style="
      width:32px;height:32px;border-radius:50%;
      background:#c1440e;color:white;
      display:flex;align-items:center;justify-content:center;
      font-weight:700;font-size:13px;
      border:2.5px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,.35);
      font-family:system-ui,sans-serif;
    ">${number}</div>`,
    iconSize:   [32, 32],
    iconAnchor: [16, 16],
    popupAnchor:[0, -18],
  });
  iconCache.set(number, icon);
  return icon;
};

// ─── Auto-fit bounds dès que les coords sont disponibles ─────────────────────
const MapFitter = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 11, { animate: true });
    } else {
      map.fitBounds(L.latLngBounds(points), { padding: [48, 48], animate: true });
    }
  }, [map, points]);
  return null;
};

// ─── Composant principal ──────────────────────────────────────────────────────
const CircuitSites = ({ sites = [] }) => {
  // État unifié → jamais de render incohérent entre loading/data
  const [state, setState] = useState({ status: "idle", sitesGeo: [] });
  const abortRef = useRef(null);

  const fetchGeodata = useCallback(async (siteList) => {
    // Annule le fetch précédent si on re-render avec de nouveaux sites
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    setState({ status: "loading", sitesGeo: [] });

    // Requêtes parallèles avec le même signal
    const results = await Promise.all(
      siteList.map(async (site) => {
        const query = site.localisation ?? site.nom ?? "";
        const coords = await geocode(query, signal);
        return { ...site, coords };
      })
    );

    if (!signal.aborted) {
      setState({ status: "ready", sitesGeo: results });
    }
  }, []);

  useEffect(() => {
    if (!sites.length) {
      setState({ status: "idle", sitesGeo: [] });
      return;
    }
    fetchGeodata(sites);
    return () => abortRef.current?.abort();
  }, [sites, fetchGeodata]);

  // ── Dérivés mémoïsés ────────────────────────────────────────────────────────
  const sitesAvecCoords = useMemo(
    () => state.sitesGeo.filter((s) => s.coords),
    [state.sitesGeo]
  );

  const polylinePoints = useMemo(
    () => sitesAvecCoords.map((s) => [s.coords.lat, s.coords.lng]),
    [sitesAvecCoords]
  );

  // Centre initial (avant fitBounds) — évite un recalcul inutile
  const defaultCenter = useMemo(() => {
    if (!sitesAvecCoords.length) return [12.3714, -1.5197]; // Ouagadougou
    const lat = sitesAvecCoords.reduce((s, p) => s + p.coords.lat, 0) / sitesAvecCoords.length;
    const lng = sitesAvecCoords.reduce((s, p) => s + p.coords.lng, 0) / sitesAvecCoords.length;
    return [lat, lng];
  }, [sitesAvecCoords]);

  if (!sites.length) return null;

  const isLoading = state.status === "loading";

  return (
    <div className="mb-6">
      <h3 className="flex items-center gap-2 font-bold text-gray-800 mb-3">
        <Route className="w-5 h-5 text-[#c1440e]" />
        Itinéraire du circuit
      </h3>

      {/* ── Carte ─────────────────────────────────────────────────────────── */}
      <div
        className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-4"
        style={{ height: 340 }}
      >
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm bg-gray-50 gap-2">
            <span className="animate-spin inline-block w-4 h-4 border-2 border-[#c1440e] border-t-transparent rounded-full" />
            Chargement de la carte…
          </div>
        ) : (
          <MapContainer
            center={defaultCenter}
            zoom={sitesAvecCoords.length === 1 ? 11 : 7}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Fit automatique dès que les points sont connus */}
            <MapFitter points={polylinePoints} />

            {/* Tracé du circuit */}
            {polylinePoints.length > 1 && (
              <Polyline
                positions={polylinePoints}
                pathOptions={{
                  color:     "#c1440e",
                  weight:    3,
                  dashArray: "10, 8",
                  opacity:   0.85,
                  lineCap:   "round",
                  lineJoin:  "round",
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
                <Popup>
                  <strong>{site.nom}</strong>
                  {site.description && <p className="text-xs mt-1 text-gray-600">{site.description}</p>}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* ── Légende ───────────────────────────────────────────────────────── */}
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