import React from "react";
import { motion } from "framer-motion";

interface SuccessScreenProps {
  subdomain: string;
  socialsEmail: string;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  subdomain,
  socialsEmail,
}) => {
  const profileUrl = `https://${subdomain}.profile.io.vn`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed inset-0 flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-12 lg:gap-24 px-8 lg:px-20 bg-gradient-to-b from-[#0b0d12] to-[#1a1c24] text-white overflow-y-auto"
    >
      {/* Cột trái: Thông báo */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md"
      >
        {/* Emoji luôn hiển thị */}
        <div className="text-7xl mb-6">🎉</div>

        {/* Khối chữ — ẩn trên mobile */}
        <div className="hidden md:flex flex-col items-center lg:items-start text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Hồ sơ đã được tạo thành công!
          </h2>

          <p className="text-gray-300 mb-8 leading-relaxed">
            Chúc mừng bạn đã sở hữu hồ sơ cá nhân trên{" "}
            <span className="font-semibold text-purple-400">profile.io.vn</span>.
            <br />
            Email đăng ký:{" "}
            <span className="text-gray-100 font-medium">{socialsEmail}</span>
          </p>
        </div>

        {/* Nút luôn hiển thị */}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-3 rounded-full font-semibold text-white hover:opacity-90 transition text-sm sm:text-base"
        >
          Xem hồ sơ của bạn
        </a>

        {/* Footer — chỉ hiện trên desktop */}
        <footer className="hidden md:block mt-10 text-[11px] text-gray-500 text-center lg:text-left">
          <p>
            Powered by{" "}
            <span className="text-yellow-400 font-semibold">HYPER ONE</span>
          </p>
          <p>© 2025 HYPER ME · HYPER ONE CO., LTD</p>
        </footer>
      </motion.div>

      {/* Cột phải để trống — căn trái đẹp trên desktop */}
      <div className="hidden lg:block flex-1" />
    </motion.div>
  );
};
