import React from "react";
import { NativeBaseInput, ErrorText, HelperText } from "./styles";
import { IInputProps } from "native-base";

interface CustomInputProps extends IInputProps {
  helperText?: string;
  errorText?: string;
}

export function CustomInput({ helperText, errorText, ...props } : CustomInputProps) {
  return (
    <>
      <NativeBaseInput
        variant="rounded"
        {...props}
      />
      {errorText !== undefined && <ErrorText>{errorText}</ErrorText>}
      {errorText === undefined && (helperText && <HelperText>{helperText}</HelperText>)}
    </>
  )
} 