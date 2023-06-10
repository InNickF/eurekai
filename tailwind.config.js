const { Tokens } = require("./.mirrorful/theme_cjs.js");

const fontSizes = Object.entries(Tokens.fontSizes).reduce(
  (acc, [key, value]) => {
    const lineHeight = Tokens.lineHeights[key];
    acc[key] = lineHeight ? [value, { lineHeight }] : value;
    return acc;
  },
  {}
);

const convertColorObjToCSSVars = (colorObj) => {
  return Object.entries(colorObj).reduce((newColorObj, [key, value]) => {
    newColorObj[key] = Object.entries(value).reduce((subObj, [subKey]) => {
      subObj[subKey] = `var(--color-${key}-${subKey})`;
      return subObj;
    }, {});
    return newColorObj;
  }, {});
};

const colors = convertColorObjToCSSVars(Tokens.colors);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/index.html", "./src/renderer/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      ...colors,
    },
    fontFamily: {
      sans: [
        "paragraph",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
      ],
      serif: [
        "heading",
        "ui-serif",
        "Georgia",
        "Cambria",
        '"Times New Roman"',
        "Times",
        "serif",
      ],
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
    fontSize: fontSizes,
    fontWeight: {
      normal: "normal",
      bold: "bold",
    },
    lineHeight: Tokens.lineHeights,
    extend: {},
  },
  plugins: [],
};
