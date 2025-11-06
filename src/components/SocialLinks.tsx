import React from 'react';
import { motion } from 'framer-motion';
import { FacebookIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
interface SocialLinksProps {
  links: {
    facebook: string;
    linkedin: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    zalo: string;
  };
  onChange: (links: any) => void;
}
const socialPlatforms = [{
  key: 'facebook',
  label: 'Facebook',
  icon: FacebookIcon,
  prefix: 'facebook.com/'
}, {
  key: 'linkedin',
  label: 'LinkedIn',
  icon: LinkedinIcon,
  prefix: 'linkedin.com/in/'
}, {
  key: 'instagram',
  label: 'Instagram',
  icon: InstagramIcon,
  prefix: 'instagram.com/'
}, {
  key: 'tiktok',
  label: 'TikTok',
  icon: null,
  prefix: 'tiktok.com/@'
}, {
  key: 'youtube',
  label: 'YouTube',
  icon: YoutubeIcon,
  prefix: 'youtube.com/@'
}, {
  key: 'zalo',
  label: 'Zalo',
  icon: null,
  prefix: 'zalo.me/0123456789'
}];
const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  onChange
}) => {
  const updateLink = (key: string, value: string) => {
    onChange({
      ...links,
      [key]: value
    });
  };
  return <div>
      <label className="block text-white/80 mb-4 text-sm" style={{
      fontFamily: 'Inter, sans-serif'
    }}>
        Social Links
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map((platform, index) => {
        const Icon = platform.icon;
        return <motion.div key={platform.key} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="relative">
              <div className="flex items-center gap-2 mb-2">
                {Icon && <Icon size={16} className="text-white/60" />}
                <span className="text-white/60 text-sm" style={{
              fontFamily: 'Inter, sans-serif'
            }}>
                  {platform.label}
                </span>
              </div>
              <div className="flex items-center rounded-lg overflow-hidden" style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)'
          }}>
                <span className="px-3 text-white/40 text-sm" style={{
              fontFamily: 'Inter, sans-serif'
            }}>
                  {platform.prefix}
                </span>
                <input type="text" value={links[platform.key as keyof typeof links]} onChange={e => updateLink(platform.key, e.target.value)} placeholder="username" className="flex-1 py-2 px-2 bg-transparent text-white placeholder-white/30 text-sm" style={{
              fontFamily: 'Inter, sans-serif',
              outline: 'none'
            }} />
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
};
export default SocialLinks;