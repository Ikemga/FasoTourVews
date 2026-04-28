import { useState, useEffect } from "react";
import { getNomComplet, getRole } from "../token/TokenService";

export const useAuth = () => {
    const [nomComplet, setNomComplet] = useState(getNomComplet());
    const [role, setRole]             = useState(getRole());

    useEffect(() => {
        // Relit le localStorage si la page est déjà chargée
        setNomComplet(getNomComplet());
        setRole(getRole());
    }, []);

    const hasRole = (...roles) => roles.includes(role);

    const can = {
        manageRoles:        hasRole("ADMIN"),
        manageCategories:   hasRole("ADMIN"),
        manageLangues:      hasRole("ADMIN"),
        manageGuide:        hasRole("AGENCE"),
        manageSites:        hasRole("ADMIN", "AGENCE","TOURISTE", "GUIDE"),
        manageCircuits:     hasRole("ADMIN", "AGENCE","TOURISTE", "GUIDE"),
        manageReservations: hasRole("ADMIN", "AGENCE", "TOURISTE", "GUIDE"),
        managePaiements:    hasRole("ADMIN", "AGENCE", "TOURISTE", "GUIDE"),
        manageAvis:         hasRole("ADMIN", "AGENCE", "TOURISTE", "GUIDE"),
        viewDashboard:      hasRole("ADMIN", "AGENCE"),
        viewGuides:         hasRole("ADMIN", "GUIDE", "AGENCE"),
        viewAgences:        hasRole("ADMIN", "AGENCE"),
        viewTouristes:      hasRole("ADMIN", "TOURISTE"),
        isAdmin:            hasRole("ADMIN"),
    };

    return { role, nomComplet, hasRole, can };
};