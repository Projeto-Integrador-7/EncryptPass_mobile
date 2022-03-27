import React from "react";
import { CustomButton } from "../../components/CustomButton";
import { PageContainer } from "../../components/PageContainer";
import { Container } from "./styles";


export default function Dashboard(){
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
      </PageContainer>
    </Container>
  )
}