import { createStackNavigator } from '@react-navigation/stack';

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
        headerShown: false
      }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  )
}