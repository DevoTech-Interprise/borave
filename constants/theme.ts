/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Tema Claro
const lightPrimary = '#7F0CCB'; // Roxo primário
const lightPrimaryLight = '#9B30FF'; // Roxo mais claro para destaque
const lightSecondary = '#FFFFFF'; // Branco
const lightBackground = '#7F0CCB'; // Cinza muito claro
const lightText = '#fff'; // Cinza escuro
const lightSurface = '#ffffffff'; // Branco

// Tema Escuro
const darkPrimary = '#7F0CCB'; // Roxo claro
const darkPrimaryLight = '#AB47BC'; // Roxo mais vibrante
const darkSecondary = '#FFFFFF'; // Branco
const darkBackground = '#7F0CCB'; // Preto
const darkText = '#E0E0E0'; // Cinza claro
const darkSurface = '#2D2D2D'; // Cinza escuro

// Cores adicionais para ambos os temas
const colorSuccess = '#4CAF50'; // Verde
const colorWarning = '#FF9800'; // Laranja
const colorError = '#F44336'; // Vermelho
const colorInfo = '#2196F3'; // Azul

export const Colors = {
  light: {
    text: lightText,
    background: lightBackground,
    tint: lightPrimary,
    primary: lightPrimary,
    primaryLight: lightPrimaryLight,
    secondary: lightSecondary,
    surface: lightSurface,
    icon: '#999999',
    tabIconDefault: '#999999',
    tabIconSelected: lightPrimary,
    success: colorSuccess,
    warning: colorWarning,
    error: colorError,
    info: colorInfo,
  },
  dark: {
    text: darkText,
    background: darkBackground,
    tint: darkPrimary,
    primary: darkPrimary,
    primaryLight: darkPrimaryLight,
    secondary: darkSecondary,
    surface: darkSurface,
    icon: '#B0B0B0',
    tabIconDefault: '#B0B0B0',
    tabIconSelected: darkPrimary,
    success: colorSuccess,
    warning: colorWarning,
    error: colorError,
    info: colorInfo,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
