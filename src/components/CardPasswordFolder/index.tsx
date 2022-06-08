import React from "react";
import { Stack } from "native-base";
import { Button, Text, TouchableOpacity } from "react-native";
import { CustomButton } from "../CustomButton";
import { Card, Container, Description, HeaderContainer, Title } from "./styles";

interface CardPasswordFolderProps {
  title: string;
  description: string;
  onPress?: () => void;
  edit?: () => void;
  remove?: () => void;
}

export function CardPasswordFolder({ title, description, onPress, edit, remove }: CardPasswordFolderProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
    >
      <Card>
        <Container>
          <HeaderContainer>
            <Title>{title}</Title>
            <Stack space={1} direction="row">
              <CustomButton
                color="green"
                width="40px"
                height="25px"
                onPress={edit}
                icon={{
                  icon: 'edit',
                  size: 14
                }}
              />
              <CustomButton
                color="red"
                width="40px"
                height="25px"
                onPress={remove}
                icon={{
                  icon: 'delete',
                  size: 14
                }}
              />
            </Stack>
          </HeaderContainer>
          <Description>{description}</Description>
        </Container>
      </Card>
    </TouchableOpacity>
  )
}