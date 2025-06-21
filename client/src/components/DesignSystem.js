// أنظمة الألوان والطباعه
export { colors } from '../design-system/colors'
export { typography, fonts } from '../design-system/typography'

// أنظمة الظلال
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  inner: 'shadow-inner',
  none: 'shadow-none',
  glow: 'shadow-[0_0_15px_rgba(79,70,229,0.3)]',
  deep: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]',
}

// أنظمة الحركة والانتقالات
export const transitions = {
  default: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  bounce: 'transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)',
}
