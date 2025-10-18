// Design Tokens - Good Chop Theme

export const theme = {
  // Primary Colors (Blues/Teals from Good Chop)
  primary: {
    100: '#EBECEE',
    200: '#C1CDD1',
    300: '#8A9FA7',
    400: '#547380',
    500: '#1D666B',
    600: '#24452C',
    700: '#0C1B1A',
    800: '#0A2338',
  },

  // Secondary Colors (Warm tones)
  secondary: {
    100: '#F9ECE7',
    200: '#EECCBE',
    300: '#DD9B85',
    400: '#CAAF35',
    500: '#BD1702',
    600: '#972C02',
    700: '#712101',
    800: '#4C1601',
  },

  // Success Colors (Greens)
  success: {
    100: '#C8F5E7',
    200: '#70E5C3',
    300: '#0EC47B',
    400: '#2AA171',
    500: '#009546',
    600: '#007B36',
    700: '#0A5624',
    800: '#024610',
  },

  // Error Colors (Reds)
  error: {
    100: '#FFD0D2',
    200: '#FF9B9A',
    300: '#FF5F64',
    400: '#EB484B',
    500: '#DC1E1E',
    600: '#C11A1A',
    700: '#AA2116',
    800: '#881A12',
  },

  // Warning Colors (Oranges/Yellows)
  warning: {
    100: '#FFD8A7',
    200: '#FFBF77',
    300: '#FF9B19',
    400: '#FF8719',
    500: '#FF5E0A',
    600: '#CC5008',
    700: '#9B2100',
    800: '#7C2800',
  },

  // Information Colors (Blues)
  information: {
    100: '#B2F1FF',
    200: '#51B8FF',
    300: '#4CCBE2',
    400: '#3183B8',
    500: '#0090E3',
    600: '#1464FF',
    700: '#002AFF',
    800: '#002CC0',
  },

  // Neutral Colors (Grays)
  neutral: {
    100: '#FFFFFF',
    200: '#FCF8F7',
    300: '#E1D9D8',
    400: '#C7C6BF',
    500: '#95948F',
    600: '#697663',
    700: '#323130',
    800: '#202122',
  },

  // Semantic color mappings
  background: {
    primary: '#1a1a1a',
    secondary: '#2d2d2d',
    tertiary: '#3a3a3a',
    dark: '#1a1a1a',
    darkGradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
  },

  text: {
    primary: '#FFFFFF',
    secondary: '#C7C6BF',
    inverse: '#202122',
    muted: '#95948F',
  },

  border: {
    light: '#3a3a3a',
    medium: '#5a5a5a',
    dark: '#697663',
  },

  // Brand specific colors
  brand: {
    green: '#009546',
    teal: '#1D666B',
    orange: '#FF5E0A',
    yellow: '#CAAF35',
  },

  // Spacing scale (in pixels)
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
    xxxl: '64px',
  },

  // Border radius scale
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    full: '9999px',
  },

  // Typography scale
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Shadow scale
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    base: '0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.3)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.3)',
  },

  // Transitions
  transition: {
    fast: '0.15s ease-in-out',
    base: '0.3s ease-in-out',
    slow: '0.5s ease-in-out',
  },
}

export type Theme = typeof theme
