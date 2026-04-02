const IdentityBar = ({ user }) => {
  return (
    <div className="
      pt-16
      flex items-end justify-between
      flex-wrap gap-3
      mb-8
    ">
      
      {/* Identité */}
      <div>
        <h1 className="
          font-serif text-amber-600
          text-[28px] md:text-[30px]
          font-semibold
          tracking-[-0.5px]
          leading-none
        ">
          {user.firstName} {user.lastName}
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          {user.handle} · membre depuis 2021
        </p>
      </div>
    </div>
  );
};

export default IdentityBar;