import { FormControl } from "native-base";
import styled from "styled-components/native";

import colors from "../../styles/colors";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;  
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.background};
  padding: 50px;
`

export const WelcomeContainer = styled.View`
  margin: 80px 0 40px 0;
`

export const WelcomeText = styled.Text`
  text-align: center;
  color: ${colors.white};
  font-size: 18px;
`

export const FormContainer = styled.View`
  width: 100%;
`

export const ButtonContainer = styled.View`
  width: 100%;
  padding-top: 40px;
`

export const ValidationText = styled(FormControl.ErrorMessage).attrs({
  marginTop: '-8px'
})``

