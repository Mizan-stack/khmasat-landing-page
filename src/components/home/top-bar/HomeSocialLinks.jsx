import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from './socialLinks'

const MotionAnchor = motion.a

const LIGHT_SOCIAL_RAIL_STYLE = {
  background: 'rgba(255, 255, 255, 0.85)',
  borderColor: 'rgba(136, 156, 188, 0.38)',
  boxShadow: '0 18px 42px rgba(19, 29, 55, 0.14)',
}

const DARK_SOCIAL_RAIL_STYLE = {
  background: 'linear-gradient(180deg, rgba(10, 23, 48, 0.96) 0%, rgba(14, 30, 59, 0.92) 100%)',
  borderColor: 'rgba(96, 140, 211, 0.42)',
  boxShadow: '0 26px 48px rgba(2, 8, 21, 0.42), inset 0 1px 0 rgba(171, 211, 255, 0.08)',
}

const LIGHT_SOCIAL_BUTTON_STYLE = {
  background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.96), rgba(234, 239, 247, 0.88))',
  borderColor: 'rgba(136, 156, 188, 0.38)',
}

const DARK_SOCIAL_BUTTON_STYLE = {
  background: 'linear-gradient(145deg, rgba(20, 39, 76, 0.98), rgba(10, 22, 48, 0.96))',
}

function getSocialButtonStyle(item, isDark) {
  const tone = isDark ? item.palette.dark : item.palette.light

  return {
    color: tone.icon,
    background: isDark ? DARK_SOCIAL_BUTTON_STYLE.background : LIGHT_SOCIAL_BUTTON_STYLE.background,
    borderColor: isDark ? tone.border : LIGHT_SOCIAL_BUTTON_STYLE.borderColor,
    boxShadow: isDark
      ? `0 14px 28px rgba(3, 10, 24, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 0 1px ${tone.glow}`
      : `0 10px 22px ${tone.glow}`,
  }
}

function getSocialHoverShadow(item, isDark) {
  const tone = isDark ? item.palette.dark : item.palette.light
  return isDark
    ? `0 18px 34px rgba(3, 10, 24, 0.42), 0 0 0 1px ${tone.border}, 0 0 22px ${tone.glow}`
    : `0 16px 28px ${tone.glow}`
}

function HomeSocialLinks({ desktop = false, isDark = false, mobileMenu = false }) {
  const containerClass = desktop
    ? 'flex flex-col items-center gap-3 rounded-r-[28px] border py-4 pl-4 pr-5 backdrop-blur-xl'
    : mobileMenu
      ? 'flex w-full flex-wrap items-center justify-center gap-3 rounded-[24px] border px-4 py-3 backdrop-blur-xl'
      : 'flex w-fit flex-col items-center gap-3 rounded-[28px] border px-3 py-3 backdrop-blur-xl'

  return (
    <div
      dir="ltr"
      style={isDark ? DARK_SOCIAL_RAIL_STYLE : LIGHT_SOCIAL_RAIL_STYLE}
      className={containerClass}
    >
      {SOCIAL_LINKS.map((item, index) => (
        <MotionAnchor
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.34, delay: 0.06 * index }}
          whileHover={{ y: -4, scale: 1.06, boxShadow: getSocialHoverShadow(item, isDark) }}
          whileTap={{ scale: 0.92 }}
          style={getSocialButtonStyle(item, isDark)}
          className="group inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300"
          aria-label={item.label}
        >
          <item.icon className="text-base transition-transform duration-300 group-hover:scale-110" />
        </MotionAnchor>
      ))}
    </div>
  )
}

export default HomeSocialLinks
