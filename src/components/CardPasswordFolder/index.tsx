import React from "react";
import { CustomButton } from "../CustomButton";
import { Card, Container, Text } from "./styles";

interface CardPasswordFolderProps {
  title: string;
  onPress?: () => void;
}

export function CardPasswordFolder({ title, onPress } : CardPasswordFolderProps){
  return(
    <Card>
      <Container>
        <Text>{title}</Text>
        <CustomButton 
          title="Acessar" 
          color="green" 
          width='50%' 
          onPress={onPress}
        />
      </Container>
    </Card>
  )
}