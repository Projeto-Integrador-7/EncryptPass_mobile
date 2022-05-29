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
          color="none" 
          width="35%" 
          height="35px"
          fontSize="12px"
          onPress={onPress}
        />
      </Container>
    </Card>
  )
}