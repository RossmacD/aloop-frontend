export const contextualColors = {
  brand: {
    50: '#e6f1fe',
    100: '#cce3fc',
    200: '#80baf9',
    300: '#66acf7',
    400: '#3391f5',
    450: '#1a83f3',
    500: '#0075f2',
    600: '#0069da',
    700: '#005ec2',
    800: '#004691',
    900: '#002f61',
    1000: '#001730',
  },
};
//["35853f","329a3e","b5b5b6","9b9b9b","ef476f","bb0a21","fde74c","e4572e"]

export const naturalColors = {
  grey: {
    0: '#FFFFFF', // white
    25: '#ededed', // old $app-density-message-initial-hover-focus
    50: '#FAF9F8', // light14
    100: '#dadbdc', // light10, old $app-density-message-background-replay-hover-focus
    150: '#c8c9ca', // light09, old $app-density-border-gray
    200: '#b5b7b9', // light08
    250: '#a3a5a7', // light06, dark02
    300: '#a3a5a7', // dark03
    350: '#909295', // light04
    400: '#7e8084', // dark04
    450: '#6b6e72', // light03, dark06, $app-gray-20-theme-agnostic, old $message-highlight-color-darktheme
    500: '#464a4f', // light02, dark08
    550: '#3f4347', // dark09
    600: '#383b3f', // dark10, in call audio only grid slot 4
    650: '#313437', // in call audio only grid slot 3
    700: '#2a2c2f', // dark14, in call audio only grid slot 2, old $app-density-message-background-initial-hover-focus-darktheme
    750: '#232528', // 900 - different [#252424] , old $app-black, in call audio only grid slot 1, old $app-density-message-background-replay-hover-focus-darktheme
    800: '#1c1e20', // app black darktheme, in call title bar, in call audio only pip
    850: '#151618', // in call background behind presented doc, old $app-density-message-border-darktheme
    900: '#0e0f10', // dark theme borders
    1000: '#000000', // black
  },
  orange: {
    50: '#F9ECEA', // darkOrange[50]
    100: '#EFDBD3', // app orange14
    200: '#EDC2A7', // old message highlight border
    300: '#E97548', // orange[900]
    400: '#CC4A31', // app orange04 darkOrange[400]
    500: '#BD432C', // app orange03
    600: '#A33D2A', // app orange02
    700: '#833122', // app orange01 darkOrange[900]
    800: '#664134', // app orange14 dark
    900: '#51332C', // app orange16 dark
  },
  pink: {
    50: '#FCF2FA', // app orchid opacity, oof message, oof banner bg
    100: '#F1DFEE', // new oof banner border default theme
    200: '#EC6FAE', // new oof text for better contrast in dark theme
    300: '#DE569A', // magenta dark theme
    400: '#E959D9', // oof presence icon dark theme
    500: '#B4009E', // merge oof presence icon, odl $app-magenta
    600: '#943670', // old $app-orchid, use for oof banner text
    // 700: undefined, //
    800: '#3E2D3B', // old @app orchid opacity, oof message bg, oof banner bg
    900: '#1F191D', // new oof banner border dark theme
  },
  red: {
    50: '#f7e9ed', // app red 10
    100: '#e6bdc8', // postOrange[900] app red 08
    200: '#dda7b5', // new, error banner string
    300: '#cd7b90', // merge old @app-red-dark-theme
    400: '#bc4f6b', // red[900], app red 06, siteVariables.red

    500: '#ab2346', // app red 04
    600: '#9a203f', // app red 02
    700: '#891c38', // old app red 10 dark
    800: '#781931', // new error banner bg
    900: '#561223', // app red08 dark
  },
  green: {
    200: '#beefcd', // lightGreen[900] old $app-green, available presence dark theme, siteVars.green
    300: '#a9eabc', // new Available presence
    400: '#93e5ab', // dual presence Available
    600: '#76b789', // old $app-green-04, siteVariables.green04, green[900]
    700: undefined,
    800: undefined,
    900: undefined,
  },
  yellow: {
    50: undefined,
    100: '#FBF6D9', // old message highlight color
    200: undefined,
    300: '#F9EC02', // old acc critical ufd icon color
    400: '#F8D22A', // old siteVariables.yellow, $app-yellow, yellow[900]
    500: '#FFB900', // old $bcast pre live color
    600: '#FFAA44', // new away presence
    700: undefined,
    800: undefined,
    900: undefined,
  },
};

const contextualAndNaturalColors = {
  ...contextualColors,
  ...naturalColors,
};

export const primitiveColors = {
  black: '#000',
  white: '#fff',
};

export const transparentColors = {
  silver: {
    // 100: undefined,
    200: 'rgba(255,255,255,0.75)',
    300: 'rgba(255,255,255,0.65)',
    400: 'rgba(255,255,255,0.5)',
    // 500: undefined,
    600: 'rgba(255,255,255,0.3)',
    700: 'rgba(255,255,255,0.2)',
    800: 'rgba(255,255,255,0.1)',
    900: 'rgba(255,255,255,0.05)',
  },
  ruby: {
    // 100: undefined,
    // 200: undefined,
    // 300: undefined,
    // 400: undefined,
    500: 'rgba(196,49,75,0.9)',
    600: 'rgba(167,32,55,0.9)',
    700: 'rgba(142,25,46,0.9)',
    // 800: undefined,
    // 900: undefined,
  },
  onyx: {
    100: 'rgba(59,58,57,0.9)',
    200: 'rgba(45,44,44,0.4)',
    300: 'rgba(37,36,35,0.2)',
    400: 'rgba(37,36,35,0.65)',
    500: 'rgba(41,40,40,0.9)',
    600: undefined,
    700: 'rgba(0,0,0,0.5)',
    800: 'rgba(27,26,26,0.9)',
    900: 'rgba(0,0,0,0.8)',
  },
  amethyst: {
    100: undefined,
    200: undefined,
    300: undefined,
    400: 'rgba(98,100,167,0.75)',
    500: 'rgba(51,52,74,0.5)',
    600: 'rgba(70,71,117,0.4)',
    700: 'rgba(98,100,167,0.15)',
    800: undefined,
    900: undefined,
  },
};

export const colors = {
  ...contextualAndNaturalColors,
  ...primitiveColors,
  ...transparentColors,
};

export const createColorScheme = (customValues = {}) => {
  return {
    foreground: undefined,
    background: undefined,
    border: undefined,
    shadow: undefined,

    foregroundHover: undefined,
    backgroundHover: undefined,
    borderHover: undefined,
    shadowHover: undefined,

    foregroundActive: undefined,
    backgroundActive: undefined,
    borderActive: undefined,
    shadowActive: undefined,

    foregroundFocus: undefined,
    backgroundFocus: undefined,
    borderFocus: undefined,
    shadowFocus: undefined,

    foregroundPressed: undefined,
    backgroundPressed: undefined,
    borderPressed: undefined,
    shadowPressed: undefined,

    foregroundDisabled: undefined,
    backgroundDisabled: undefined,
    borderDisabled: undefined,
    shadowDisabled: undefined,
    ...customValues,
  };
};
const defaultScheme = {
  foreground: colors.grey[750],
  foreground1: colors.grey[500],
  foreground2: colors.grey[450],
  foreground3: colors.white,
  foreground4: colors.white,
  foreground5: colors.grey[100],
  foreground6: colors.grey[200],

  background: colors.white,
  background1: colors.grey[50],
  background2: colors.grey[100],
  background3: colors.grey[150],
  background4: colors.grey[100],
  background5: colors.grey[350],

  border: colors.grey[200], // buttons
  border1: colors.grey[150],
  border2: colors.grey[200],
  border3: colors.grey[150], // divider

  shadow: colors.black, // opacity 10%
  shadowHover: colors.black, // opacity 10%

  foregroundHover: colors.grey[750],
  foregroundHover1: colors.white,
  foregroundHover2: colors.white,

  backgroundHover: colors.grey[100],
  backgroundHover1: colors.grey[150],
  backgroundHover2: 'transparent',
  backgroundHover3: colors.grey[150],
  backgroundHover4: colors.grey[50],

  borderHover: colors.grey[250], // buttons

  foregroundPressed: colors.grey[750],
  backgroundPressed: colors.grey[200],
  backgroundPressed3: colors.grey[150],
  borderPressed: colors.grey[250],

  foregroundActive: colors.grey[750],
  foregroundActive1: colors.white,

  backgroundActive: colors.grey[100],
  backgroundActive1: colors.grey[150],

  borderActive: colors.grey[200], // buttons
  borderActive1: colors.grey[150],
  borderActive2: colors.grey[200],
  borderActive3: colors.grey[150], // divider

  foregroundFocus: colors.grey[750],
  foregroundFocus1: colors.grey[500],
  foregroundFocus2: colors.grey[450],
  foregroundFocus3: colors.white,

  backgroundFocus: colors.white,
  backgroundFocus1: colors.grey[50],
  backgroundFocus2: colors.grey[100],
  backgroundFocus3: colors.grey[150],

  borderFocusWithin: colors.white,
  borderFocus: colors.black,

  foregroundDisabled1: colors.grey[250],
  foregroundDisabled: colors.grey[250],

  backgroundDisabled: colors.grey[150],
  backgroundDisabled1: colors.grey[150],
  backgroundDisabled2: colors.grey[50],
  backgroundDisabled3: colors.grey[50],

  borderDisabled: colors.grey[150],
};
export const colorScheme = {
  default: createColorScheme(defaultScheme),
  grey: createColorScheme(defaultScheme),
  brand: createColorScheme({
    foreground: colors.brand[600],
    foreground1: colors.brand[600],
    foreground2: colors.brand[700],
    foreground3: colors.brand[200],
    foreground4: colors.white,

    background: colors.brand[600],
    background1: colors.brand[100],
    background2: colors.brand[900],
    background3: colors.brand[1000],
    background4: colors.brand[800],

    border: colors.grey[200],
    border1: colors.brand[200],
    border2: colors.brand[300],

    shadow: colors.black, // opacity 25%
    shadowHover: colors.black,

    foregroundHover: colors.brand[600],
    foregroundHover1: colors.white,
    foregroundHover2: colors.brand[200],

    borderHover: colors.brand[300],

    backgroundHover: colors.brand[700],
    backgroundHover1: colors.brand[50],
    backgroundHover2: colors.brand[100],

    foregroundPressed: colors.brand[800],
    foregroundPressed1: colors.white,
    backgroundPressed: colors.brand[800], // it's 900 on the button - 800 is same as hover
    borderPressed: colors.brand[300],

    foregroundActive: colors.brand[600],
    foregroundActive1: colors.brand[600],
    foregroundActive2: colors.brand[200],

    backgroundActive: colors.brand[600],
    backgroundActive1: colors.brand[600],

    borderActive: colors.grey[200],
    borderActive1: colors.brand[200],
    borderActive2: colors.brand[300],

    foregroundFocus: colors.brand[600],
    foregroundFocus1: colors.brand[600],
    foregroundFocus2: colors.brand[700],
    foregroundFocus3: colors.brand[200],
    foregroundFocus4: colors.white,

    backgroundFocus: colors.brand[600],
    backgroundFocus1: colors.brand[100],
    backgroundFocus2: colors.brand[900],
    backgroundFocus3: colors.brand[1000],

    borderFocus: colors.black,
    borderFocusWithin: colors.white,
    borderFocus1: colors.brand[600], // only input

    foregroundDisabled: colors.grey[250],
    foregroundDisabled1: colors.grey[250],

    backgroundDisabled: colors.grey[150],
    backgroundDisabled1: colors.grey[150],

    borderDisabled: colors.grey[150],
  }),
  black: {
    foreground: colors.black,
    background: colors.white,
    border: colors.black,
    shadow: colors.black,

    foregroundHover: colors.white,
    backgroundHover: colors.black,
    borderHover: colors.black,
    shadowHover: colors.black,

    foregroundActive: colors.white,
    backgroundActive: colors.black,
    borderActive: colors.black,
    shadowActive: colors.black,

    foregroundFocus: colors.white,
    backgroundFocus: colors.black,
    borderFocus: colors.black,
    shadowFocus: colors.black,

    foregroundPressed: colors.white,
    backgroundPressed: colors.black,
    borderPressed: colors.black,
    shadowPressed: colors.black,

    foregroundDisabled: colors.white,
    backgroundDisabled: colors.black,
    borderDisabled: colors.black,
    shadowDisabled: colors.black,
  },
  white: {
    foreground: colors.white,
    background: colors.black,
    border: colors.white,
    shadow: colors.white,

    foregroundHover: colors.black,
    backgroundHover: colors.white,
    borderHover: colors.white,
    shadowHover: colors.white,

    foregroundActive: colors.black,
    backgroundActive: colors.white,
    borderActive: colors.white,
    shadowActive: colors.white,

    foregroundFocus: colors.black,
    backgroundFocus: colors.white,
    borderFocus: colors.white,
    shadowFocus: colors.white,

    foregroundPressed: colors.black,
    backgroundPressed: colors.white,
    borderPressed: colors.white,
    shadowPressed: colors.white,

    foregroundDisabled: colors.black,
    backgroundDisabled: colors.white,
    borderDisabled: colors.white,
    shadowDisabled: colors.white,
  },
  green: createColorScheme({
    foreground: colors.green[600],
    foreground1: colors.white,
    foreground2: colors.green[400],
    background: colors.green[300],
  }),
  orange: createColorScheme({
    foreground: colors.orange[400],
    foreground1: colors.orange[300],
    background: colors.orange[400],
    border: colors.orange[200],
  }),
  pink: createColorScheme({
    foreground: colors.pink[600],
    foreground1: colors.pink[500],
    background: colors.pink[50],
    border: colors.pink[100],
  }),
  red: createColorScheme({
    foreground: colors.red[400],
    foreground1: colors.white,
    foreground2: colors.white,
    background: colors.red[400],
    background1: colors.red[50],
    background2: colors.ruby[500],
    background3: colors.red[400],
    border: colors.red[100],

    foregroundHover: colors.white,
    backgroundHover: colors.ruby[600],
    backgroundHover1: colors.red[400],

    foregroundPressed: colors.white,
    backgroundPressed: colors.ruby[700],
  }),
  yellow: createColorScheme({
    foreground: colors.yellow[300],
    foreground1: colors.grey[800],
    foreground2: colors.white,
    background: colors.yellow[600],
    background1: colors.yellow[100],
    background2: colors.yellow[500],
  }),
  silver: createColorScheme({
    foreground: colors.white,
    foreground1: colors.silver[200],
    foregroundHover: colors.white,
    foregroundPressed: colors.white,
    border: colors.silver[600],
    background: 'transparent',
    backgroundHover: colors.silver[800],
    borderHover: colors.silver[600],
    backgroundPressed: colors.silver[700],
    borderPressed: colors.silver[600],
    foregroundDisabled: colors.silver[600],
    backgroundDisabled: colors.silver[900],
  }),
  onyx: createColorScheme({
    background: colors.onyx[500],
    background1: colors.onyx[100],
    background2: colors.onyx[500],
    border: colors.onyx[800],
    border1: 'transparent',
    border2: colors.onyx[300],
  }),
  amethyst: createColorScheme({
    background: colors.amethyst[600],
    backgroundHover: colors.amethyst[700],
    backgroundHover1: colors.amethyst[500],
    backgroundActive: colors.amethyst[700],
  }),
};
