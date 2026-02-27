import {
  FamiljenGrotesk_400Regular,
  FamiljenGrotesk_500Medium,
  FamiljenGrotesk_600SemiBold,
  FamiljenGrotesk_700Bold,
} from '@expo-google-fonts/familjen-grotesk';
import {
  FiraCode_400Regular,
  FiraCode_500Medium,
  FiraCode_600SemiBold,
  FiraCode_700Bold,
} from '@expo-google-fonts/fira-code';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'FamiljenGrotesk-Regular': FamiljenGrotesk_400Regular,
          'FamiljenGrotesk-Medium': FamiljenGrotesk_500Medium,
          'FamiljenGrotesk-SemiBold': FamiljenGrotesk_600SemiBold,
          'FamiljenGrotesk-Bold': FamiljenGrotesk_700Bold,
          'FiraCode-Regular': FiraCode_400Regular,
          'FiraCode-Medium': FiraCode_500Medium,
          'FiraCode-SemiBold': FiraCode_600SemiBold,
          'FiraCode-Bold': FiraCode_700Bold,
        });
        setFontsLoaded(true);
      } catch (err) {
        console.error('Failed to load fonts:', err);
        setError(err as Error);
        setFontsLoaded(true);
      }
    }

    loadFonts();
  }, []);

  return { fontsLoaded, error };
};
