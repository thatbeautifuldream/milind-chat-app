import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href' | 'style'> & { href: Href & string; style?: any };

export function ExternalLink({ href, style, children, ...rest }: Props) {
  return (
    <Link
      href={href}
      style={[styles.link, style]}
      {...rest}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          event.preventDefault();
          await openBrowserAsync(href, {
            presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
          });
        }
      }}
    >
      {typeof children === 'string' ? (
        <Text style={styles.linkText}>{children}</Text>
      ) : (
        children
      )}
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#252525',
  },
  linkText: {
    fontFamily: 'FamiljenGrotesk-Regular',
  },
});
