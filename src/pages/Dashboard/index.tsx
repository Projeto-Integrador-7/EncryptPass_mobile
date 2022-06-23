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
import { CustomModal } from "../../components/CustomModal";
import { CustomInput } from "../../components/CustomInput";

import { Container, RemoveText, Spacing } from "./styles";

import { RootStackParamList } from "../../models/rootStackParamList";

import { useFolder } from "../../contexts/useFolder";

import { Folder } from "../../models/folder";

type DashboardProps = StackNavigationProp<RootStackParamList>;

type FormData = {
  title: string;
  description: string;
};

export default function Dashboard() {
  const navigation = useNavigation<DashboardProps>();
  const { folders, loadFolders, createFolder, editFolder, deleteFolder, folderLoading, folderPromiseLoading } = useFolder();

  const [currentFolder, setCurrentFolder] = useState<Folder>();

  const [modalCEOpen, setModalCEOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [modalType, setModalType] = useState('create' || 'edit');

  useEffect(() => {
    loadFolders();
  }, [])

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: ''
    }
  })

  useEffect(() => {
    if (currentFolder) {
      setValue('title', currentFolder.title);
      setValue('description', currentFolder.description);
    }
  }, [currentFolder])

  const onCreate = async (data: FormData) => {
    try {
      createFolder(data.title, data.description);
      handleCloseModal();
    } catch (err) {
      
    }
    
  };

  const onEdit = async (data: FormData) => {
    editFolder(data.title, data.description, String(currentFolder?._id));
    handleCloseModal();
  };

  const onDelete = async (data: FormData) => {
    deleteFolder(String(currentFolder?._id));
    setCurrentFolder({} as Folder);
    setModalDeleteOpen(false);
  };

  function handleCloseModal() {
    setModalCEOpen(false);
    setCurrentFolder({} as Folder);
    reset();
  }

  return (
    <PageContainer>
      <PageBody title="Meu Cofre">
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
          {folderLoading ?
            <CardPasswordFolderSkeleton repeat={3} />
            :
            <Container>
              <Stack space={4} width="100%">
                {folders.map((folder, key) => (
                  <CardPasswordFolder
                    key={key}
                    title={folder.title}
                    description={folder.description}
                    onPress={() => navigation.navigate('Credentials', { _id: folder._id, title: folder.title })}
                    edit={() => {
                      setCurrentFolder(folder);
                      setModalType('edit');
                      setModalCEOpen(true);
                    }}
                    remove={() => {
                      setCurrentFolder(folder);
                      setModalDeleteOpen(true);
                    }}
                  />
                ))}
              </Stack>
            </Container>
          }
        </ScrollView>
      </PageBody>

      {/* MODAL CRIANDO/EDITANDO PASTA: INICIO */}
      <CustomModal
        title={modalType === 'create' ? "Criando Pasta" : "Editando " + currentFolder?.title}
        isOpen={modalCEOpen}
        onClose={handleCloseModal}
        onPress={modalType === 'create' ? handleSubmit(onCreate) : handleSubmit(onEdit)}
        isLoading={folderPromiseLoading}
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
      {/* MODAL CRIANDO/EDITANDO PASTA: FIM */}

      {/* MODAL EXCLUINDO SENHA: INCIO */}
      <CustomModal
        title={"Excluindo " + currentFolder?.title}
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onPress={handleSubmit(onDelete)}
        isLoading={folderPromiseLoading}
        button={{
          text: 'Excluir',
          loadingText: 'Excluindo...',
          color: 'red'
        }}
      >
        <RemoveText>Você realmente deseja excluir {currentFolder?.title}? Essa ação não poderá ser desfeita.</RemoveText>
      </CustomModal>
      {/* MODAL EXCLUINDO SENHA: FIM */}

    </PageContainer>
  )
}

function deleteFolder(title: string, description: string, arg2: string) {
  throw new Error("Function not implemented.");
}
