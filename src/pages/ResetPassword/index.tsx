import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Stack } from "native-base";
import { ButtonContainer, Container, FormContainer, WarningContainer, WarningText } from "./styles";

import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { RootStackParamList } from "../../models/rootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ResetPasswordProps = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

type FormData = {
  email: string
};

export default function ResetPassword() {
  const navigation = useNavigation<ResetPasswordProps>();


  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: '',
    }
  })

  return (
    <Container>
      <FormContainer>
        <WarningContainer>
          <Stack space={4} width="100%">
            <WarningText>Informe seu e-mail abaixo para prosseguir</WarningText>
          </Stack>
        </WarningContainer>
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
        </Stack>
      </FormContainer>
      <ButtonContainer>
        <Stack space={4} width="100%">
          <CustomButton
            title="Confirmar"
            color="green"
          />
          <CustomButton
            title="Voltar"
            color="none"
            noBorder={true}
            onPress={() => navigation.navigate('SignIn')}
          />
        </Stack>
      </ButtonContainer>
    </Container>
  )
}