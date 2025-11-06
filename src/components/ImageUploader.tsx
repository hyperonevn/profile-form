import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { UserIcon, UploadIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  subdomain: string;
  disabled?: boolean;
}

const CDN_BASE = "https://profile-cdn.hyperonevn.workers.dev";

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  subdomain,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!subdomain.trim()) {
      alert("⚠️ Vui lòng nhập Subdomain ở trên trước khi upload ảnh.");
      return;
    }

    if (disabled) {
      alert("⚠️ Subdomain đã được sử dụng. Vui lòng chọn subdomain khác.");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("field", "avatar");
      formData.append("subdomain", subdomain);

      const res = await fetch(
        "https://profile-create.hyperonevn.workers.dev/api/profile/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.success) {
        let finalUrl = "";

        if (data.url?.startsWith("http")) {
          finalUrl = data.url.replace(
            "https://profile-storage.hyperonevn.workers.dev",
            CDN_BASE
          );
        } else if (data.key) {
          finalUrl = `${CDN_BASE}/${data.key}`;
        } else {
          finalUrl = `${CDN_BASE}/users/${subdomain}/avatar.jpg`;
        }

        if (!finalUrl.startsWith(CDN_BASE)) {
          finalUrl = finalUrl.replace(/^https:\/\/[^/]+/, CDN_BASE);
        }

        onChange(finalUrl);
        setPreview(finalUrl);
      } else {
        alert("Upload thất bại, vui lòng thử lại.");
      }
    } catch (err) {
      alert("Lỗi kết nối đến server.");
    } finally {
      setLoading(false);
    }
  };

  const displayImage = preview || value || "";

  return (
    <div className="flex flex-col items-center">
      <label className="block text-white/80 mb-4 text-sm">
        Avatar <span className="text-[#d6b35a]">*</span>
      </label>

      <motion.div
        whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
        whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
        onClick={() => {
          if (!disabled && !loading) inputRef.current?.click();
        }}
        className={`relative w-32 h-32 rounded-full overflow-hidden cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        style={{
          background: displayImage
            ? "transparent"
            : "rgba(255, 255, 255, 0.05)",
          border: "2px solid rgba(214, 179, 90, 0.3)",
        }}
      >
        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-[#d6b35a]">
            <Loader2 className="animate-spin" size={28} />
          </div>
        ) : displayImage ? (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={displayImage}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/40">
            <UserIcon size={32} className="mb-2" />
            <UploadIcon size={16} />
          </div>
        )}

        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: displayImage
              ? "0 0 30px rgba(214, 179, 90, 0.4)"
              : "none",
          }}
        />
      </motion.div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
    </div>
  );
};

export default ImageUploader;
