import React, { useEffect, useState } from "react";
import { FormControl, Stack } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { ButtonContainer } from "./styles";

import { RootStackParamList } from "../../models/RootStackParamList";;

import { useFolder } from "../../contexts/useFolder";


type CreateFolderProps = StackNavigationProp<RootStackParamList, 'CreateFolder'>;

export default function CreateFolder() {
  const navigation = useNavigation<CreateFolderProps>();

  const { createFolder } = useFolder();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleCreate(){
    createFolder(title, description);
    navigation.navigate('Tabs', { Dashboard: undefined })
  }
  
  return (
    <PageContainer>
      <PageBody
        title="Criado nova pasta"
        onPress={() => navigation.navigate('Tabs', { Dashboard: undefined })}
        back={true}
      >
        <FormControl>
          <Stack space={4} width="100%">
            <CustomInput
              placeholder="Nome"
              type="text"
              value={title}
              onChangeText={setTitle}
            />

            <CustomInput
              placeholder="Descrição (Opcional)"
              type="text"
              value={description}
              onChangeText={setDescription}
            />

          </Stack>
        </FormControl>
        <ButtonContainer>
          <CustomButton
            title="Adicionar"
            color="green"
            onPress={handleCreate}
          />
        </ButtonContainer>
      </PageBody>
    </PageContainer>
  )
}