import React from "react";
import { Container, TextContainer, Title } from "./styles";

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
}

export function PageContainer({ title, children } : PageContainerProps){
  return(
    <Container>
      <TextContainer>
        <Title>{title}</Title>
      </TextContainer>
      {children}
    </Container>
  )
}