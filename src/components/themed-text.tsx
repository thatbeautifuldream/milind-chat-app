import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

import { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code' | 'resumeName' | 'resumeLabel' | 'resumeSection';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create<{
  [key in Exclude<ThemedTextProps['type'], undefined>]: TextStyle;
}>({
  small: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
  },
  smallBold: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
  },
  default: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 14,
    lineHeight: 25,
    fontWeight: '400',
  },
  title: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 48,
    fontWeight: '600',
    lineHeight: 52,
  },
  subtitle: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 32,
    lineHeight: 44,
    fontWeight: '600',
  },
  link: {
    fontFamily: 'FamiljenGrotesk-Regular',
    lineHeight: 25,
    fontSize: 14,
  },
  linkPrimary: {
    fontFamily: 'FamiljenGrotesk-Regular',
    lineHeight: 25,
    fontSize: 14,
    color: '#3c87f7',
  },
  code: {
    fontFamily: 'FiraCode-Regular',
    fontSize: 12,
    fontWeight: '500',
  },
  resumeName: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    textTransform: 'uppercase',
  },
  resumeLabel: {
    fontFamily: 'FamiljenGrotesk-Regular',
    fontSize: 14,
    lineHeight: 25,
    fontWeight: '400',
  },
  resumeSection: {
    fontFamily: 'FamiljenGrotesk-SemiBold',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    lineHeight: 20,
  },
});
