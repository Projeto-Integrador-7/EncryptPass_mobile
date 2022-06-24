import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import PasswordGenerator from '../pages/PasswordGenerator';
import Credentials from '../pages/Credentials';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import ChangePassword from '../pages/ChangePassword';

import { RootStackParamList } from '../models/rootStackParamList';

import colors from '../styles/colors';

function Tabs() {
  const AppTab = createBottomTabNavigator();

  return (
    <AppTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: '#aca9a9',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 65,
          borderRadius: 50,
          backgroundColor: colors.gray,
          borderTopColor: 'transparent',
          elevation: 0
        },
        tabBarLabelStyle: {
          fontSize: 14
        }
      }}
    >
      <AppTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Meu Cofre',
          tabBarIcon: ({ color }) => (
            <Ionicons name="shield" size={28} color={color} />
          )
        }}
      />
      <AppTab.Screen
        name="PasswordGenerator"
        component={PasswordGenerator}
        options={{
          tabBarLabel: 'Gerador de Senhas',
          tabBarIcon: ({ color }) => (
            <Ionicons name="key" size={28} color={color} />
          )
        }}
      />
      <AppTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={28} color={color} />
          )
        }}
      />
    </AppTab.Navigator>
  )
}

export default function AppRoutes() {
  const AuthStack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer independent>
      <AuthStack.Navigator
        initialRouteName="Tabs"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      >
        <AuthStack.Screen name="Tabs" component={Tabs} />
        <AuthStack.Screen name="Credentials" component={Credentials} />
        <AuthStack.Screen name="EditProfile" component={EditProfile} />
        <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}