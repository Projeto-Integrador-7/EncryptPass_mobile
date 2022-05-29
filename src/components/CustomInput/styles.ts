import { Input } from "native-base";
import styled from "styled-components/native";

import colors from '../../styles/colors';

export const NativeBaseInput = styled(Input).attrs({
  paddingTop: '10px',
  paddingBottom: '10px',
  paddingLeft: '30px',
  paddingRight: '30px',
  height: '50px',
  backgroundColor: colors.grayDark,
  placeholderTextColor: colors.placeHolderText
})``;

export const ErrorText = styled.Text`
  margin-top: 5px;
  margin-left: 30px;
  color: ${colors.red};
`

export const HelperText = styled.Text`
  margin-top: 5px;
  margin-left: 30px;
  color: ${colors.white};
`