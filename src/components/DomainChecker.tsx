import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DomainCheckerProps {
  value: string;
  onChange: (value: string) => void;
  onCheck?: (exists: boolean) => void; // ✅ callback gửi kết quả ra FormPanel
}

const DomainChecker: React.FC<DomainCheckerProps> = ({
  value,
  onChange,
  onCheck,
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

  // 🔍 Realtime check subdomain qua API thật
  useEffect(() => {
    if (!value || value.length < 3) {
      setIsAvailable(null);
      onCheck?.(false); // ✅ reset callback
      return;
    }

    setIsChecking(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          "https://profile-create.hyperonevn.workers.dev/api/profile/check-subdomain",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subdomain: value }),
          }
        );
        const data = await res.json();

        const available = !data.exists;
        setIsAvailable(available);
        onCheck?.(!available); // ✅ nếu domain đã tồn tại => true (để block upload)
      } catch {
        setIsAvailable(null);
        onCheck?.(false);
      } finally {
        setIsChecking(false);
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [value]);

  // 🎨 Border theo trạng thái
  const borderStyle = isChecking
    ? "border-[#4d7eff]"
    : isAvailable === true
    ? "border-[#d6b35a]"
    : isAvailable === false
    ? "border-red-400"
    : "border-white/20";

  return (
    <div>
      {/* Dòng trạng thái kiểm tra */}
      <AnimatePresence>
        {(isChecking || isAvailable !== null) && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`text-xs mb-1 ${
              isChecking
                ? "text-[#4d7eff]"
                : isAvailable
                ? "text-[#d6b35a]"
                : "text-red-400"
            }`}
          >
            {isChecking
              ? "Đang kiểm tra..."
              : isAvailable
              ? "✅ Tên miền khả dụng."
              : "⚠️ Tên miền đã tồn tại."}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dòng demo link */}
      <div className="text-xs text-white/60 mb-2">
        https://
        <span className="text-[#d6b35a] font-semibold">
          {value || "yourname"}
        </span>
        .profile.io.vn
      </div>

      {/* Ô nhập subdomain */}
      <input
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        value={value}
        onChange={(e) => {
          const cleaned = e.target.value
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "");
          onChange(cleaned);
          setIsAvailable(null);
          onCheck?.(false); // ✅ reset khi user đang nhập
        }}
        placeholder="nhatlinh"
        className={`w-full py-3 px-4 rounded-md bg-white/5 text-white placeholder-white/40 
        focus:outline-none transition-all duration-300 border ${borderStyle}`}
      />
    </div>
  );
};

export default DomainChecker;
