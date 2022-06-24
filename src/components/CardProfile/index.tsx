import React from "react";
import { TouchableOpacity } from "react-native";
import { Card, Container, Title } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { HStack } from "native-base";

import colors from "../../styles/colors";

interface CardProfileProps {
  title: string;
  onPress?: () => void;
  color?: 'gray' | 'red';
  icon: {
    icon: any,
    color?: string
    size?: number;
  };
}

export function CardProfile({ title, onPress, color, icon }: CardProfileProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Card color={ color || 'gray'}>
        <Container>
          <HStack space={5}>
            <MaterialIcons name={icon.icon} size={icon.size || 24} color={icon.color || colors.white} />
            <Title>{title}</Title>
          </HStack>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}