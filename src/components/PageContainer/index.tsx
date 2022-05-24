import React from "react";
import { Container } from "./styles";

interface PageContainerProps {
  children: React.ReactNode;
}

export function PageContainer({ children } : PageContainerProps){
  return(
    <Container>
      {children}
    </Container>
  )
}