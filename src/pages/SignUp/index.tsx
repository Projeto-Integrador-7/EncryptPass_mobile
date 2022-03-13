import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";

import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { Logo } from "../../components/Logo";

import { Container, FormContainer, ButtonContainer } from "./styles"

import { RootStackParamList } from "../../routes/auth.routes";

type SignUpProps = StackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUp() {
  const navigation = useNavigation<SignUpProps>();

  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <Container>
      <Logo />
      <FormContainer>
        <Stack space={4} width="100%">
          <CustomInput
            placeholder="Email"
          />
          <CustomInput
            placeholder="Senha Master"
            secureTextEntry={showPassword ? false : true}
          />
          <CustomInput
            placeholder="Repita a Senha Master"
            secureTextEntry={showPassword ? false : true}
          />
        </Stack>
      </FormContainer>
      <ButtonContainer>
        <Stack space={4} width="100%">
          <CustomButton
            title="Cadastrar"
            color="green"
          />
          <CustomButton
            title="Cancelar"
            color="red"
            onPress={() => navigation.navigate('SignIn')}
          />
        </Stack>
      </ButtonContainer>
    </Container>
  )
}