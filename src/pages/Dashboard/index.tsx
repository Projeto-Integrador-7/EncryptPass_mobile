import React, { useEffect, useState } from "react";
import { Stack } from "native-base";
import { ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from 'react-hook-form';

import { CardPasswordFolder } from "../../components/CardPasswordFolder";
import { CustomButton } from "../../components/CustomButton";
import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { CardPasswordFolderSkeleton } from "../../components/CardsSkeleton";

import { Container, Spacing } from "./styles";

import { RootStackParamList } from "../../models/rootStackParamList";

import { useFolder } from "../../contexts/useFolder";
import { CustomModal } from "../../components/CustomModal";
import { CustomInput } from "../../components/CustomInput";

import { useAuth } from "../../contexts/useAuth";

type DashboardProps = StackNavigationProp<RootStackParamList>;

type FormData = {
  title: string;
  description: string;
};

export default function Dashboard() {
  const navigation = useNavigation<DashboardProps>();
  const { signOut } = useAuth();
  const { folders, loadFolders, createFolder, folderLoading } = useFolder();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    loadFolders();
  }, [])

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    setModalLoading(true);
    createFolder(data.title, data.description);
    setModalOpen(false);
    setModalLoading(false);
    reset();
  };

  function handleCloseModal() {
    setModalOpen(false);
    reset();
  }

  return (
    <PageContainer>
      <PageBody title="Meu Cofre">
        <CustomButton
          title="Adicionar"
          color="green"
          onPress={() => setModalOpen(true)}
          icon={{
            icon: 'add'
          }}
        />
        <Spacing />
        <ScrollView persistentScrollbar={true}>
          {folderLoading ?
            <CardPasswordFolderSkeleton repeat={5} />
            :
            <Container>
              <Stack space={4} width="100%">
                {folders.map((folder, key) => (
                  <CardPasswordFolder
                    key={key}
                    title={folder.title}
                    onPress={() => navigation.navigate('Credentials', { _id: folder._id, title: folder.title })}
                  />
                ))}
              </Stack>
            </Container>
          }
        </ScrollView>
      </PageBody>

      <CustomModal
        title="Criando Pasta"
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onPress={handleSubmit(onSubmit)}
        isLoading={modalLoading}
        button={{
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
            name="description"
            control={control}
            render={({ field: { onChange, value } }) => (
              <CustomInput
                placeholder="Descrição *"
                type="text"
                value={value}
                onChangeText={onChange}
                isInvalid={Boolean(errors.description)}
                errorText={errors.description?.message}
              />
            )}
            rules={{
              required: {
                value: true,
                message: 'Informe uma descrição'
              },
              minLength: {
                value: 3,
                message: "A descrição deve ter no mínimo 3 caracteres"
              }
            }}
          />

        </Stack>
      </CustomModal>
    </PageContainer>
  )
}