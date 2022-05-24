import React, { useEffect, useState } from "react";
import { Stack } from "native-base";
import { ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { CardPasswordFolder } from "../../components/CardPasswordFolder";
import { CustomButton } from "../../components/CustomButton";
import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";

import { Spacing } from "./styles";

import { RootStackParamList } from "../../models/RootStackParamList";

import { useFolder } from "../../contexts/useFolder";

type DashboardProps = StackNavigationProp<RootStackParamList>;

export default function Dashboard() {
  const navigation = useNavigation<DashboardProps>();

  const { folders, loadFolders } = useFolder();

  useEffect(() => {
    loadFolders();
  }, [])

  return (
    <PageContainer>
      <PageBody title="Meu Cofre">
        <CustomButton
          title="Adicionar"
          color="green"
          onPress={() => navigation.navigate('CreateFolder')}
          icon={{
            icon: 'add'
          }}
        />
        <Spacing />
        <ScrollView persistentScrollbar={true}>
          <Stack space={4} width="100%">
            {folders.map(folder => (
              <CardPasswordFolder
                myKey={folder._id}
                title={folder.title}
                onPress={() => navigation.navigate('Credentials', { _id: folder._id, title: folder.title })}
              />
            ))}
          </Stack>
        </ScrollView>
      </PageBody>
    </PageContainer>
  )
}