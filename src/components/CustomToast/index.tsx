import React from "react";
import { Box } from "native-base";

interface CustomToastProps {
  description: string;
  type: 'success' | 'error';
}

const toastColors = {
  success: "green.500",
  error: "red.500"
}

export function CustomToast({ description, type }: CustomToastProps) {

  return (
    <Box bg={toastColors[type]} px="3" py="3" rounded="sm" mb={2}>
      {description}
    </Box>
  )
}