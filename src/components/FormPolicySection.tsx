import React from "react";

interface FormPolicySectionProps {
  daDongY: boolean;
  setDaDongY: (value: boolean) => void;
  taoHoSo: () => void;
  dangGui: boolean;
  thongBao: string | null;
}

const FormPolicySection: React.FC<FormPolicySectionProps> = ({
  daDongY,
  setDaDongY,
  taoHoSo,
  dangGui,
  thongBao,
}) => {
  return (
    <>
      {/* ⚠️ Các phần cảnh báo, chính sách bảo mật, nút tạo hồ sơ giữ nguyên */}
      {/* ——— KHÔNG CHẠM TỚI NỘI DUNG GỐC ——— */}

      {/* 🟡 CẢNH BÁO KIỂM TRA THÔNG TIN */}
      <div className="bg-[#d6b35a]/10 border border-[#d6b35a]/40 rounded-md p-4 mt-2">
        <p className="text-sm text-[#e2c46f] leading-relaxed">
          ⚠️ <strong>Vui lòng kiểm tra thông tin thật cẩn thận.</strong> Vì lý do
          xác minh danh tính và phòng tránh các hoạt động lừa đảo, chức năng
          chỉnh sửa hồ sơ tạm thời sẽ bị khóa sau khi tạo. <br />
          Bạn có thể yêu cầu <strong>xóa hồ sơ</strong> và tạo mới bất cứ lúc nào.{" "}
          <br />
          Để được{" "}
          <strong style={{ color: "#3b82f6" }}>
            ✔ tích xanh bên cạnh tên (xác thực chống mạo danh)
          </strong>{" "}
          và{" "}
          <strong style={{ color: "#22c55e" }}>
            ✅ xác minh danh tính (Verified Profile)
          </strong>
          , vui lòng liên hệ{" "}
          <a
            href="mailto:info@hyperonevn.com"
            className="underline text-[#d6b35a] hover:text-[#f0d47a]"
          >
            info@hyperonevn.com
          </a>
          .
        </p>
        <p className="text-white/60 text-sm mt-2 leading-relaxed">
          ⚠️ <strong>Please review your details carefully.</strong> For security
          and identity verification, profile editing will be locked after
          creation. <br />
          You can request <strong>profile deletion</strong> and create a new one
          anytime. <br />
          For{" "}
          <strong style={{ color: "#3b82f6" }}>
            ✔ blue check verification
          </strong>{" "}
          and{" "}
          <strong style={{ color: "#22c55e" }}>
            ✅ identity confirmation (Verified Profile)
          </strong>
          , please contact{" "}
          <a
            href="mailto:info@hyperonevn.com"
            className="underline text-[#d6b35a] hover:text-[#f0d47a]"
          >
            info@hyperonevn.com
          </a>
          .
        </p>
      </div>

      {/* 🔴 CẢNH BÁO PHÁP LÝ */}
      <div className="bg-red-900/20 border border-red-500/40 rounded-md p-4 mt-2">
        <p className="text-sm text-red-300 leading-relaxed">
          🚨 <strong>Lưu ý quan trọng:</strong> Những hồ sơ có dấu hiệu mạo danh,
          giả mạo danh tính hoặc vi phạm pháp luật (bao gồm lừa đảo, phát tán
          nội dung trái phép, tổ chức đánh bạc hoặc các hành vi tương tự) sẽ bị
          <strong> xóa khỏi hệ thống mà không cần thông báo trước.</strong>
          <br />
          HYPER ONE có quyền lưu lại nhật ký truy cập để phối hợp với cơ quan
          chức năng khi được yêu cầu theo quy định pháp luật hiện hành.
          <br />
          Mọi hành vi vi phạm có thể bị xử lý theo quy định của Bộ luật Hình sự
          và các văn bản pháp luật liên quan.
          <br />
          Vui lòng xác minh danh tính để đảm bảo an toàn và minh bạch cho cộng
          đồng.
        </p>

        <p className="text-white/60 text-sm mt-2 leading-relaxed">
          🚨 <strong>Important notice:</strong> Profiles showing fraudulent or
          illegal activity (including scams, illegal content, or gambling) will
          be <strong>removed without prior notice.</strong> <br />
          HYPER ONE reserves the right to log user activity and cooperate with
          authorities as required by law. <br />
          Violations may result in criminal prosecution. Please verify your
          identity to keep the community safe and transparent.
        </p>

        <p className="text-xs text-red-400 mt-3 italic">
          Mọi thông tin tố giác tội phạm có liên quan xin gửi về: Cục An ninh
          mạng và phòng, chống tội phạm sử dụng công nghệ cao, Lô E2, Dương Đình
          Nghệ, Yên Hòa, Cầu Giấy, Hà Nội.
        </p>
        <p className="text-white/60 text-xs italic mt-1">
          Reports related to cybercrime should be sent to the Department of Cyber
          Security and High-Tech Crime Prevention, E2 Street, Yen Hoa, Cau Giay,
          Hanoi.
        </p>
      </div>

      {/* 🔘 CHECKBOX XÁC NHẬN */}
      <div className="flex items-start gap-3 pt-4">
        <input
          type="checkbox"
          checked={daDongY}
          onChange={(e) => setDaDongY(e.target.checked)}
          className="mt-1 accent-[#d6b35a]"
        />
        <div>
          <p className="text-sm text-white/80 leading-relaxed">
            Bằng việc nhấn “Tạo hồ sơ”, bạn xác nhận rằng mình đã đọc, hiểu và
            đồng ý với{" "}
            <a
              href="https://privacy.hyperonevn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d6b35a] underline hover:text-[#e2c46f]"
            >
              Chính sách bảo mật của HYPER ONE
            </a>
            , bao gồm việc thu thập, lưu trữ và hiển thị thông tin cá nhân của
            bạn trong hệ thống.
          </p>
          <p className="text-white/60 text-sm leading-relaxed mt-1">
            By clicking “Create Profile”, you confirm that you have read,
            understood, and agreed to the{" "}
            <a
              href="https://privacy.hyperonevn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d6b35a] underline hover:text-[#e2c46f]"
            >
              HYPER ONE Privacy Policy
            </a>
            , including the collection, storage, and display of your personal
            information.
          </p>
        </div>
      </div>

      {/* 🚀 NÚT TẠO HỒ SƠ */}
      <div className="pt-6">
        <button
          onClick={taoHoSo}
          disabled={dangGui || !daDongY}
          className={`w-full font-semibold py-3 rounded-md transition-all duration-300 ${
            !daDongY
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-[#d6b35a] hover:bg-[#e2c46f] text-black"
          }`}
        >
          {dangGui ? "Đang tạo hồ sơ..." : "🚀 Tạo hồ sơ ngay"}
        </button>
        <p className="text-white/60 text-sm mt-1 text-center">
          {dangGui ? "Creating your profile..." : "🚀 Create your profile now"}
        </p>

        {thongBao && (
          <>
            <p className="mt-3 text-center text-sm text-white/80">{thongBao}</p>
            <p className="text-white/60 text-xs text-center mt-1">
              Notification message
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default FormPolicySection;
