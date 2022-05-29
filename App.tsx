import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from "expo-status-bar";

import Routes from './src/routes';

import theme from './src/styles/theme';
import colors from './src/styles/colors';

import { AuthProvider } from './src/contexts/useAuth';
import { FolderProvider } from './src/contexts/useFolder';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.background}
          style="light"
        />
        <AuthProvider>
          <FolderProvider>
            <Routes />
          </FolderProvider>
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>

  )
}

