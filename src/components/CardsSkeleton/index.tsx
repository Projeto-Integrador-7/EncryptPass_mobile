import { Stack } from "native-base";
import React from "react";
import { CardPassword, CardPasswordFolder } from "./styles";

interface CardsProps {
  repeat: number;
}

export function CardPasswordFolderSkeleton({ repeat }: CardsProps) {
  return (
    <Stack space={4} width="100%">
      {Array.from(Array(repeat), (_, index) => (
        <CardPasswordFolder
          key={index}
          rounded="full"
        />
      ))}
    </Stack>
  )
}

export function CardPasswordSkeleton({ repeat }: CardsProps) {
  return (
    <Stack space={4} width="100%">
      {Array.from(Array(repeat), (_, index) => (
        <CardPassword
          key={index}
          rounded="full"
        />
      ))}
    </Stack>
  )
}