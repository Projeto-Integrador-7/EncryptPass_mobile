import React from "react";
import { Stack } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { Logo } from "../../components/Logo";
import { CustomButton } from "../../components/CustomButton";

import { Container } from "./styles";

import { RootStackParamList } from "../../models/rootStackParamList";

type WelcomeProps = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function Welcome() {
  const navigation = useNavigation<WelcomeProps>();

  return (
    <Container>
      <Logo />
      <Stack space={4} width="100%">
        <CustomButton
          title="Entrar"
          color="green"
          onPress={() => navigation.navigate('SignIn')}
        />
        <CustomButton
          title="Cadastrar"
          color="none"
          onPress={() => navigation.navigate('SignUp')}
        />
      </Stack>
    </Container>
  )
}