import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from "expo-status-bar";

import Routes from './src/routes';

import theme from './src/styles/theme';
import colors from './src/styles/colors';

export default function App() {
  return (
    <NativeBaseProvider theme={theme} >
    <NavigationContainer>
      <StatusBar 
        backgroundColor={colors.background} 
        style="light" 
      />
      <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
    
  )
}

