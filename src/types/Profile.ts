export interface Profile {
  avatar: string;
  fullName: string;
  position: string;
  intro: string;
  companyRole: string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
  location: string;
  subdomain: string;
  socialLinks: {
    facebook: string;
    linkedin: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    zalo: string;
  };
  themeColor: string;
  font: string;
  plan: 'BASIC' | 'VIP';
}
export interface ValidationState {
  [key: string]: boolean;
}