import React, { useState, Component } from 'react';
import { motion } from 'framer-motion';
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
  type = 'text',
  required = false,
  multiline = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const validate = (val: string) => {
    if (!required) return true;
    if (type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }
    return val.length > 0;
  };
  const handleBlur = () => {
    setIsFocused(false);
    if (value) {
      setIsValid(validate(value));
    }
  };
  const InputComponent = multiline ? 'textarea' : 'input';
  return <div className="relative">
      <label className="block text-white/80 mb-2 text-sm" style={{
      fontFamily: 'Inter, sans-serif'
    }}>
        {label} {required && <span className="text-[#d6b35a]">*</span>}
      </label>
      <motion.div animate={{
      boxShadow: isFocused ? '0 0 20px rgba(77, 126, 255, 0.3)' : isValid ? value ? '0 0 20px rgba(214, 179, 90, 0.2)' : 'none' : '0 0 20px rgba(255, 77, 77, 0.3)'
    }} className="relative">
        <InputComponent type={type} value={value} onChange={e => onChange(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={handleBlur} placeholder={placeholder} rows={multiline ? 4 : undefined} className="w-full px-4 py-3 rounded-lg text-white placeholder-white/30 transition-all duration-300 resize-none" style={{
        background: 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${isFocused ? '#4d7eff' : isValid ? value ? '#d6b35a' : 'rgba(255, 255, 255, 0.1)' : '#ff4d4d'}`,
        fontFamily: 'Inter, sans-serif',
        backdropFilter: 'blur(10px)'
      }} />
      </motion.div>
    </div>;
};
export default InputField;