import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "native-base";

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { RootStackParamList } from "../../models/rootStackParamList";
import { CustomInput } from "../../components/CustomInput";
import { Stack } from "native-base";
import { ButtonContainer } from "./styles";
import { CustomButton } from "../../components/CustomButton";
import { CustomToast } from "../../components/CustomToast";

import { useAuth } from "../../contexts/useAuth";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

type EditProfilePageProps = StackNavigationProp<RootStackParamList, 'EditProfile'>;

type FormData = {
  name: string;
  email: string;
  phoneNumber: string;
};


export default function EditProfile() {
  const { session, updateSession } = useAuth();
  const navigation = useNavigation<EditProfilePageProps>();
  const api = useAxiosPrivate();
  const toast = useToast();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: ''
    }
  })

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setValue('name', String(session?.user.name));
    setValue('email', String(session?.user.email));
    setValue('phoneNumber', String(session?.user.phoneNumber));
  }, [])

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    try {
      const response = await api.put(`user/update/${session?.user._id}`, {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber
      });

      updateSession(response.data);

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
          title="Editando Perfil"
          onPress={() => navigation.navigate('Tabs', { Profile: undefined })}
          back={true}
          marginBottom={false}
        >
          <Stack space={2} width="100%">
            <Controller
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  defaultValue={value}
                  placeholder="Nome completo *"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  isInvalid={Boolean(errors.name)}
                  errorText={errors.name?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: 'Informe um nome'
                },
                minLength: {
                  value: 3,
                  message: "O nome deve conter no mínimo 3 caracteres"
                }
              }}
            />

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
              name="phoneNumber"
              control={control}
              render={({ field: { onChange, value } }) => (
                <CustomInput
                  placeholder="Telefone (Opcional)"
                  type="text"
                  value={value}
                  onChangeText={onChange}
                  isInvalid={Boolean(errors.phoneNumber)}
                  errorText={errors.phoneNumber?.message}
                />
              )}
              rules={{
                required: false,
                pattern: {
                  value: /[0-9]{11}/,
                  message: "Telefone inválido"
                }
              }}
            />
          </Stack>
          <ButtonContainer>
            <CustomButton
              title="Salvar"
              onPress={handleSubmit(onSubmit)}
              disabled={isSaving}
              color="green"
            />
          </ButtonContainer>

        </PageBody>
      </PageContainer>
    )
  }