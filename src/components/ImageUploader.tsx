import { useState } from 'react';

interface ImageUploaderProps {
  label?: string;
  onChange?: (file: File | null) => void;
  preview?: boolean;
  className?: string;
}

export default function ImageUploader({ label, onChange, preview = true, className = '' }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);

    if (file && preview) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className={`mb-3 ${className}`}>
      {label && <label className="form-label">{label}</label>}
      <input
        type="file"
        className="form-control"
        accept="image/*"
        onChange={handleChange}
      />
      {previewUrl && (
        <div className="mt-2">
          <img src={previewUrl} alt="Preview" className="img-thumbnail" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
}
