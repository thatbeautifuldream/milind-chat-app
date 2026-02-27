import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#252525',
    background: '#ffffff',
    backgroundElement: '#F8F9FA',
    backgroundSelected: '#EBEBED',
    textSecondary: '#8E8E93',
    primary: '#252525',
    primaryForeground: '#ffffff',
    secondary: '#F8F9FA',
    secondaryForeground: '#252525',
    accent: '#F8F9FA',
    accentForeground: '#252525',
    destructive: '#E53935',
    border: '#EBEBED',
    input: '#EBEBED',
    ring: '#8E8E93',
    card: '#ffffff',
    cardForeground: '#252525',
    popover: '#ffffff',
    popoverForeground: '#252525',
  },
  dark: {
    text: '#ffffff',
    background: '#252525',
    backgroundElement: '#3A3A3C',
    backgroundSelected: '#48484A',
    textSecondary: '#98989D',
    primary: '#ffffff',
    primaryForeground: '#252525',
    secondary: '#3A3A3C',
    secondaryForeground: '#ffffff',
    accent: '#3A3A3C',
    accentForeground: '#ffffff',
    destructive: '#FF6B6B',
    border: '#48484A',
    input: '#3A3A3C',
    ring: '#98989D',
    card: '#252525',
    cardForeground: '#ffffff',
    popover: '#252525',
    popoverForeground: '#ffffff',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'FamiljenGrotesk-Regular',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'FiraCode-Regular',
  },
  default: {
    sans: 'FamiljenGrotesk-Regular',
    serif: 'serif',
    rounded: 'normal',
    mono: 'FiraCode-Regular',
  },
  web: {
    sans: 'FamiljenGrotesk-Regular, Familjen Grotesk, Spline Sans, Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    serif: 'Georgia, "Times New Roman", serif',
    rounded: '"SF Pro Rounded", "Hiragino Maru Gothic ProN", Meiryo, "MS PGothic", sans-serif',
    mono: 'FiraCode-Regular, Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
