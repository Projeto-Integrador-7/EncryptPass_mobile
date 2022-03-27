import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import Dashboard from '../pages/Dashboard';
import PasswordGenerator from '../pages/PasswordGenerator';

import colors from '../styles/colors';

export default function AppRoutes() {
  const AppTab = createBottomTabNavigator();

  return (
    <AppTab.Navigator
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
        name="Settings"
        component={Dashboard}
        options={{
          tabBarLabel: 'Configurações',
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={28} color={color} />
          )
        }}
      />
    </AppTab.Navigator>
  )
}