import styled from "styled-components/native";

import colors from "../../styles/colors";

export const ScrollView = styled.ScrollView.attrs({
  flexGrow: 1,
  justifyContent: 'flex-start'
})`
  background-color: ${colors.background};
`

export const StepperContainer = styled.View`
  margin: 80px 0 40px 0;
`

export const Stepper = styled.Text`
  text-align: center;
  color: ${colors.white};
  font-size: 18px;
`

export const StepperText = styled.Text`
  text-align: center;
  color: ${colors.white};
  font-size: 20px;
`

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  padding: 50px;
`

export const FormContainer = styled.View`
  width: 100%;
`

export const ButtonContainer = styled.View`
  width: 100%;
  padding-top: 40px;
`

