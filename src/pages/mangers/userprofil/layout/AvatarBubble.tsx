import { Camera, Pencil } from "lucide-react";
import { useRef, useEffect, useState } from "react";

export function AvatarBubble({src,size = 104, onChange,fallback = "/default-avatar.png",disabled = false}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(src || fallback);

  // Sync preview avec src externe
  useEffect(() => {
    setPreview(src || fallback);
  }, [src, fallback]);

  // Clean memory (blob URLs)
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFile = (file) => {
    if (!file) return;

    // Validation simple
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    onChange?.(file, url);
  };

  const handleChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled={disabled}
      onClick={openFilePicker}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openFilePicker();
      }}
      style={{ width: size, height: size }}
      className={`
        relative group rounded-full p-[3px]
        bg-gradient-to-tr from-amber-500 to-orange-600
        overflow-hidden
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* Avatar */}
      <img
        src={preview}
        alt="avatar"
        onError={(e) => (e.currentTarget.src = fallback)}
        className="w-full h-full rounded-full object-cover border-[3px] border-white"
      />

      {/* Overlay */}
      {!disabled && (
        <div
          className="absolute inset-[3px] rounded-full bg-black/50
                     flex items-center justify-center
                     opacity-0 group-hover:opacity-100
                     transition duration-200"
        >
          <Camera size={20} className="text-white" />
        </div>
      )}

      {/* Badge édition */}
      {!disabled && (
        <div
          className="absolute bottom-1 right-1 w-6 h-6
                    bg-white rounded-full border-2 border-amber-500
                    flex items-center justify-center shadow-sm"
        >
          <Pencil size={14} className="text-amber-600" />
        </div>
      )}

      {/* Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
}