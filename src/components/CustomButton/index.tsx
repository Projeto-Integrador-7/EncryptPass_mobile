import React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

import { Button, Text, TextButtonContainer } from './styles';

import colors from '../../styles/colors';

interface CustomButtonProps {
  width?: string;
  height?: string;
  title?: string;
  onPress?: () => void;
  color: 'green' | 'red' | 'none';
  fontSize?: string;
  noBorder?: true;
  icon?: {
    icon: any,
    color?: string
    size?: number;
  };
  disabled?: boolean;
}

export function CustomButton({ color, title, onPress, icon, width, height, fontSize, noBorder, disabled, ...props }: CustomButtonProps) {
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
      height={height || '48px'}
      color={color}
      border={noBorder ? false : true}
      onPress={onPress}
      isPressed={isPressed}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled}
      {...props}
    >
      <TextButtonContainer>
        {icon !== undefined &&
          <View style={{ marginRight: title ? 5 : 0 }}>
            <MaterialIcons name={icon.icon} size={icon.size || 24} color={icon.color || colors.white} />
          </View>
        }
        <Text fontSize={fontSize || '16px'}>{title}</Text>
      </TextButtonContainer>
    </Button>
  )
}