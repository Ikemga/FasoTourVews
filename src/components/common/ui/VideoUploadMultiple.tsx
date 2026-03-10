import { useState } from "react";
import { UploadCloud, X, Play } from "lucide-react";

const VideoUploadMultiple = () => {
  const [videos, setVideos] = useState([]);

  const handleVideos = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setVideos((prev) => [...prev, ...newVideos]);
  };

  const removeVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-3">

      {/* Zone Upload */}
      <label className="inline-flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary hover:bg-gray-50 transition">
        <UploadCloud className="w-5 h-5 text-gray-400" />
        <span className="text-[10px] text-gray-500 mt-0.5">Vidéo</span>
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleVideos}
          className="hidden"
        />
      </label>

      {/* Aperçus */}
      {videos.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {videos.map((vid, index) => (
            <div key={index} className="relative w-16 h-16 flex-shrink-0">

              {/* Miniature vidéo */}
              <video
                src={vid.preview}
                className="w-full h-full object-cover rounded-xl bg-black"
                muted
                preload="metadata"
              />

              {/* Icône Play */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-black/40 rounded-full p-1">
                  <Play size={12} className="text-white fill-white" />
                </div>
              </div>

              {/* Bouton suppression */}
              <button
                type="button"
                onClick={() => removeVideo(index)}
                className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200
                           shadow p-0.5 rounded-full text-gray-600 hover:text-red-500
                           hover:border-red-300 transition z-10"
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

export default VideoUploadMultiple;