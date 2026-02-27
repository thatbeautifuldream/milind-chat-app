import { version } from 'expo/package.json';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function WebBadge() {
  const scheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="code" themeColor="textSecondary" style={styles.text}>
        v{version}
      </ThemedText>
      <Image
        source={
          scheme === 'dark'
            ? require('@/assets/images/expo-badge-white.png')
            : require('@/assets/images/expo-badge.png')
        }
        style={styles.badge}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  text: {
    textAlign: 'center',
  },
  badge: {
    width: 123,
  },
});
