import React from "react";
import { NativeBaseInput } from "./styles";

export function CustomInput({ ...props }){
  return(
    <NativeBaseInput
      {...props}
      variant="rounded"
    />
  )
} 