import { getRole } from "../token/TokenService";


type Role = "ADMIN" | "AGENCE" | "TOURISTE" | "GUIDE";

export const useAuth = () => {
  const role = getRole() as Role | null;

  const hasRole = (...roles: Role[]) => roles.includes(role as Role);

  const can = {
    // Calqué exactement sur ton SecurityConfigSpring
    manageRoles:      hasRole("ADMIN"),
    manageCategories: hasRole("ADMIN"),
    manageCircuits:   hasRole("ADMIN", "AGENCE"),
    manageSites:      hasRole("ADMIN", "AGENCE"),
    manageReservations: hasRole("ADMIN", "TOURISTE", "GUIDE", "AGENCE"),
    managePaiements:  hasRole("ADMIN", "TOURISTE", "GUIDE", "AGENCE"),
    manageAvis:       hasRole("ADMIN", "TOURISTE", "GUIDE", "AGENCE"),
    viewGuides:       hasRole("ADMIN", "GUIDE", "AGENCE"),
    viewAgences:      hasRole("ADMIN", "AGENCE"),
    viewTouristes:    hasRole("ADMIN", "TOURISTE"),
    isAdmin:          hasRole("ADMIN"),
  };

  return { role, hasRole, can };
};