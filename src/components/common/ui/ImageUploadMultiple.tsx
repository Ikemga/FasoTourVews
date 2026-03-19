import { useState } from "react";
import { UploadCloud, X } from "lucide-react";

const ImageUploadMultiple = ({ onChange }) => {
    const [images, setImages] = useState([]);

    const handleImages = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        const updated = [...images, ...newImages];
        setImages(updated);
        onChange?.(updated.map(i => i.file));
    };

    const removeImage = (index) => {
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        onChange?.(updated.map(i => i.file)); 
    };

    return (
        <div className="w-full space-y-3">
            <label className="inline-flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-gray-50 transition">
                <UploadCloud className="w-5 h-5 text-gray-400" />
                <span className="text-[10px] text-gray-500 mt-0.5">Image</span>
                <input type="file" accept="image/*" multiple onChange={handleImages} className="hidden" />
            </label>
            {images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {images.map((img, index) => (
                        <div key={index} className="relative w-16 h-16 flex-shrink-0">
                            <img src={img.preview} alt="preview" className="w-full h-full object-cover rounded-xl" />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200 shadow p-0.5 rounded-full text-gray-600 hover:text-red-500 hover:border-red-300 transition z-10"
                            >
                                <X size={12} strokeWidth={2.5} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploadMultiple;