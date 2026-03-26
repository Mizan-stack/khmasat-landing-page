import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6'

export const SOCIAL_LINKS = [
  {
    label: 'Facebook',
    icon: FaFacebookF,
    href: 'https://facebook.com',
    palette: {
      light: { icon: '#1877f2', glow: 'rgba(24, 119, 242, 0.16)' },
      dark: { icon: '#7fc7ff', glow: 'rgba(127, 199, 255, 0.28)', border: 'rgba(97, 170, 255, 0.42)' },
    },
  },
  {
    label: 'X',
    icon: FaXTwitter,
    href: 'https://x.com',
    palette: {
      light: { icon: '#111827', glow: 'rgba(17, 24, 39, 0.14)' },
      dark: { icon: '#eef5ff', glow: 'rgba(238, 245, 255, 0.22)', border: 'rgba(201, 216, 255, 0.34)' },
    },
  },
  {
    label: 'LinkedIn',
    icon: FaLinkedinIn,
    href: 'https://linkedin.com',
    palette: {
      light: { icon: '#0a66c2', glow: 'rgba(10, 102, 194, 0.16)' },
      dark: { icon: '#6db9ff', glow: 'rgba(109, 185, 255, 0.28)', border: 'rgba(98, 173, 255, 0.42)' },
    },
  },
  {
    label: 'YouTube',
    icon: FaYoutube,
    href: 'https://youtube.com',
    palette: {
      light: { icon: '#ff2d55', glow: 'rgba(255, 45, 85, 0.16)' },
      dark: { icon: '#ff889c', glow: 'rgba(255, 136, 156, 0.28)', border: 'rgba(255, 136, 156, 0.4)' },
    },
  },
  {
    label: 'Instagram',
    icon: FaInstagram,
    href: 'https://instagram.com',
    palette: {
      light: { icon: '#d62976', glow: 'rgba(214, 41, 118, 0.16)' },
      dark: { icon: '#ff9cd2', glow: 'rgba(255, 156, 210, 0.3)', border: 'rgba(255, 156, 210, 0.42)' },
    },
  },
]
