import React from 'react';

import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
}

export default function AuthRoutes() {
  const AuthStack = createStackNavigator<RootStackParamList>();

  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  )
}