import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FacebookIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
} from "lucide-react";

interface SocialLinksProps {
  links: {
    facebook: string;
    linkedin: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    zalo: string;
  };
  onChange: (links: any) => void;
}

const socialPlatforms = [
  {
    key: "facebook",
    label: "Facebook",
    icon: FacebookIcon,
    prefix: "facebook.com/",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: LinkedinIcon,
    prefix: "linkedin.com/in/",
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: InstagramIcon,
    prefix: "instagram.com/",
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: null,
    prefix: "tiktok.com/@",
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: YoutubeIcon,
    prefix: "youtube.com/@",
  },
  {
    key: "zalo",
    label: "Zalo",
    icon: null,
    prefix: "zalo.me/",
  },
];

const SocialLinks: React.FC<SocialLinksProps> = ({ links, onChange }) => {
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const updateLink = (key: string, value: string) => {
    // ✅ Kiểm tra nếu người dùng nhập link (có http hoặc .com)
    const isInvalid =
      value.includes("http") ||
      value.includes(".com") ||
      value.includes(".vn") ||
      value.includes("www");

    setErrors((prev) => ({ ...prev, [key]: isInvalid }));

    onChange({
      ...links,
      [key]: value,
    });
  };

  return (
    <div>
      <label
        className="block text-white/80 mb-4 text-sm"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Social Links
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform, index) => {
          const Icon = platform.icon;
          const value = links[platform.key as keyof typeof links] || "";
          const isError = errors[platform.key];

          return (
            <motion.div
              key={platform.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-2 mb-2">
                {Icon && <Icon size={16} className="text-white/60" />}
                <span
                  className="text-white/60 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {platform.label}
                </span>
              </div>

              <div
                className={`flex items-center rounded-lg overflow-hidden border transition-all duration-300 ${
                  isError
                    ? "border-red-500 bg-red-500/10"
                    : "border-white/10 bg-white/5"
                }`}
                style={{ backdropFilter: "blur(10px)" }}
              >
                <span
                  className="px-3 text-white/40 text-sm"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {platform.prefix}
                </span>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateLink(platform.key, e.target.value)}
                  placeholder="username"
                  className="flex-1 py-2 px-2 bg-transparent text-white placeholder-white/30 text-sm"
                  style={{ fontFamily: "Inter, sans-serif", outline: "none" }}
                />
              </div>

              {isError && (
                <p className="text-red-400 text-xs mt-1">
                  ⚠️ Không được nhập link đầy đủ! Vui lòng chỉ nhập phần username (vd:
                  <span className="text-white/60"> luminhtri</span>).
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      <p className="text-xs text-white/50 mt-4 leading-relaxed">
        🔗 Chỉ nhập đuôi username, không được dùng link mạng xã hội trực tiếp. <br />
        <span className="text-white/40 italic">
          Example: instagram.com/<b>luminhtri</b> → nhập “luminhtri”.<br />
          Có thể để trống — nếu để trống, icon mạng xã hội sẽ không hiển thị. <br />
          ⚠️ Nếu nhập link (có “http” hoặc “.com”) → báo lỗi đỏ và không thể tạo hồ sơ.
          Hồ sơ nào dùng link sẽ bị cưỡng chế xóa.
        </span>
      </p>
    </div>
  );
};

export default SocialLinks;
