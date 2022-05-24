import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Spacing } from './styles';

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { CustomButton } from '../../components/CustomButton';

import { CardPassword } from '../../components/CardPassword';
import { RootStackParamList } from "../../models/RootStackParamList";
import { Credentials } from '../../models/credentials';

import { useAuth } from '../../contexts/useAuth';

import api from '../../services/api';

type CredentialsPageProps = StackNavigationProp<RootStackParamList, 'Credentials'>;

export default function CredentialsFolderView() {
  const navigation = useNavigation<CredentialsPageProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'Credentials'>>();

  const { user } = useAuth();

  const [credentials, setCredentials] = useState<Credentials[]>([])

  useEffect(() => {
    async function loadData(){
      const response = await api.get(`credentials/${user?._id}/${route.params._id}`);
      setCredentials(response.data)
    }
    loadData();
  }, [])

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
          onPress={() => navigation.navigate('CreateFolderPassword', { _id: route.params._id, title: route.params.title})}
          icon={{
            icon: 'add'
          }}
        />

        <Spacing />

        <CardPassword title="Netflix" />

      </PageBody>
    </PageContainer>
  )
}