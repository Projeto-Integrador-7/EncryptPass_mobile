import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from "expo-status-bar";

import Routes from './src/routes';

import React from 'react';
import theme from './src/styles/theme';
import colors from './src/styles/colors';

import { AuthProvider } from './src/contexts/auth';

export default function App() {
  return (
    <NativeBaseProvider theme={theme} >
      <NavigationContainer>
        <StatusBar
          backgroundColor={colors.background}
          style="light"
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>

  )
}

