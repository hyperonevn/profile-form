import React, { useState } from "react";
import { motion } from "framer-motion";
import InputField from "./InputField";
import ImageUploader from "./ImageUploader";
import DomainChecker from "./DomainChecker";
import SocialLinks from "./SocialLinks";
import { SuccessScreen } from "./SuccessScreen";
import { Profile } from "../types/Profile";
import FormPolicySection from "./FormPolicySection"; // ✅ import phần chính sách riêng

const FormPanel: React.FC<{
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}> = ({ profile, setProfile }) => {
  const [dangGui, setDangGui] = useState(false);
  const [thongBao, setThongBao] = useState<string | null>(null);
  const [emailTonTai, setEmailTonTai] = useState<boolean | null>(null);
  const [daDongY, setDaDongY] = useState(false);
  const [successData, setSuccessData] = useState<{
    subdomain: string;
    socialsEmail: string;
  } | null>(null);
  const [subdomainTonTai, setSubdomainTonTai] = useState<boolean>(false);

  const updateProfile = (field: keyof Profile, value: any) =>
    setProfile((prev) => ({ ...prev, [field]: value }));

  // 🔍 Kiểm tra email tồn tại
  const kiemTraEmail = async (email: string) => {
    if (!email || !email.includes("@")) return;
    try {
      const res = await fetch(
        "https://profile-create.hyperonevn.workers.dev/api/profile/check-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      setEmailTonTai(data.exists);
    } catch {
      setEmailTonTai(null);
    }
  };

  // 🚀 Gửi dữ liệu tạo hồ sơ
  const taoHoSo = async () => {
    if (!daDongY) {
      setThongBao(
        "⚠️ Vui lòng xác nhận rằng bạn đã đọc và đồng ý với Chính sách bảo mật."
      );
      return;
    }

    if (subdomainTonTai) {
      setThongBao("⚠️ Subdomain này đã tồn tại, vui lòng chọn tên khác.");
      return;
    }

    if (emailTonTai) {
      setThongBao("⚠️ Email này đã tồn tại, vui lòng dùng email khác.");
      return;
    }

    setDangGui(true);
    setThongBao(null);

    try {
      const res = await fetch(
        "https://profile-create.hyperonevn.workers.dev/api/profile/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        }
      );
      const data = await res.json();
      if (data.success) {
        setSuccessData({
          subdomain: profile.subdomain,
          socialsEmail: profile.email,
        });
      } else {
        setThongBao("⚠️ Không thể tạo hồ sơ. Vui lòng kiểm tra lại thông tin.");
      }
    } catch {
      setThongBao("❌ Lỗi kết nối máy chủ. Vui lòng thử lại sau.");
    } finally {
      setDangGui(false);
    }
  };

  // ✅ Nếu đã tạo thành công → hiển thị SuccessScreen thay form
  if (successData) {
    return (
      <SuccessScreen
        subdomain={successData.subdomain}
        socialsEmail={successData.socialsEmail}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-white">
      {/* 🧱 Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-4xl font-bold mb-2">Tạo Hồ Sơ Cá Nhân</h2>
        <p className="text-white/60 text-sm mb-6">Create Your Personal Profile</p>
        <p className="text-white/70 mb-12 text-sm tracking-wide">
          HYPER ME – profile.io.vn
        </p>
      </motion.div>

      <div className="space-y-8">
        {/* 🟡 Domain cá nhân */}
        <DomainChecker
          value={profile.subdomain}
          onChange={(v) => updateProfile("subdomain", v)}
          onCheck={(exists) => setSubdomainTonTai(exists)} // ✅ callback đúng: true nếu domain đã tồn tại
        />
        {profile.subdomain && (
          <>
            <p className="text-xs text-gray-400 -mt-4 mb-1">
              🌐 Hồ sơ của bạn sẽ là:
            </p>
            <p className="text-xs text-[#d6b35a] font-medium mb-3">
              https://{profile.subdomain}.profile.io.vn
            </p>
          </>
        )}

        {/* 🖼 Ảnh đại diện */}
        <ImageUploader
          value={profile.avatar}
          onChange={(url) => updateProfile("avatar", url)}
          subdomain={profile.subdomain}
          disabled={!profile.subdomain || subdomainTonTai}
        />
        <p className="text-white/60 text-xs mt-2 leading-relaxed">
          📸 <strong>Ảnh đang được tải lên, vui lòng kiên nhẫn đợi ảnh hiển thị rồi hãy nhấn “Tạo Hồ Sơ”.</strong>
          <br />
          <span className="text-white/40 italic">
            * Your image is uploading — please wait until it appears before pressing “Create Profile”.
          </span>
        </p>

        {/* 👤 Thông tin cá nhân */}
        <div className="space-y-4 mt-4">
          <InputField
            label="Họ và tên"
            value={profile.fullName}
            onChange={(v) => updateProfile("fullName", v)}
            placeholder="Lữ Minh Trí"
            required
          />
          <p className="text-white/60 text-xs">Full name</p>

          <InputField
            label="Chức danh / Vai trò / Danh xưng"
            value={profile.position}
            onChange={(v) => updateProfile("position", v)}
            placeholder="Founder, Speaker, Nhà sáng lập, Nhà sáng tạo nội dung..."
            required
          />
          <p className="text-white/60 text-xs">
            Title / Role / Designation – bạn có thể dùng danh xưng cá nhân, nghệ danh, hoặc phong cách riêng (không nhất thiết thuộc công ty).<br />
            <span className="text-white/40 italic">
              You may use personal titles or creative designations (not limited to company roles).
            </span>
          </p>

          <InputField
            label="Giới thiệu ngắn"
            value={profile.intro}
            onChange={(v) => updateProfile("intro", v)}
            placeholder="Nhà sáng lập HYPER ONE – hệ sinh thái AI dành cho doanh nhân Việt Nam."
            multiline
            required
          />
          <p className="text-white/60 text-xs">Short introduction</p>
        </div>

        {/* 🏢 Thông tin tổ chức */}
        <div className="space-y-4">
          <InputField
            label="Tổ chức / Công ty / Trường học"
            value={profile.companyName}
            onChange={(v) => updateProfile("companyName", v)}
            placeholder="HYPER ONE COMPANY LIMITED"
          />
          <p className="text-white/60 text-xs">
            Organization / Company / School
          </p>

          <InputField
            label="Vai trò trong tổ chức / Công ty / Trường học"
            value={profile.companyRole}
            onChange={(v) => updateProfile("companyRole", v)}
            placeholder="Giám đốc điều hành / Executive Officer"
          />
          <p className="text-white/60 text-xs">Role within organization</p>

          <InputField
            label="Địa chỉ / Khu vực"
            value={profile.address}
            onChange={(v) => updateProfile("address", v)}
            placeholder="68 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh, Việt Nam"
          />
          <p className="text-white/60 text-xs">Address / Region</p>
        </div>

        {/* 📞 Liên hệ */}
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 mb-1 text-sm">Email</label>
            <p className="text-white/60 text-xs mb-2">Email address</p>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => {
                const val = e.target.value.trim();
                updateProfile("email", val);
                kiemTraEmail(val);
              }}
              placeholder="contact@hyperonevn.com"
              className={`w-full py-3 px-4 rounded-md bg-white/5 text-white placeholder-white/40 
                focus:outline-none transition-all duration-300 border ${
                  emailTonTai === null
                    ? "border-white/20"
                    : emailTonTai
                    ? "border-red-400"
                    : "border-[#d6b35a]"
                }`}
            />
            {emailTonTai === true && (
              <p className="text-xs text-red-400 mt-1">
                ⚠️ Email này đã tồn tại trong hệ thống.
              </p>
            )}
            {emailTonTai === false && (
              <p className="text-xs text-[#d6b35a] mt-1">
                ✅ Email này có thể sử dụng.
              </p>
            )}
          </div>

          <InputField
            label="Số điện thoại"
            value={profile.phone}
            onChange={(v) => updateProfile("phone", v)}
            placeholder="+84 352 608 068"
            type="tel"
          />
          <p className="text-white/60 text-xs">Phone number</p>

          <InputField
            label="Khu vực sinh sống"
            value={profile.location}
            onChange={(v) => updateProfile("location", v)}
            placeholder="TP. Hồ Chí Minh / Tokyo / Singapore"
          />
          <p className="text-white/60 text-xs">Living area</p>
        </div>

        {/* 🔗 Liên kết mạng xã hội */}
        <SocialLinks
          links={profile.socialLinks}
          onChange={(links) => updateProfile("socialLinks", links)}
        />
        <p className="text-white/60 text-xs">Your social media links</p>

        {/* 🎨 Tông màu */}
        <div className="space-y-4">
          <label className="block text-white/80 mb-2 text-sm">
            Chọn tông màu của hồ sơ
          </label>
          <p className="text-white/60 text-xs mb-2">Choose profile theme</p>
          <div className="flex gap-4">
            {["LIGHT", "DARK"].map((tone) => (
              <button
                key={tone}
                onClick={() => updateProfile("plan", tone)}
                className={`flex-1 py-3 px-6 rounded-lg transition-all duration-300 ${
                  profile.plan === tone
                    ? "border-[#d6b35a] text-[#d6b35a] bg-white/5"
                    : "border-white/20 text-white/80 bg-transparent"
                } border`}
              >
                {tone}
              </button>
            ))}
          </div>
        </div>

        {/* ⚠️ Chính sách & xác nhận */}
        <FormPolicySection
          daDongY={daDongY}
          setDaDongY={setDaDongY}
          taoHoSo={taoHoSo}
          dangGui={dangGui}
          thongBao={thongBao}
        />
      </div>
    </div>
  );
};

export default FormPanel;
