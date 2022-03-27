import React from 'react';
import { useState } from 'react';
import { Button, Text, TextButtonContainer } from './styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../../styles/colors';
import { View } from 'react-native';

interface CustomButtonProps {
  width?: string
  title: string;
  onPress?: () => void;
  color: 'green' | 'red' | 'none';
  icon?: {
    icon: any,
    color?: string
  };
}

export function CustomButton({ color, title, onPress, icon, width, ...props }: CustomButtonProps) {
  const [isPressed, setIsPressed] = useState<boolean>(false);

  function onPressIn() {
    setIsPressed(true);
  }

  function onPressOut() {
    setIsPressed(false);
  }

  return (
    <Button
      width={width || '100%'}
      color={color}
      onPress={onPress}
      isPressed={isPressed}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...props}
    >
      <TextButtonContainer>
        {icon !== undefined &&
          <View style={{ marginRight: 5}}>
            <Ionicons name={icon.icon} size={24} color={icon.color || colors.white} />
          </View>
        }
        <Text>{title}</Text>
      </TextButtonContainer>
    </Button>
  )
}