import { useRef } from "react";
import { AvatarBubble } from "./AvatarBubble";
import { PictureInPicture2 } from "lucide-react";

const ProfileHeader = ({ user, onAvatarChange, onCoverChange }) => {
  const coverRef = useRef();

  const handleCover = (e) => {
    const file = e.target.files?.[0];
    if (file) onCoverChange(URL.createObjectURL(file));
  };

  return (
    <div className="relative">
      
      {/* Couverture */}
      <div className="relative h-[240px] overflow-hidden">
        
        <img
          src={user.cover}
          alt="cover"
          className="w-full h-full object-cover block"
        />

        {/* Dégradé */}
        <div className="absolute bg-amber-50"/>

        {/* Bouton modifier */}
        <button
          onClick={() => coverRef.current?.click()}
          className="
            absolute top-4 right-4
            flex items-center gap-2
            px-4 py-2
            text-sm
            rounded-full
            backdrop-blur-md
            bg-amber-700
            shadow-lg
            text-white
            font-bold
            cursor-pointer
            hover:bg-amber-800
            transition
          "
        >
          <PictureInPicture2 /> Modifier la couverture
        </button>

        <input
          ref={coverRef}
          type="file"
          accept="image/*"
          onChange={handleCover}
          className="hidden"
        />

        {/* Avatar */}
        <div className="absolute bottom-1 left-11">
          <AvatarBubble
            src={user.avatar}
            size={100}
            onChange={onAvatarChange}
          />
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;