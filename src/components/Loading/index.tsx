import React from "react";
import { Heading, Stack, Spinner } from "native-base";
import { Container } from "./styles";

export default function Loading() {
  return (
    <Container>
      <Stack space={3} justifyContent="center">
        <Spinner
          size="lg"
          color="primary.500"
        />
        <Heading color="white" fontSize="md">
          Entrando...
        </Heading>
      </Stack>
    </Container>
  )
}