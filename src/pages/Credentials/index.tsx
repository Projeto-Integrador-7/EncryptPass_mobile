import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { Spacing } from './styles';

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { CustomButton } from '../../components/CustomButton';

import { CardPassword } from '../../components/CardPassword';
import { RootStackParamList } from "../../models/rootStackParamList";
import { Credentials } from '../../models/credentials';

import { useAuth } from '../../contexts/useAuth';
import useAxios from '../../hooks/useAxios';
import { CustomModal } from '../../components/CustomModal';
import { Icon, Stack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { CustomInput } from '../../components/CustomInput';

type CredentialsPageProps = StackNavigationProp<RootStackParamList, 'Credentials'>;

type FormData = {
  title: string;
  url: string;
  password: string;
  login: string;
};

export default function CredentialsFolderView() {
  const navigation = useNavigation<CredentialsPageProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'Credentials'>>();
  const { session } = useAuth();
  const api = useAxios();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<Credentials[]>([])
  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`credentials/${session?.user._id}/${route.params._id}`);
      setCredentials(response.data)
    }
    loadData();
  }, [])

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      url: '',
      login: '',
      password: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setModalLoading(true);
    setModalOpen(false);
    setModalLoading(false);
  };

  function handleCloseModal() {
    setModalOpen(false);
    reset();
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }


  return (
    <PageContainer>
      <PageBody
        title={route.params.title}
        onPress={() => navigation.navigate('Tabs', { Dashboard: undefined })}
        back={true}
      >
        <CustomButton
          title="Adicionar"
          color="green"
          onPress={() => setModalOpen(true)}
          icon={{
            icon: 'add'
          }}
        />

        <Spacing />

        <CardPassword title="Netflix" />

      </PageBody>

      <CustomModal
        title="Criando Pasta"
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onPress={handleSubmit(onSubmit)}
        isLoading={modalLoading}
      >
        <Stack space={4} width="100%">
          <Controller
            name="title"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Nome *"
                type="text"
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.title)}
                errorText={errors.title?.message}
              />
            )}
            rules={{
              required: true,
              minLength: {
                value: 3,
                message: "O nome deve conter no mínimo 3 caracteres"
              }
            }}
          />

          <Controller
            name="login"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Login/Usuário *"
                type="text"
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.login)}
                errorText={errors.login?.message}
              />
            )}
            rules={{
              required: true,
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Senha *"
                type={showPassword ? "text" : "password"}
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.login)}
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
              required: true,
            }}
          />

          <Controller
            name="url"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="URL (Opcional)"
                type="text"
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.login)}
                helperText="Exemplo: https://unipam.edu.br"
              />
            )}
            rules={{
              required: false,
            }}
          />

        </Stack>
      </CustomModal>
    </PageContainer>
  )
}