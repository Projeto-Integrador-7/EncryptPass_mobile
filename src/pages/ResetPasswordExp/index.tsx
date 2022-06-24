import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Stack, Icon } from "native-base";
import { ButtonContainer, Container, FormContainer, WarningContainer, WarningSubtitle, WarningText } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

import { useAuth } from "../../contexts/useAuth";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";

type FormData = {
  password: string;
  password_repeat: string;
  passwordReminder: boolean;
  passwordReminderTip: string;
};

export default function ResetPasswordExp() {
  const { session } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const person_name = session?.user.name ? session.user.name.split(' ') : '';

  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      password: '',
      password_repeat: '',
      passwordReminder: false,
      passwordReminderTip: ''
    }
  })


  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleShowPasswordRepeat() {
    setShowPasswordRepeat(!showPasswordRepeat)
  }

  return (
    <Container>
      <FormContainer>
        <WarningContainer>
          <Stack space={4} width="100%">
            <WarningText>Olá {person_name[0]}, sua senha expirou.</WarningText>
            <WarningSubtitle>Crie uma nova senha abaixo para acessar sua conta novamente.</WarningSubtitle>
          </Stack>
        </WarningContainer>
        <Stack space={2} width="100%">
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
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "A senha deve conter pelo menos 1 letra maíuscula, 1 letra minuscula e 1 caractere escpecial."
              }
            }}
          />

          <Controller
            name="password_repeat"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Repita a senha master *"
                type={showPasswordRepeat ? "text" : "password"}
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.password_repeat)}
                errorText={errors.password_repeat?.message}
                InputRightElement={<Icon
                  as={<MaterialIcons name={showPasswordRepeat ? "visibility" : "visibility-off"} />}
                  size={5}
                  mr="5"
                  onPress={() => handleShowPasswordRepeat()}
                />
                }
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Confirme sua senha'
              },
              validate: value => value === watch('password') || "Senha Master não confere"
            }}
          />

          <Controller
            name="passwordReminderTip"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Dica de senha (Opcional)"
                type="text"
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.passwordReminderTip)}
                errorText={errors.passwordReminderTip?.message}
              />
            )}
            rules={{
              required: false
            }}
          />
        </Stack>
      </FormContainer>
      <ButtonContainer>
        <CustomButton
          title="Confirmar"
          color="green"
        />
      </ButtonContainer>
    </Container>
  )
}