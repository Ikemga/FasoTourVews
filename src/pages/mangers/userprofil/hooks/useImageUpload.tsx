import { useState, useRef } from "react";

/**
 * useImageUpload — gère la sélection et la prévisualisation d'une image.
 * @param {string} initial - URL initiale de l'image
 */
export function useImageUpload(initial) {
  const [src, setSrc] = useState(initial);
  const ref = useRef();

  const pick = () => ref.current?.click();

  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setSrc(URL.createObjectURL(file));
  };

  const handleFiles = (files) => {
    const file = files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSrc(URL.createObjectURL(file));
    }
  };

  return { src, setSrc, ref, pick, onChange, handleFiles };
}
