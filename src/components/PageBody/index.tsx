import React from "react";
import { IconButton, Stack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { TitleAndBackBtn, Container, TextContainer, Title } from "./styles";

interface PageBodyProps {
  title: string;
  children: React.ReactNode;
  marginBottom?: boolean;
  back?: boolean;
  onPress?: () => void;
}

export function PageBody({ title, children, marginBottom, back, onPress }: PageBodyProps) {
  return (
    <Container
      marginBottom={marginBottom === false && '0px' || '90px'}
    >
      <TextContainer>
        {back ?
          <TitleAndBackBtn>
            <Stack space={2} direction="row">
              <IconButton
                _icon={{ as: MaterialIcons, name: "arrow-back", size: "7", color: "white" }}
                borderRadius="full"
                size="sm"
                onPress={onPress}
                _hover={{
                  bg: "secondary.500"
                }}
                _pressed={{
                  bg: "secondary.500"
                }}
                marginTop="-1"
              />
              <Title>{title}</Title>
            </Stack>
          </TitleAndBackBtn>
          :
          <Title>{title}</Title>
        }
      </TextContainer>
      {children}
    </Container>
  )
}