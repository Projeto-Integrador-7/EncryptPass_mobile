import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { RootStackParamList } from "../../models/rootStackParamList";
import { Icon, Stack, useToast } from "native-base";
import { ButtonContainer } from "./styles";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import { CustomToast } from "../../components/CustomToast";

import { useAuth } from "../../contexts/useAuth";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

type ChangePasswordPageProps = StackNavigationProp<RootStackParamList, 'ChangePassword'>;

type FormData = {
  password: string;
  password_repeat: string;
  passwordReminder: boolean,
  passwordReminderTip: string;
};

export default function ChangePassword() {
  const { session } = useAuth();
  const navigation = useNavigation<ChangePasswordPageProps>();
  const api = useAxiosPrivate();
  const toast = useToast();

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      password: '',
      password_repeat: '',
      passwordReminder: false,
      passwordReminderTip: ''
    }
  })

  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  useEffect(() => {
    setValue('passwordReminderTip', String(session?.user.passwordReminderTip));
  }, [])

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleShowPasswordRepeat() {
    setShowPasswordRepeat(!showPasswordRepeat)
  }

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);

    let passwordReminder = data.passwordReminderTip ? true : false

    try {
      const response = await api.put(`user/update/${session?.user._id}`, {
        password: data.password,
        passwordReminder: passwordReminder,
        passwordReminderTip: data.passwordReminderTip
      });

      toast.show({
        render: () => {
          return (
            <CustomToast
              type="success"
              description={response.data.Sucesso}
            />
          )
        }
      });

      navigation.navigate('Tabs', { Profile: undefined });
    } catch (res: any) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              type="error"
              description={res.response.data.Erro}
            />
          )
        }
      });
    }
    setIsSaving(false);
  }

  return (
    <PageContainer>
      <PageBody
        title="Alterando Senha"
        onPress={() => navigation.navigate('Tabs', { Profile: undefined })}
        back={true}
        marginBottom={false}
      >
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
        <ButtonContainer>
          <CustomButton
            title="Salvar"
            onPress={handleSubmit(onSubmit)}
            color="green"
            disabled={isSaving}
          />
        </ButtonContainer>
      </PageBody>
    </PageContainer>
  )
}