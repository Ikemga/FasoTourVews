import { Routes, Route } from "react-router-dom";
import './App.css';

// Pages publiques
import Index             from './pages/Index';
import Login             from "./pages/Login";
import Register          from "./pages/Register";

// Pages protégées
import IndexP            from "./pages/IndexP";
import ReservationPage   from "./pages/mangers/Reservation/ReservationPage";
import CircuitIdDetail   from "./components/common/detail/circuits/CircuitIdDetail";
import SitesDetailPage   from "./pages/mangers/sites/SitesDetailPage";
import ProtectedRoute from './service/protected/ProtectedRoute';
import Page403 from "./pages/Page403";


function App() {
  return (
    <div className="items-center text-center">
      <Routes>

        {/* ── Publiques ─────────────────────────────────────── */}
        <Route path="/"        element={<Index />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/403"     element={<Page403 />} />

        {/* ── Détails publics (circuits / sites) ────────────── */}
        <Route path="/detailcircuits" element={<CircuitIdDetail />} />
        <Route path="/detailsite"     element={<SitesDetailPage />} />

        {/* ── Dashboard : ADMIN + AGENCE ────────────────────── */}
        <Route path="/index" element={
          <ProtectedRoute roles={["ADMIN", "AGENCE", "GUIDE", "TOURISTE"]}>
            <IndexP />
          </ProtectedRoute>
        }/>

        {/* ── Réservations : tous les rôles connectés ───────── */}
        <Route path="/reservation" element={
          <ProtectedRoute roles={["ADMIN", "AGENCE", "TOURISTE", "GUIDE"]}>
            <ReservationPage />
          </ProtectedRoute>
        }/>

      </Routes>
    </div>
  );
}

export default App;