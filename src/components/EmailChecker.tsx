import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

interface EmailCheckerProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailChecker: React.FC<EmailCheckerProps> = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [message, setMessage] = useState("");

  // Gọi API check email khi user dừng gõ 0.8s
  useEffect(() => {
    if (!value || !value.includes("@")) {
      setIsValid(null);
      setMessage("");
      return;
    }

    const delay = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://profile-create.hyperonevn.workers.dev/api/profile/check-email",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: value }),
          }
        );

        const data = await res.json();

        if (data.exists) {
          setIsValid(false);
          setMessage("⚠️ Email này đã tồn tại trong hệ thống.");
        } else {
          setIsValid(true);
          setMessage("✅ Email này có thể sử dụng.");
        }
      } catch (err) {
        console.error("❌ Lỗi kiểm tra email:", err);
        setIsValid(null);
        setMessage("Không thể kiểm tra email. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(delay);
  }, [value]);

  return (
    <div>
      <label className="block text-white/80 mb-1 text-sm">Email</label>

      <div className="relative">
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value.trim())}
          placeholder="contact@nhatlinh.io.vn"
          className={`w-full py-3 px-4 rounded-md bg-white/5 text-white placeholder-white/40 focus:outline-none transition-all duration-300 border ${
            isValid === null
              ? "border-white/20"
              : isValid
              ? "border-[#d6b35a]"
              : "border-red-400"
          }`}
        />

        {loading && (
          <Loader2
            className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-spin text-[#d6b35a]"
            size={18}
          />
        )}

        {isValid === true && !loading && (
          <CheckCircle
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#d6b35a]"
            size={18}
          />
        )}

        {isValid === false && !loading && (
          <XCircle
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400"
            size={18}
          />
        )}
      </div>

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-xs mt-1 ${
            isValid === false ? "text-red-400" : "text-[#d6b35a]"
          }`}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default EmailChecker;
