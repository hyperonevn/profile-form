import React from "react";
import { motion } from "framer-motion";
import { Profile } from "../types/Profile";

interface IphoneMockupProps {
  profile: Profile;
}

const IphoneMockup: React.FC<IphoneMockupProps> = ({ profile }) => {
  const socials = profile.socialLinks || {};
  const domain = profile.subdomain ? `${profile.subdomain}.profile.io.vn` : "";

  const placeholder = {
    fullName: "Tên của bạn / Your name",
    position: "Chức danh / Role",
    intro: "Giới thiệu ngắn / Short intro",
    companyRole: "Vị trí tại công ty / Position",
    companyName: "Tên công ty / Company name",
    address: "Địa chỉ / Address",
    email: "email@congty.vn",
    phone: "+84 900 000 000",
    location: "Khu vực sinh sống / Location",
  };

  return (
    <motion.div
      className="relative w-[285px] h-[720px] rounded-[42px] overflow-hidden shadow-xl border border-[#4a5d9a]/30 bg-[#0b1220] scale-[0.9] sm:scale-100"
      style={{
        background: "radial-gradient(circle at 40% 20%, #1b2148, #090c18 80%)",
        color: "#f0f4ff",
        fontFamily: "Inter, sans-serif",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-b-2xl z-10" />

      {/* Header gradient */}
      <motion.div
        className="w-full h-[95px]"
        style={{
          background: "linear-gradient(120deg, #4256da, #28389b, #121a36)",
          backgroundSize: "300% 300%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="flex flex-col items-center px-4 -mt-8 pb-8 text-center">
        {/* Avatar */}
        <motion.div
          className="w-[90px] h-[90px] rounded-full border-2 border-[#9eb6ff70] shadow-[0_0_15px_rgba(130,180,255,0.25)] flex items-center justify-center text-[#8da3ff] text-xs italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.fullName}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            "Ảnh đại diện / Avatar"
          )}
        </motion.div>

        {/* Full name */}
        <h1 className="mt-3 text-[15px] font-bold text-[#f8faff] flex items-center justify-center gap-2">
          {profile.fullName || placeholder.fullName}
          <span
            className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, #67c8ff, #306cff 70%)",
              boxShadow: "0 0 6px rgba(100,170,255,0.6)",
            }}
          >
            <span className="text-white text-[10px] font-black">✓</span>
          </span>
        </h1>

        {/* Verified */}
        <p className="text-[#22c55e] text-[11px] font-semibold mt-1">
          ✅ Hồ sơ xác thực / Verified Profile
        </p>

        {/* Role */}
        <p className="text-[#a8b3cc] text-[11px] italic mt-1">
          {profile.position || placeholder.position}
        </p>

        {/* Intro */}
        <p className="text-[#cbd4ec] text-[11px] italic mt-2 leading-snug">
          “{profile.intro || placeholder.intro}”
        </p>

        {/* Company box */}
        <div
          className="w-full rounded-2xl mt-3 py-2 px-3"
          style={{
            background:
              "linear-gradient(145deg, rgba(30,35,55,0.9), rgba(15,20,30,0.95))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "inset 0 0 6px rgba(255,255,255,0.05)",
          }}
        >
          <p className="text-[11px] text-[#f5f6fa] font-semibold">
            {profile.companyRole || placeholder.companyRole}
          </p>
          <p className="text-[12px] font-bold text-[#89a8ff] mt-1 uppercase tracking-wide">
            {profile.companyName || placeholder.companyName}
          </p>
          <p className="text-[9px] text-[#9ba3c8] mt-1">
            {profile.address || placeholder.address}
          </p>
        </div>

        {/* QR */}
        <div className="mt-3 flex flex-col items-center">
          <div className="w-[70px] h-[70px] flex items-center justify-center rounded-xl border border-[#9eb6ff40] bg-white/5 p-1.5 text-[9px] text-[#9ca8c8]">
            {domain ? (
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://${domain}`}
                alt="QR"
                className="w-full h-full rounded-lg"
              />
            ) : (
              "QR xem hồ sơ / View Profile"
            )}
          </div>
          <p className="text-[9px] text-[#9ca8c8] mt-1">
            Quét để xem hồ sơ / Scan to view
          </p>
        </div>

        {/* Contact */}
        <div className="w-full flex flex-col items-center gap-1.5 mt-3">
          <ContactBox
            link={domain ? `https://${domain}` : undefined}
            label={domain || "tencuaban.profile.io.vn"}
            icon="🌐"
          />
          <ContactBox icon="✉️" label={profile.email || placeholder.email} />
          <ContactBox icon="📞" label={profile.phone || placeholder.phone} />
          <ContactBox icon="📍" label={profile.location || placeholder.location} />
        </div>

        {/* Socials */}
        <div className="flex justify-center gap-3 mt-3 opacity-80">
          <SocialIcon src="https://cdn-icons-png.flaticon.com/512/145/145802.png" />
          <SocialIcon src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" />
          <SocialIcon src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" />
          <SocialIcon src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" />
          <SocialIcon src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" />
          <SocialIcon src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" />
        </div>

        {/* Footer */}
        <footer className="mt-5 text-center text-[9px] text-[#a0a7b5] leading-relaxed">
          <p className="font-semibold text-[#7ca8ff]">Powered by HYPER ONE</p>
          <p className="text-[#c5d4ff]">© 2025 HYPER ME – Digital Identity</p>
          <p className="text-[#c5d4ff]">HYPER ONE CO., LTD</p>
        </footer>
      </div>
    </motion.div>
  );
};

const ContactBox: React.FC<{
  icon?: string;
  link?: string;
  label: string;
}> = ({ icon, link, label }) => (
  <div className="contact-item w-full py-1.5 text-[11px] rounded-lg border border-[#648cdc40] bg-gradient-to-r from-[#182340]/70 to-[#0f162d]/90 text-[#f5f6fa] truncate flex justify-center items-center gap-1">
    {icon && <span>{icon}</span>}
    {link ? (
      <a href={link} target="_blank" rel="noreferrer" className="text-[#a8c7ff]">
        {label}
      </a>
    ) : (
      <span>{label}</span>
    )}
  </div>
);

const SocialIcon: React.FC<{ src: string; href?: string }> = ({ src, href }) => (
  <a href={href || "#"} target="_blank" rel="noreferrer">
    <img
      src={src}
      className="w-[18px] opacity-80 hover:opacity-100 hover:scale-110 transition-transform"
    />
  </a>
);

export default IphoneMockup;
