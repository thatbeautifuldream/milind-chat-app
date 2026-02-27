import { Image } from 'expo-image';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ExternalLink } from '@/components/external-link';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Collapsible } from '@/components/ui/collapsible';
import { WebBadge } from '@/components/web-badge';
import { useTheme } from '@/hooks/use-theme';

export default function TabTwoScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const theme = useTheme();

  const androidInsets = {
    paddingTop: safeAreaInsets.top,
    paddingLeft: safeAreaInsets.left,
    paddingRight: safeAreaInsets.right,
    paddingBottom: safeAreaInsets.bottom,
  };

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={safeAreaInsets}
      contentContainerStyle={[
        Platform.OS === 'android' ? androidInsets : { paddingTop: 64, paddingBottom: 16 },
        styles.scrollContent,
      ]}>
      <View style={styles.container}>
        <View style={styles.introSection}>
          <ThemedText type="subtitle">Explore</ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centeredText}>
            This starter app includes example{'\n'}code to help you get started.
          </ThemedText>

          <ExternalLink href="https://docs.expo.dev" asChild>
            <Pressable>
              <ThemedView type="backgroundElement" style={styles.button}>
                <ThemedText type="link">Expo documentation</ThemedText>
                <SymbolView
                  tintColor={theme.text}
                  name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
                  size={12}
                />
              </ThemedView>
            </Pressable>
          </ExternalLink>
        </View>

        <View style={styles.contentSection}>
          <Collapsible title="File-based routing">
            <ThemedText type="small">
              This app has two screens: <ThemedText type="code">src/app/index.tsx</ThemedText> and{' '}
              <ThemedText type="code">src/app/explore.tsx</ThemedText>
            </ThemedText>
            <ThemedText type="small">
              The layout file in <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
              tab navigator.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/router/introduction">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Android, iOS, and web support">
            <ThemedView type="backgroundElement" style={styles.imageSection}>
              <ThemedText type="small">
                You can open this project on Android, iOS and the web. To open the web version,
                press <ThemedText type="smallBold">w</ThemedText> in the terminal running this
                project.
              </ThemedText>
              <Image
                source={require('@/assets/images/tutorial-web.png')}
                style={styles.image}
              />
            </ThemedView>
          </Collapsible>

          <Collapsible title="Images">
            <ThemedText type="small">
              For static images, you can use the <ThemedText type="code">@2x</ThemedText> and{' '}
              <ThemedText type="code">@3x</ThemedText> suffixes to provide files for different
              screen densities.
            </ThemedText>
            <Image source={require('@/assets/images/react-logo.png')} style={styles.logoImage} />
            <ExternalLink href="https://reactnative.dev/docs/images">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Light and dark mode components">
            <ThemedText type="small">
              This template has light and dark mode support. The{' '}
              <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect what&apos;s
              the user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
            </ThemedText>
            <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <ThemedText type="linkPrimary">Learn more</ThemedText>
            </ExternalLink>
          </Collapsible>

          <Collapsible title="Animations">
            <ThemedText type="small">
              This template includes an example of an animated component. The <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
              powerful <ThemedText type="code">react-native-reanimated</ThemedText> library to
              animate opening this hint.
            </ThemedText>
          </Collapsible>
        </View>
        {Platform.OS === 'web' && <WebBadge />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    maxWidth: 800,
  },
  introSection: {
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  centeredText: {
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  contentSection: {
    gap: 20,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  imageSection: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    borderRadius: 12,
    marginTop: 8,
  },
  logoImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});
