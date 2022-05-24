import React from "react";
import { CustomButton } from "../CustomButton";
import { Card, Container, HeaderContainer, Icon, IconBackground, PasswordContainer, PasswordText, Text } from "./styles";

interface CardPasswordProps {
  title: string;
  onPress?: () => void;
}

export function CardPassword({ title, onPress }: CardPasswordProps) {
  return (
    <Card>
      <Container>
        <HeaderContainer>
          <IconBackground>
            <Icon
              source={{
                uri: "https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://netflix.com&size=128"
              }}
            />
          </IconBackground>
          <Text>{title}</Text>
        </HeaderContainer>
        <CustomButton
          title="Editar"
          color="none"
          width="35%"
          height="35px"
          fontSize="12px"
          onPress={onPress}
        />
      </Container>
      <PasswordContainer>
        <PasswordText>Senha</PasswordText>
        <Text>95816516515</Text>
      </PasswordContainer>
    </Card>
  )
}