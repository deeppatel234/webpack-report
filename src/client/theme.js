// default font size for app
const HtmlFontSize = 16;
const FontFamily = 'Montserrat,sans-serif';

// html default font size calculation
const EM_PX_SIZE = 16;

// pixel to rem converter
const pxToRem = size => `${size / EM_PX_SIZE}rem`;

// font weight
const FontWeight = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  BOLD: 700,
};

const palette = {
  light: {
    white: '#ffffff',
    black: '#000000',
    dark: '#000000',
    light: '#ffffff',
    warning: '#faad14',
    error: '#DC3545',
    info: '#17a2b8',
    text: 'rgba(0,0,0,.85)',
    muted: '#6c757d',
    icon: '#555',
    background: '#fff',
    cardBackground: '#fff',
    cardBorderColor: 'rgba(0,0,0,0.12)',
    headerBackground: '#3d4977',
    hover: 'rgba(0,0,0,0.04)',
  },
  dark: {
    white: '#ffffff',
    black: '#000000',
    dark: '#ffffff',
    light: '#000000',
    warning: '#faad14',
    error: '#DC3545',
    info: '#17a2b8',
    text: '#fff',
    muted: '#ffffff',
    icon: '#ffffff',
    background: '#212121',
    cardBackground: '#333333',
    cardBorderColor: 'rgba(255, 255, 255, 0.12)',
    headerBackground: '#333333',
    hover: 'rgba(255,255,255,0.12)',
  },
};

const typography = {
  HtmlFontSize,
  FontFamily,
  h1: {
    fontSize: pxToRem(96),
    fontWeight: FontWeight.LIGHT,
  },
  h2: {
    fontSize: pxToRem(60),
    fontWeight: FontWeight.LIGHT,
  },
  h3: {
    fontSize: pxToRem(48),
    fontWeight: FontWeight.REGULAR,
  },
  h4: {
    fontSize: pxToRem(34),
    fontWeight: FontWeight.REGULAR,
  },
  h5: {
    fontSize: pxToRem(24),
    fontWeight: FontWeight.REGULAR,
  },
  h6: {
    fontSize: pxToRem(20),
    fontWeight: FontWeight.MEDIUM,
  },
  body: {
    fontSize: pxToRem(14),
    lineHeight: 1.5,
    fontWeight: FontWeight.REGULAR,
    fontFamily: FontFamily,
  },
  label: {
    fontSize: pxToRem(12),
    fontWeight: FontWeight.BOLD,
  },
  subText: {
    fontSize: pxToRem(12),
    fontWeight: FontWeight.REGULAR,
    lineHeight: 1,
  },
  helpText: {
    fontSize: pxToRem(10),
    fontWeight: FontWeight.REGULAR,
  },
};

const getRGBAColor = code => {
  return a => `rgba(${code}, ${code}, ${code}, ${a})`;
};

export const theme = {
  light: {
    typography,
    rgbaColor: getRGBAColor(0),
    palette: palette.light,
  },
  dark: {
    typography,
    rgbaColor: getRGBAColor(255),
    palette: palette.dark,
  },
};
