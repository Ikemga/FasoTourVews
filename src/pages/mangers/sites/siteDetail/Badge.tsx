const Badge = ({ label}) => {

    return (
        <span className={`px-3 py-1 rounded-full text-xs text-white font-semibold backdrop-blur-sm bg-primary`}>
            {label}
        </span>
    );
};

export default Badge;