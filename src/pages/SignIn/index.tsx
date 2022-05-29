import React, { useState } from "react";
import { FormControl, Icon, Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";

import { useAuth } from '../../contexts/useAuth';

import { Container, WelcomeContainer, WelcomeText, FormContainer, ButtonContainer, ValidationText } from "./styles"

import { RootStackParamList } from "../../models/rootStackParamList";

type SignInProps = StackNavigationProp<RootStackParamList, 'SignIn'>;

export default function SignIn() {
  const { signIn } = useAuth();
  const navigation = useNavigation<SignInProps>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function validate() {
    setErrors({});

    if (email === undefined || email === '') {
      setErrors({
        ...errors,
        email: 'Error'
      });

    } 
    
    if (password === undefined || password === '') {
      setErrors({
        ...errors,
        password: 'Error'
      });

    }

    if(errors !== null){
      return true
    } else {
      return false
    }
  }

  function handleSignIn() {
    validate() ? signIn(email, password) :  console.log('teste')
  }

  return (
    <Container>
      <FormContainer>
        <WelcomeContainer>
          <WelcomeText>Olá, insira os dados abaixo para entrar.</WelcomeText>
        </WelcomeContainer>
        <FormControl isRequired isInvalid={('email' || 'password') in errors}>
          <Stack space={4} width="100%">
            <CustomInput
              placeholder="Email"
              type="email"
              value={email}
              onChangeText={setEmail}
            />
            {'email' in errors && <ValidationText>E-mail é obrigatório</ValidationText>}
            <CustomInput
              placeholder="Senha Master"
              type={showPassword ? "text" : "password"}
              value={password}
              onChangeText={setPassword}
              InputRightElement={<Icon
                as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                size={5}
                mr="5"
                onPress={() => handleShowPassword()}
              />
              }
            />
            {'password' in errors && <ValidationText>Senha é obrigatória</ValidationText>}
          </Stack>
        </FormControl>
      </FormContainer>
      <ButtonContainer>
        <Stack space={4} width="100%">
          <CustomButton
            title="Entrar"
            color="green"
            onPress={handleSignIn}
          />
          <CustomButton
            title="Voltar"
            color="none"
            noBorder={true}
            onPress={() => navigation.navigate('Welcome')}
          />
        </Stack>
      </ButtonContainer>
    </Container>
  )
}