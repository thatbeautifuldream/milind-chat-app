import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { SymbolView } from 'expo-symbols';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';

import { ExternalLink } from './external-link';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({ children, isFocused, ...props }: TabTriggerSlotProps) {
  return (
    <Pressable {...props} onPress={(e) => props.onPress?.(e)}>
      <ThemedView
        type={isFocused ? 'backgroundSelected' : 'backgroundElement'}
        style={styles.tabButton}
      >
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'unspecified' ? 'light' : scheme];

  return (
    <View {...props} style={styles.tabListContainer}>
      <ThemedView type="backgroundElement" style={styles.tabBar}>
        <ThemedText type="smallBold" style={styles.title}>
          Expo Starter
        </ThemedText>

        {props.children}

        <ExternalLink href="https://docs.expo.dev" asChild>
          <Pressable style={styles.docsButton}>
            <ThemedText type="link">Docs</ThemedText>
            <SymbolView
              tintColor={colors.text}
              name={{ ios: 'arrow.up.right.square', web: 'link' }}
              size={12}
            />
          </Pressable>
        </ExternalLink>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    width: '100%',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabBar: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    gap: 8,
    maxWidth: 800,
  },
  title: {
    marginRight: 'auto',
  },
  tabButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  docsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginLeft: 12,
  },
});
