import styled from "styled-components/native";

import colors from "../../styles/colors";

export const ScrollView = styled.ScrollView.attrs({
  flexGrow: 1, 
  justifyContent: 'center'
})`
  background-color: ${colors.background};
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

