const ICON_ANIMATIONS = {
  boxes: {
    wrapper: { animate: { y: [0, -7, 0, 7, 0], rotate: [0, -8, 0, 8, 0] }, transition: { duration: 2.2 } },
    icon: { animate: { rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }, transition: { duration: 1.4 } },
    halo: { animate: { opacity: [0.18, 0.68, 0.22], scale: [1, 1.32, 1] }, transition: { duration: 1.8 } },
  },
  chart: {
    wrapper: { animate: { y: [0, -5, 0] }, transition: { duration: 1.45 } },
    icon: { animate: { scaleY: [1, 1.3, 0.82, 1], scaleX: [1, 0.92, 1.1, 1] }, transition: { duration: 1.2 } },
    halo: { animate: { opacity: [0.2, 0.72, 0.2], scale: [1, 1.3, 1] }, transition: { duration: 1.5 } },
  },
  shipping: {
    wrapper: { animate: { x: [0, 11, -8, 0], y: [0, -3, 0] }, transition: { duration: 1 } },
    icon: { animate: { rotate: [0, 8, -8, 0] }, transition: { duration: 1 } },
    halo: { animate: { opacity: [0.12, 0.62, 0.16], scale: [0.95, 1.34, 0.96] }, transition: { duration: 1.2 } },
  },
  payment: {
    wrapper: { animate: { rotate: [0, 10, -10, 0], scale: [1, 1.08, 1] }, transition: { duration: 1.6 } },
    icon: { animate: { rotate: [0, 14, 0, -14, 0] }, transition: { duration: 1.2 } },
    halo: { animate: { opacity: [0.18, 0.68, 0.18], scale: [1, 1.34, 1] }, transition: { duration: 1.6 } },
  },
  globe: {
    wrapper: { animate: { rotate: [0, 360] }, transition: { duration: 3 } },
    icon: { animate: { scale: [1, 1.12, 1], rotate: [0, -6, 0] }, transition: { duration: 1.5 } },
    halo: { animate: { opacity: [0.16, 0.64, 0.16], scale: [1, 1.36, 1] }, transition: { duration: 1.8 } },
  },
  paint: {
    wrapper: { animate: { rotate: [0, -24, 14, -12, 0], y: [0, -4, 0] }, transition: { duration: 1.5 } },
    icon: { animate: { scale: [1, 1.14, 1], rotate: [0, -8, 0] }, transition: { duration: 1.1 } },
    halo: { animate: { opacity: [0.14, 0.66, 0.18], scale: [1, 1.28, 1] }, transition: { duration: 1.4 } },
  },
  search: {
    wrapper: { animate: { scale: [1, 1.26, 1], rotate: [0, 18, 0] }, transition: { duration: 1.3 } },
    icon: { animate: { x: [0, -4, 4, 0], rotate: [0, 8, 0] }, transition: { duration: 1.1 } },
    halo: { animate: { opacity: [0.12, 0.75, 0.15], scale: [0.92, 1.36, 0.92] }, transition: { duration: 1.3 } },
  },
  mobile: {
    wrapper: { animate: { x: [0, -5, 5, -5, 5, 0], y: [0, -2, 0] }, transition: { duration: 0.95 } },
    icon: { animate: { rotate: [0, -9, 9, -9, 0] }, transition: { duration: 0.95 } },
    halo: { animate: { opacity: [0.1, 0.62, 0.12], scale: [1, 1.24, 1] }, transition: { duration: 1 } },
  },
  sms: {
    wrapper: { animate: { y: [0, -7, 0], rotate: [0, -8, 0, 8, 0] }, transition: { duration: 1.3 } },
    icon: { animate: { scale: [1, 1.22, 1], opacity: [1, 0.62, 1] }, transition: { duration: 1.3 } },
    halo: { animate: { opacity: [0.2, 0.88, 0.2], scale: [0.92, 1.4, 0.92] }, transition: { duration: 1.3 } },
  },
  crm: {
    wrapper: { animate: { rotate: [0, 18, 0, -18, 0], y: [0, -4, 0] }, transition: { duration: 1.6 } },
    icon: { animate: { scale: [1, 1.15, 1], rotate: [0, -10, 0, 10, 0] }, transition: { duration: 1.6 } },
    halo: { animate: { opacity: [0.16, 0.72, 0.18], scale: [1, 1.28, 1] }, transition: { duration: 1.5 } },
  },
  star: {
    wrapper: { animate: { rotate: [0, 26, 0, -26, 0], scale: [1, 1.15, 1] }, transition: { duration: 1.4 } },
    icon: { animate: { opacity: [1, 0.35, 1], scale: [1, 1.14, 1] }, transition: { duration: 0.95 } },
    halo: { animate: { opacity: [0.1, 0.92, 0.16], scale: [0.9, 1.44, 0.95] }, transition: { duration: 1.1 } },
  },
  tags: {
    wrapper: { animate: { rotate: [0, -24, 12, -10, 0], x: [0, 4, 0] }, transition: { duration: 1.4 } },
    icon: { animate: { scale: [1, 1.18, 1], rotate: [0, 11, 0] }, transition: { duration: 1.1 } },
    halo: { animate: { opacity: [0.12, 0.74, 0.14], scale: [1, 1.3, 1] }, transition: { duration: 1.3 } },
  },
}

export function getIconAnimation(type, index) {
  const preset = ICON_ANIMATIONS[type] ?? ICON_ANIMATIONS.boxes
  const delayOffset = (index % 4) * 0.12

  return {
    wrapper: {
      animate: preset.wrapper.animate,
      transition: {
        ...preset.wrapper.transition,
        delay: delayOffset,
        ease: preset.wrapper.transition.ease ?? 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
    icon: {
      animate: preset.icon.animate,
      transition: {
        ...preset.icon.transition,
        delay: delayOffset / 2,
        ease: preset.icon.transition.ease ?? 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
    halo: {
      animate: preset.halo.animate,
      transition: {
        ...preset.halo.transition,
        delay: delayOffset,
        ease: preset.halo.transition.ease ?? 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }
}
