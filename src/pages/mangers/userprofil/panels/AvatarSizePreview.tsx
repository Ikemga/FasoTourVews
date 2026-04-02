
const AvatarSizePreview = ({ src, size, label }) => {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--muted)" }}>
        <img
            src={src}
            alt={label}
            style={{
            width: size, height: size,
            borderRadius: "50%",
            border: "1px solid var(--border)",
            objectFit: "cover",
            }}
        />
        {label}
        </div>
    );
}
export default AvatarSizePreview;