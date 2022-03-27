import React from "react";
import { Stack } from "native-base";
import { ScrollView } from "react-native";
import { CardPasswordFolder } from "../../components/CardPasswordFolder";
import { CustomButton } from "../../components/CustomButton";
import { PageContainer } from "../../components/PageContainer";
import { Container, Spacing } from "./styles";

export default function Dashboard() {
  return (
    <Container>
      <PageContainer title="Meu Cofre">
        
        <CustomButton
          title="Adicionar"
          color="green"
          icon={{
            icon: 'add'
          }}
        />
        <Spacing />
        <ScrollView persistentScrollbar={true}>
          <Stack space={4} width="100%">
            <CardPasswordFolder title="Streamings" />
            <CardPasswordFolder title="Redes Sociais" />
            <CardPasswordFolder title="Faculdade" />
          </Stack>
        </ScrollView>
      </PageContainer>
    </Container>
  )
}