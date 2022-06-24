import styled from "styled-components/native";
import { Button as ButtonNB, Modal as ModalNB, Text } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";

import colors from '../../styles/colors';

export const ModalContent = styled(ModalNB.Content).attrs({
  width: "100%",
  maxWidth: "100%",
  marginBottom: 0, 
  marginTop: "auto", 
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30
})``

export const ModalCloseButton = styled(ModalNB.CloseButton).attrs({
  borderRadius: 50
})``

export const ModalHeader = styled(ModalNB.Header).attrs({
  textAlign: 'center'
})``

export const HeaderText = styled(Text).attrs({
  fontSize: RFValue(16, 500)
})``

export const ButtonContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
