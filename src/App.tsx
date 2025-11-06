import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroScreen from "./components/IntroScreen";
import FormPanel from "./components/FormPanel";
import IphoneMockup from "./components/IphoneMockup";
import { Profile } from "./types/Profile";

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [profile, setProfile] = useState<Profile>({
    avatar: "",
    fullName: "",
    position: "",
    intro: "",
    companyRole: "",
    companyName: "",
    address: "",
    email: "",
    phone: "",
    location: "",
    subdomain: "",
    socialLinks: {
      facebook: "",
      linkedin: "",
      instagram: "",
      tiktok: "",
      youtube: "",
      zalo: "",
    },
    themeColor: "#d6b35a",
    font: "Inter",
    plan: "BASIC",
  });

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{
        background: "linear-gradient(135deg, #0b1220 0%, #101726 100%)",
      }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Cursor parallax light */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(77, 126, 255, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: cursorPosition.x - 192,
          y: cursorPosition.y - 192,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      />

      {/* Nội dung chính */}
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroScreen onComplete={() => setShowIntro(false)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full min-h-screen flex flex-col lg:flex-row pb-[80px]" // giảm padding-bottom
          >
            {/* Form Panel */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 overflow-y-auto">
              <FormPanel profile={profile} setProfile={setProfile} />
            </div>

            {/* Preview Panel */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex items-center justify-center sticky top-0 h-screen">
              <IphoneMockup profile={profile} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ Footer tinh tế & cố định cuối trang */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed bottom-0 left-0 right-0 z-40 py-2 text-center text-[11px] md:text-[12px] text-white/40 border-t border-white/10"
        style={{
          fontFamily: "Inter, sans-serif",
          background: "rgba(10,15,25,0.75)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p className="font-semibold text-[#d6b35a] tracking-wide">
          Powered by HYPER ONE
        </p>
        <p className="text-white/50 leading-tight">© 2025 HYPER ME</p>
        <p className="text-white/40 leading-tight">
          HYPER ONE CO., LTD · All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
}
