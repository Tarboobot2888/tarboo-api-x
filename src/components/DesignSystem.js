// أنظمة الألوان
export const colors = {
  primary: {
    light: '#4f46e5',
    dark: '#818cf8',
  },
  secondary: {
    light: '#10b981',
    dark: '#34d399',
  },
  background: {
    light: '#f9fafb',
    dark: '#111827',
  },
  text: {
    light: '#1f2937',
    dark: '#f3f4f6',
  },
  card: {
    light: '#ffffff',
    dark: '#1e293b',
  }
}

// أنظمة الطباعة
export const typography = {
  h1: 'text-4xl md:text-5xl font-bold leading-tight',
  h2: 'text-3xl md:text-4xl font-bold',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-medium',
  body: 'text-base leading-relaxed',
  caption: 'text-sm opacity-75',
}

// أنظمة الظلال
export const shadows = {
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
  inner: 'shadow-inner',
  none: 'shadow-none',
  glow: 'shadow-[0_0_15px_rgba(79,70,229,0.3)]',
}

// أنظمة الحركة والانتقالات
export const transitions = {
  default: 'transition-all duration-300 ease-in-out',
  fast: 'transition-all duration-150 ease-in-out',
  slow: 'transition-all duration-500 ease-in-out',
  bounce: 'transition-all duration-300 cubic-bezier(0.34, 1.56, 0.64, 1)',
}
