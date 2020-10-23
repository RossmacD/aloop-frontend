import { createTheme, teamsTheme } from '@fluentui/react-northstar';
import { fontFaces } from './fontFaces';
import {
  colors,
  contextualColors,
  naturalColors,
  primitiveColors,
  colorScheme,
  transparentColors,
} from './colors';

teamsTheme.siteVariables = {
  ...teamsTheme.siteVariables,
  bodyFontFamily: '"Inter", system-ui, "Apple Color Emoji", "Segoe UI Emoji", sans-serif',
};

const customSiteVars = {
  ...teamsTheme.siteVariables,
  colors,
  contextualColors,
  naturalColors,
  primitiveColors,
  colorScheme,
  transparentColors,
};

export const gsaTheme = createTheme(
  {
    siteVariables: customSiteVars,
    componentVariables: teamsTheme.componentVariables,
    componentStyles: teamsTheme.componentStyles,
    fontFaces,
    staticStyles: teamsTheme.staticStyles,
    animations: teamsTheme.animations,
  },
  'gsa'
);

// const customColors = {
//   brand: {
//     '50': 'white',
//     '100': 'white',
//     '200': 'white',
//     '300': '#7BD14D',
//     '400': '#6FCD3C',
//     '500': '#65C332',
//     '600': '#5CB22E',
//     '700': '#54A22A',
//     '800': 'black',
//     '900': 'black',
//   },
//   green: {
//     '50': 'white',
//     '100': 'white',
//     '200': 'white',
//     '300': '#7BD14',
//     '400': '#6FCD3',
//     '500': '#65C33',
//     '600': '#5CB22',
//     '700': '#54A22',
//     '800': 'black',
//     '900': 'black',
//   },
//   grey: {
//     '50': '#F5F5F5',
//     '100': '#E0E0E1',
//     '200': '#CBCBCD',
//     '300': '#B5B5B6',
//     '400': '#A2A2A4',
//     '500': '#8E8E90',
//     '600': '#79797C',
//     '700': '#566567',
//     '800': '#515152',
//     '900': '#3D3D3E',
//   },
// };

//D972FF
//FFB2E6 493548 4B4E6D
