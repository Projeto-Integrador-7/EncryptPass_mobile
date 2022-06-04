import React, { useState } from "react";
import { Card, Container, HeaderContainer, Favicon, IconBackground, CredentialsContainer, CredentialsText, Text } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Stack } from 'native-base';

import { CustomButton } from "../CustomButton";

interface CardPasswordProps {
  title: string;
  login: string;
  password: string;
  url: string;
  edit?: () => void;
  remove?: () => void;
}

export function CardPassword({ title, login, password, url, edit, remove }: CardPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function isValidHttpUrl(url: string) {
    var res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null);
  }

  return (
    <Card>
      <Container>
        <HeaderContainer>
          <IconBackground>
            {isValidHttpUrl(url) ?
              <Favicon
                source={{
                  uri: `https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${url}&size=128`
                }}
              />
              :
              <Favicon
                source={require('../../../assets/globe.png')}
              />
            }

          </IconBackground>
          <Text>{title}</Text>
        </HeaderContainer>
        <Stack space={1} direction="row">
          <CustomButton
            color="green"
            width="40px"
            height="35px"
            onPress={edit}
            icon={{
              icon: 'edit',
              size: 14
            }}
          />
          <CustomButton
            color="red"
            width="40px"
            height="35px"
            onPress={remove}
            icon={{
              icon: 'delete',
              size: 14
            }}
          />
        </Stack>
      </Container>
      <CredentialsContainer>
        <CredentialsText>Login</CredentialsText>
        <Text>{login}</Text>
      </CredentialsContainer>
      <CredentialsContainer>
        <CredentialsText>Senha</CredentialsText>
        <Stack space={2} width="100%">
          {showPassword ?
            <Text>{password}</Text>
            :
            <Text>&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;</Text>
          }
          <CustomButton
            title={showPassword ? 'Ocultar senha' : 'Exibir senha'}
            color="none"
            width="100%"
            height="35px"
            fontSize="12px"
            onPress={handleShowPassword}
          />
        </Stack>
      </CredentialsContainer>
    </Card>
  )
}