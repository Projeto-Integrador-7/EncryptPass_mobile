import React, { useEffect, useState } from 'react';
import { ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Stack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { useToast } from "native-base";

import { Container, RemoveText, Spacing } from './styles';

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { CustomButton } from '../../components/CustomButton';
import { CustomToast } from '../../components/CustomToast';
import { CardPassword } from '../../components/CardPassword';
import { CustomModal } from '../../components/CustomModal';
import { CustomInput } from '../../components/CustomInput';
import { CardPasswordSkeleton } from '../../components/CardsSkeleton';

import { RootStackParamList } from "../../models/rootStackParamList";
import { Credentials } from '../../models/credentials';

import { useAuth } from '../../contexts/useAuth';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';

type CredentialsPageProps = StackNavigationProp<RootStackParamList, 'Credentials'>;

type FormData = {
  title: string;
  url: string;
  password: string;
  login: string;
};

export default function CredentialsFolderView() {
  const { session } = useAuth();
  const api = useAxiosPrivate();
  const navigation = useNavigation<CredentialsPageProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'Credentials'>>();
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState<Credentials[]>([]);
  const [credentialsLoading, setCredentialsLoading] = useState(true);
  const [currentCredential, setCurrentCredential] = useState<Credentials>();

  const [modalCEOpen, setModalCEOpen] = useState(false);
  const [modalCELoading, setModalCELoading] = useState(false);

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [modalDeleteLoading, setModalDeleteLoading] = useState(false);

  const [modalType, setModalType] = useState('create' || 'edit');

  useEffect(() => {
    const unsubscribe = () => { };

    return unsubscribe;
  }, [navigation])

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`credentials/${session?.user._id}/${route.params._id}`);
      setCredentials(response.data.credentials);
      setCredentialsLoading(false);
    }
    loadData();
  }, [])


  const { control, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      url: '',
      login: '',
      password: ''
    }
  })

  useEffect(() => {
    if (currentCredential) {
      setValue('title', currentCredential.title);
      setValue('url', currentCredential.url);
      setValue('login', currentCredential.login);
      setValue('password', currentCredential.password);
    }
  }, [currentCredential])

  const onCreate = async (data: FormData) => {
    setModalCELoading(true);
    try {
      const response = await api.post(`credentials/${session?.user._id}/create`, {
        title: data.title,
        url: data.url,
        login: data.login,
        password: data.password,
        folderId: route.params._id
      });

      setCredentials([
        ...credentials,
        response.data.credentials
      ])

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

      handleCloseCEModal();
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

    setModalCELoading(false);
  };

  const onEdit = async (data: FormData) => {
    setModalCELoading(true);
    try {
      const response = await api.put(`credentials/${session?.user._id}/update/${currentCredential?._id}`, {
        title: data.title,
        url: data.url,
        login: data.login,
        password: data.password
      });

      let elementIndex = credentials.findIndex(item => item._id === currentCredential?._id);

      let updateCredentials = [...credentials];
      updateCredentials[elementIndex] = response.data.credentials

      setCredentials(updateCredentials)

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

      handleCloseCEModal()
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

    setModalCELoading(false);
  };

  const onDelete = async (data: FormData) => {
    setModalDeleteLoading(true);
    try {
      const response = await api.delete(`credentials/${session?.user._id}/delete/${currentCredential?._id}`);

      let elementIndex = credentials.findIndex(item => item._id === currentCredential?._id);

      let deleteCredentials = credentials;
      deleteCredentials.splice(elementIndex, 1)

      setCredentials(deleteCredentials)

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

      setModalDeleteOpen(false)
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

    setModalDeleteLoading(false);
  };

  function handleCloseCEModal() {
    setModalCEOpen(false);
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
        marginBottom={false}
      >
        <CustomButton
          title="Adicionar"
          color="green"
          onPress={() => {
            setModalType('create');
            setModalCEOpen(true);
          }}
          icon={{
            icon: 'add'
          }}
        />

        <Spacing />

        <ScrollView persistentScrollbar={true}>
          {credentialsLoading ?
            <CardPasswordSkeleton repeat={1} />
            :
            <Container>
              <Stack space={4} width="100%">
                {credentials.map((credential, key) => (
                  <CardPassword
                    key={key}
                    title={credential.title}
                    login={credential.login}
                    password={credential.password}
                    url={credential.url}
                    edit={() => {
                      setModalType('edit');
                      setCurrentCredential(credential);
                      setModalCEOpen(true);
                    }}
                    remove={() => {
                      setCurrentCredential(credential);
                      setModalDeleteOpen(true);
                    }}
                  />
                ))}
              </Stack>
            </Container>
          }
        </ScrollView>

      </PageBody>

      {/* MODAL CRIANDO/EDITANDO SENHA: INICIO */}
      <CustomModal
        title={modalType === 'create' ? "Criando Senha" : "Editando " + currentCredential?.title}
        isOpen={modalCEOpen}
        onClose={handleCloseCEModal}
        onPress={modalType === 'create' ? handleSubmit(onCreate) : handleSubmit(onEdit)}
        isLoading={modalCELoading}
        button={{
          text: modalType === 'create' ? 'Criar' : 'Editar',
          loadingText: modalType === 'create' ? 'Criando...' : 'Editando...',
          color: 'green'
        }}
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
            name="login"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="E-mail/Usuário *"
                type="text"
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.login)}
                errorText={errors.login?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Informe um e-mail/usuário'
              }
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
              required: {
                value: true,
                message: 'Informe uma senha'
              }
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
                isInvalid={Boolean(errors.url)}
                helperText="Exemplo: https://unipam.edu.br"
              />
            )}
            rules={{
              required: false,
            }}
          />

        </Stack>
      </CustomModal>
      {/* MODAL CRIANDO/EDITANDO SENHA: FIM */}

      {/* MODAL EXCLUINDO SENHA: INCIO */}
      <CustomModal
        title={"Excluindo " + currentCredential?.title}
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onPress={handleSubmit(onDelete)}
        isLoading={modalDeleteLoading}
        button={{
          text: 'Excluir',
          loadingText: 'Excluindo...',
          color: 'red'
        }}
      >
        <RemoveText>Você realmente deseja excluir {currentCredential?.title}? Essa ação não poderá ser desfeita.</RemoveText>
      </CustomModal>
      {/* MODAL EXCLUINDO SENHA: FIM */}


    </PageContainer >
  )
}