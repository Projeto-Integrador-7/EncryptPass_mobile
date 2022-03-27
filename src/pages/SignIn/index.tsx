import React, { useState } from "react";
import { Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { Logo } from "../../components/Logo";

import { useAuth } from '../../contexts/auth';

import { Container, FormContainer, ButtonContainer } from "./styles"

import { RootStackParamList } from "../../routes/auth.routes";

type SignInProps = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<SignInProps>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleSignIn() {
    signIn(email, password)
  }

  return (
    <Container>
      <Logo />
      <FormContainer>
        <Stack space={4} width="100%">
          <CustomInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            placeholder="Senha Master"
            secureTextEntry={showPassword ? false : true}
            value={password}
            onChangeText={setPassword}
          />
        </Stack>
      </FormContainer>
      <ButtonContainer>
        <Stack space={4} width="100%">
          <CustomButton
            title="Entrar"
            color="green"
            onPress={handleSignIn}
          />
          <CustomButton
            title="Cadastrar"
            color="none"
            onPress={() => navigation.navigate('SignUp')}
          />
        </Stack>
      </ButtonContainer>
    </Container>
  )
}