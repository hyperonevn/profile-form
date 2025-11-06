import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [showButton, setShowButton] = useState(false);
  const [lang, setLang] = useState<"vi" | "en">("vi");

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === "vi" ? "en" : "vi"));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-5 py-10 sm:px-6 md:px-8 bg-gradient-to-b from-[#0b0d12] to-[#111317]"
    >
      {/* 🌐 Nút chuyển ngữ */}
      <button
        onClick={toggleLang}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 px-3 py-1.5 rounded-full border border-[#d6b35a]/50 text-[#d6b35a] text-xs sm:text-sm font-medium hover:bg-[#d6b35a]/10 transition-all duration-300"
      >
        {lang === "vi" ? "EN" : "VI"}
      </button>

      {/* Logo và tiêu đề */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-[90vw] sm:max-w-2xl"
      >
        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 bg-gradient-to-r from-white via-[#d6b35a] to-white bg-clip-text text-transparent"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          HYPER ME
        </h1>

        {/* Phụ đề */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg md:text-xl text-white/80 mb-4 leading-snug"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {lang === "vi"
            ? "Một không gian minh bạch cho danh tính số của bạn"
            : "A transparent space for your digital identity"}
        </motion.p>

        {/* Triết lý minh bạch */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-sm sm:text-base text-white/60 max-w-[85vw] sm:max-w-2xl leading-relaxed mb-5"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {lang === "vi" ? (
            <>
              Tại HYPER ONE, mọi dữ liệu cá nhân đều thuộc quyền sở hữu của chính
              bạn. Chúng tôi chỉ thu thập những thông tin tối thiểu cần thiết để
              tạo hồ sơ và không chia sẻ dữ liệu cho bất kỳ bên thứ ba nào nếu
              chưa có sự đồng ý rõ ràng.
              <br className="hidden sm:block" />
              Tất cả dữ liệu được xử lý và lưu trữ theo{" "}
              <strong>Nghị định 13/2023/NĐ-CP</strong> về bảo vệ dữ liệu cá nhân
              tại Việt Nam.
            </>
          ) : (
            <>
              At HYPER ONE, your personal data belongs entirely to you. We collect
              only the minimum information required to create your profile and
              never share it with any third party without your explicit consent.
              <br className="hidden sm:block" />
              All data is processed and stored in compliance with{" "}
              <strong>Decree 13/2023/NĐ-CP</strong> on personal data protection in
              Vietnam.
            </>
          )}
        </motion.p>

        {/* Phần pháp lý card visit */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-xs sm:text-sm md:text-base text-white/50 max-w-[90vw] sm:max-w-2xl leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {lang === "vi" ? (
            <>
              Vì đây là <strong>card visit công khai</strong>, thông tin bạn nhập
              có thể được truy cập từ Internet. Khi nhấn{" "}
              <strong>“BẮT ĐẦU NGAY”</strong>, bạn xác nhận rằng mình đã đọc, hiểu
              và đồng ý với{" "}
              <a
                href="https://privacy.hyperonevn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d6b35a] hover:underline"
              >
                Chính sách bảo mật
              </a>{" "}
              của HYPER ONE, bao gồm việc thu thập, lưu trữ và hiển thị thông tin
              cá nhân của bạn trong phạm vi bạn cho phép.
            </>
          ) : (
            <>
              As this is a <strong>public digital card</strong>, the information
              you provide may be accessible online. By clicking{" "}
              <strong>“GET STARTED”</strong>, you confirm that you have read,
              understood, and agreed to the{" "}
              <a
                href="https://privacy.hyperonevn.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d6b35a] hover:underline"
              >
                Privacy Policy
              </a>{" "}
              of HYPER ONE, including the collection, storage, and display of your
              personal data within your consented scope.
            </>
          )}
        </motion.p>

        {/* Cam kết quyền người dùng */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-[11px] sm:text-xs text-white/40 leading-relaxed mt-3 max-w-[85vw] mx-auto"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {lang === "vi"
            ? "Bạn có thể yêu cầu chỉnh sửa hoặc xóa dữ liệu bất kỳ lúc nào. HYPER ONE cam kết bảo mật, minh bạch và tôn trọng toàn quyền kiểm soát thông tin của bạn."
            : "You may request to modify or delete your data at any time. HYPER ONE is committed to transparency, security, and respecting your full control over your information."}
        </motion.p>
      </motion.div>

      {/* Đường ánh sáng vàng */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.9, duration: 1 }}
        className="w-48 sm:w-64 h-0.5 bg-gradient-to-r from-transparent via-[#d6b35a] to-transparent mt-10 sm:mt-12"
      />

      {/* ✨ Nút bắt đầu */}
      {showButton && (
        <motion.button
          onClick={onComplete}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="mt-8 sm:mt-10 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#d6b35a] to-[#e0c46e] text-black text-sm sm:text-base font-semibold shadow-[0_0_12px_rgba(214,179,90,0.4)] hover:shadow-[0_0_20px_rgba(214,179,90,0.6)] transition-all duration-300 active:scale-[0.97]"
          style={{
            fontFamily: "Inter, sans-serif",
            letterSpacing: 0.5,
          }}
        >
          {lang === "vi" ? "BẮT ĐẦU NGAY →" : "GET STARTED →"}
        </motion.button>
      )}
    </motion.div>
  );
};

export default IntroScreen;
