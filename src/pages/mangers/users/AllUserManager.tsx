import UserTabe from "../../../components/common/ui/UserTable";

const AllUserManager = () =>{
    return(
        <div>
            <p className="text-4xl text-center font-bold text-primary">Liste de tous les User du SI</p>
            <UserTabe
  id={1}
  utilisateurs="Sakal Sawadogo"
  mail="sakal.sawadogo@gmail.com"
  tel="+226 70 12 34 56"
  role="Administrateur"
  statut="Actif"
  onDelete={() => handleDelete(1)}
/>

<UserTabe
  id={2}
  utilisateurs="Awa Traoré"
  mail="awa.traore@gmail.com"
  tel="+226 65 45 78 90"
  role="Guide"
  statut="Actif"
  onDelete={() => handleDelete(2)}
/>

<UserTabe
  id={3}
  utilisateurs="Issa Ouédraogo"
  mail="issa.ouedraogo@gmail.com"
  tel="+226 76 11 22 33"
  role="Touriste"
  statut="Inactif"
  onDelete={() => handleDelete(3)}
/>

<UserTabe
  id={4}
  utilisateurs="Mariam Kaboré"
  mail="mariam.kabore@gmail.com"
  tel="+226 71 98 76 54"
  role="Gestionnaire"
  statut="Actif"
  onDelete={() => handleDelete(4)}
/>

<UserTabe
  id={5}
  utilisateurs="Adama Zongo"
  mail="adama.zongo@gmail.com"
  tel="+226 64 55 44 33"
  role="Guide"
  statut="Suspendu"
  onDelete={() => handleDelete(5)}
/>
        </div>
    )
}
export default AllUserManager;