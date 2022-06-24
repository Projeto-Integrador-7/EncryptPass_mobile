import React, { useEffect, useState } from "react";
import { FormControl, Icon, Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { useToast } from "native-base";

import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { CustomToast } from "../../components/CustomToast";

import { useAuth } from '../../contexts/useAuth';

import { Container, WelcomeContainer, WelcomeText, FormContainer, ButtonContainer, ForgottenPassword } from "./styles"

import { RootStackParamList } from "../../models/rootStackParamList";

type SignInProps = StackNavigationProp<RootStackParamList, 'SignIn'>;

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { signIn } = useAuth();
  const toast = useToast();
  const navigation = useNavigation<SignInProps>();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = () => { };

    return unsubscribe;
  }, [navigation])

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data: FormData) => {
    {
      try {
        await signIn(data.email, data.password);
      } catch (err: any) {
        toast.show({
          render: () => {
            return (
              <CustomToast
                type="error"
                description={err.response.data.Erro}
              />
            )
          }
        });
      }

    }
  }

  return (
    <Container>
      <FormContainer>
        <WelcomeContainer>
          <WelcomeText>Olá, insira os dados abaixo para entrar.</WelcomeText>
        </WelcomeContainer>
        <Stack space={2} width="100%">
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="E-mail *"
                type="text"
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.email)}
                errorText={errors.email?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Informe um e-mail'
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "E-mail inválido"
              }
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Senha master *"
                type={showPassword ? "text" : "password"}
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.password)}
                errorText={errors.password?.message}
                InputRightElement={<Icon
                  as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                  size={5}
                  mr="5"
                  onPress={() => handleShowPassword()}
                />
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Informe uma senha'
              }
            }}
          />
        </Stack>
        <ForgottenPassword
          onPress={() => navigation.navigate('ResetPassword')}
        >
          Esqueceu a senha?
        </ForgottenPassword>
      </FormContainer>
      <ButtonContainer>
        <Stack space={4} width="100%">
          <CustomButton
            title="Entrar"
            color="green"
            onPress={handleSubmit(onSubmit)}
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