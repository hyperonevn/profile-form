import React, { useState } from "react";
import { motion } from "framer-motion";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  multiline?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  multiline = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isLink, setIsLink] = useState(false);

  // ✅ Phát hiện người dùng chèn link (các ô như bio, giới thiệu, chức danh...)
  const detectLink = (val: string) => {
    const pattern =
      /(http|https|www\.|\.com|\.vn|\.net|\.org|\.io|\.co|facebook\.com|instagram\.com|linkedin\.com|zalo\.me|youtube\.com)/i;
    return pattern.test(val);
  };

  const validate = (val: string) => {
    // Kiểm tra link
    if (detectLink(val)) {
      setIsLink(true);
      return false;
    } else {
      setIsLink(false);
    }

    // Kiểm tra bắt buộc
    if (!required) return true;

    if (type === "email") {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    return val.length > 0;
  };

  const handleChange = (val: string) => {
    onChange(val);
    setIsValid(validate(val));
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsValid(validate(value));
  };

  const InputComponent = multiline ? "textarea" : "input";

  // 🎨 Màu viền động theo trạng thái
  const borderColor = !isValid
    ? "#ff4d4d"
    : isFocused
    ? "#4d7eff"
    : value
    ? "#d6b35a"
    : "rgba(255,255,255,0.1)";

  return (
    <div className="relative mb-4">
      <label
        className="block text-white/80 mb-2 text-sm"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {label} {required && <span className="text-[#d6b35a]">*</span>}
      </label>

      <motion.div
        animate={{
          boxShadow: isFocused
            ? "0 0 20px rgba(77,126,255,0.3)"
            : !isValid
            ? "0 0 20px rgba(255,77,77,0.3)"
            : value
            ? "0 0 20px rgba(214,179,90,0.2)"
            : "none",
        }}
        className="relative"
      >
        <InputComponent
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={multiline ? 4 : undefined}
          className="w-full px-4 py-3 rounded-lg text-white placeholder-white/30 transition-all duration-300 resize-none"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${borderColor}`,
            fontFamily: "Inter, sans-serif",
            backdropFilter: "blur(10px)",
            outline: "none",
          }}
        />
      </motion.div>

      {/* ⚠️ Cảnh báo khi chèn link */}
      {isLink && (
        <p className="text-red-400 text-xs mt-1">
          ⚠️ Vui lòng nhập đúng định dạng, không được chèn link vào nội dung.
        </p>
      )}

      {/* ⚠️ Cảnh báo trống / sai định dạng */}
      {!isLink && !isValid && required && (
        <p className="text-red-400 text-xs mt-1">
          ⚠️ Trường này là bắt buộc hoặc định dạng chưa hợp lệ.
        </p>
      )}
    </div>
  );
};

export default InputField;
