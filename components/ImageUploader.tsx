import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { UploadIcon } from './icons';

interface ImageUploaderProps {
  label: string;
  onFileChange: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ label, onFileChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onFileChange(file);
    } else {
      setPreview(null);
      onFileChange(null);
    }
  }, [onFileChange]);

  useEffect(() => {
    // Cleanup function to revoke the object URL
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="block text-sm font-medium text-gray-400">{label}</label>
      <div className="w-full aspect-square border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-gray-500 relative overflow-hidden bg-slate-900/50 hover:border-cyan-400 transition-colors group">
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-center">
            <UploadIcon className="w-8 h-8 mx-auto text-slate-500 group-hover:text-cyan-400 transition-colors" />
            <p className="mt-1 text-sm">Click to upload</p>
          </div>
        )}
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
};
