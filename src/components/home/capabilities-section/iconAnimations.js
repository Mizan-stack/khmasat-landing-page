const ICON_ANIMATIONS = {
  boxes: {
    wrapper: { animate: { y: [0, -3, 0, 3, 0], rotate: [0, -3, 0, 3, 0] }, transition: { duration: 2.6 } },
    icon: { animate: { rotate: [0, 5, -5, 0] }, transition: { duration: 1.8 } },
    halo: { animate: { opacity: [0.18, 0.52, 0.2], scale: [1, 1.2, 1] }, transition: { duration: 2.4 } },
  },
  chart: {
    wrapper: { animate: { y: [0, -2, 0] }, transition: { duration: 1.8 } },
    icon: { animate: { scaleY: [1, 1.18, 0.88, 1], scaleX: [1, 0.95, 1.05, 1] }, transition: { duration: 1.4 } },
    halo: { animate: { opacity: [0.2, 0.6, 0.2], scale: [1, 1.16, 1] }, transition: { duration: 1.9 } },
  },
  shipping: {
    wrapper: { animate: { x: [0, 6, -4, 0], y: [0, -1, 0] }, transition: { duration: 1.15 } },
    icon: { animate: { rotate: [0, 3, -3, 0] }, transition: { duration: 1.15 } },
    halo: { animate: { opacity: [0.12, 0.5, 0.15], scale: [0.95, 1.22, 0.96] }, transition: { duration: 1.4 } },
  },
  payment: {
    wrapper: { animate: { rotateY: [0, 180, 360] }, transition: { duration: 3.2 } },
    icon: { animate: { rotate: [0, 8, 0] }, transition: { duration: 1.6 } },
    halo: { animate: { opacity: [0.18, 0.56, 0.18], scale: [1, 1.2, 1] }, transition: { duration: 2.1 } },
  },
  globe: {
    wrapper: { animate: { rotate: [0, 360] }, transition: { duration: 4.2 } },
    icon: { animate: { scale: [1, 1.08, 1] }, transition: { duration: 2 } },
    halo: { animate: { opacity: [0.16, 0.5, 0.16], scale: [1, 1.25, 1] }, transition: { duration: 2.6 } },
  },
  paint: {
    wrapper: { animate: { rotate: [0, -18, 10, -8, 0], y: [0, -2, 0] }, transition: { duration: 1.8 } },
    icon: { animate: { scale: [1, 1.08, 1] }, transition: { duration: 1.2 } },
    halo: { animate: { opacity: [0.14, 0.52, 0.18], scale: [1, 1.18, 1] }, transition: { duration: 1.9 } },
  },
  search: {
    wrapper: { animate: { scale: [1, 1.18, 1], rotate: [0, 12, 0] }, transition: { duration: 1.7 } },
    icon: { animate: { x: [0, -2, 2, 0] }, transition: { duration: 1.3 } },
    halo: { animate: { opacity: [0.12, 0.6, 0.15], scale: [0.92, 1.22, 0.92] }, transition: { duration: 1.7 } },
  },
  mobile: {
    wrapper: { animate: { x: [0, -2, 2, -2, 2, 0], y: [0, -1, 0] }, transition: { duration: 1.1 } },
    icon: { animate: { rotate: [0, -3, 3, -3, 0] }, transition: { duration: 1.1 } },
    halo: { animate: { opacity: [0.1, 0.55, 0.12], scale: [1, 1.14, 1] }, transition: { duration: 1.2 } },
  },
  sms: {
    wrapper: { animate: { y: [0, -4, 0], rotate: [0, -4, 0, 4, 0] }, transition: { duration: 1.6 } },
    icon: { animate: { scale: [1, 1.14, 1], opacity: [1, 0.72, 1] }, transition: { duration: 1.6 } },
    halo: { animate: { opacity: [0.2, 0.75, 0.2], scale: [0.92, 1.25, 0.92] }, transition: { duration: 1.6 } },
  },
  crm: {
    wrapper: { animate: { rotate: [0, 12, 0, -12, 0], y: [0, -2, 0] }, transition: { duration: 2.2 } },
    icon: { animate: { scale: [1, 1.08, 1], rotate: [0, -8, 0, 8, 0] }, transition: { duration: 2.2 } },
    halo: { animate: { opacity: [0.16, 0.6, 0.18], scale: [1, 1.18, 1] }, transition: { duration: 2.1 } },
  },
  star: {
    wrapper: { animate: { rotate: [0, 20, 0, -20, 0], scale: [1, 1.1, 1] }, transition: { duration: 1.8 } },
    icon: { animate: { opacity: [1, 0.45, 1] }, transition: { duration: 1.1 } },
    halo: { animate: { opacity: [0.1, 0.8, 0.16], scale: [0.9, 1.35, 0.95] }, transition: { duration: 1.4 } },
  },
  tags: {
    wrapper: { animate: { rotate: [0, -16, 8, -6, 0], x: [0, 2, 0] }, transition: { duration: 1.7 } },
    icon: { animate: { scale: [1, 1.1, 1], rotate: [0, 8, 0] }, transition: { duration: 1.4 } },
    halo: { animate: { opacity: [0.12, 0.62, 0.14], scale: [1, 1.2, 1] }, transition: { duration: 1.6 } },
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
      },
    },
    icon: {
      animate: preset.icon.animate,
      transition: {
        ...preset.icon.transition,
        delay: delayOffset / 2,
        ease: preset.icon.transition.ease ?? 'easeInOut',
        repeat: Infinity,
      },
    },
    halo: {
      animate: preset.halo.animate,
      transition: {
        ...preset.halo.transition,
        delay: delayOffset,
        ease: preset.halo.transition.ease ?? 'easeInOut',
        repeat: Infinity,
      },
    },
  }
}
