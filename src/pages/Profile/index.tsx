import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { CardProfile } from "../../components/CardProfile";
import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";

import { useAuth } from "../../contexts/useAuth";

import { RootStackParamList } from "../../models/rootStackParamList";

type ProfilePageProps = StackNavigationProp<RootStackParamList, 'Profile'>;

export default function Profile() {
  const navigation = useNavigation<ProfilePageProps>();
  const { session, signOut } = useAuth()

  const person_name = session?.user.name ? session.user.name.split(' ') : '';

  return (
    <PageContainer>
      <PageBody
        title={"Olá, " + person_name[0]}
        description="O que você deseja fazer hoje?"
      >
        <VStack space={2}>
          <CardProfile
            title="Editar Perfil"
            onPress={() => navigation.navigate('EditProfile')}
            icon={{
              icon: 'person'
            }}
          />
          <CardProfile
            title="Alterar Minha Senha"
            onPress={() => navigation.navigate('ChangePassword')}
            icon={{
              icon: 'lock'
            }}
          />
          <CardProfile
            title="Sair"
            color="red"
            onPress={signOut}
            icon={{
              icon: 'exit-to-app'
            }}
          />
        </VStack>
      </PageBody>
    </PageContainer>
  )
}