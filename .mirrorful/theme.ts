
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | Shadows

  export const Tokens = {
  colors: {
    gray: {
      '50': '#c3c3c3',
      '100': '#b4b4b4',
      '200': '#a5a5a5',
      '300': '#969696',
      '400': '#868686',
      '500': '#777777',
      '600': '#686868',
      '700': '#585858',
      '800': '#494949',
      '900': '#3a3a3a',
      base: '#777777',
    },
    black: {
      base: '#000000',
    },
    white: {
      base: '#ffffff',
    },
    ghost: {
      '1': '#E5DACF',
      '2': '#CCBDAD',
      '3': '#B4A08C',
      '4': '#8F8172',
      '5': '#726355',
      contrast: '#ffffff',
      base: '#F2E6DA',
    },
    success: {
      base: '#37de7d',
      light: '#a6ffcc',
      dark: '#36b36c',
      darker: '#1f6630',
      'darker-foreground': '#ffffff',
      foreground: '#1f6630',
      'light-foreground': '#1F6630',
      'dark-foreground': '#ffffff',
    },
    warning: {
      base: '#ffdd33',
      light: '#fff0a6',
      dark: '#ccb129',
      darker: '#806f19',
      'darker-foreground': '#ffffff',
      foreground: '#806f19',
      'light-foreground': '#806F19',
      'dark-foreground': '#ffffff',
    },
    error: {
      base: '#ff3333',
      light: '#ffb3b3',
      dark: '#cc2929',
      darker: '#661414',
      'darker-foreground': '#ffffff',
      foreground: '#ffffff',
      'dark-foreground': '#ffffff',
      'light-foreground': '#661414',
    },
    primary: {
      base: '#FC576D',
      light: '#FFB4BE',
      dark: '#ad3d4c',
      darker: '#541D25',
      'darker-foreground': '#ffffff',
      'light-foreground': '#541D25',
      'dark-foreground': '#ffffff',
      foreground: '#1F252A',
    },
    secondary: {
      'darker-foreground': '#ffffff',
      foreground: '#ffffff',
      base: '#3D3453',
      light: '#655A80',
      dark: '#2D263D',
      darker: '#130A27',
      'dark-foreground': '#ffffff',
      'light-foreground': '#ffffff',
    },
    text: {
      base: '#1F252A',
      link: '#FC576D',
      'link-visited': '#ad3d4c',
      secondary: '#8e8494',
    },
  },
  fontSizes: {
    'r-xs': '14px',
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    display: '4rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    'display-sm': '3rem',
    'display-xl': '5rem',
    'r-base': '16px',
    'r-lg': '16px',
  },
  fontWeights: {
    normal: '400',
    bold: '800',
  },
  lineHeights: {
    'r-xs': '16px',
    xs: '1rem',
    sm: '1.25rem',
    base: '1.5rem',
    'r-base': '18px',
    'r-lg': '18px',
    '2xl': '2rem',
    '3xl': '2.5rem',
    '4xl': '3rem',
    '5xl': '4rem',
    'display-sm': '4rem',
    '6xl': '5rem',
    display: '5rem',
    '7xl': '6rem',
    '8xl': '8rem',
    xl: '1.5rem',
    lg: '1.5rem',
    'display-xl': '6rem',
  },
  boxShadows: {
    'r-xs': '14px',
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    display: '4rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    'display-sm': '3rem',
    'display-xl': '5rem',
    'r-base': '16px',
    'r-lg': '16px',
  },
}
  