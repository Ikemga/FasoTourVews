import HeaderLogo from "../Header/HeaderLogo";

const SideBarreLogo = ({ nomComplet = "Invité", userrole = "Invité" }) => {
  return (
    <div>
      <div className="flex flex-col px-4 gap-2">
        <HeaderLogo />
        <span className="text-left text-white text-sm font-bold">{nomComplet}</span>
        <span className="text-left text-gray-400 text-xs">{userrole}</span>
      </div>
      <hr className="border-gray-700 mx-4 my-3" />
    </div>
  );
};

export default SideBarreLogo;