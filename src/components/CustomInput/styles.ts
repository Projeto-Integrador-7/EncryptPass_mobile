import styled from "styled-components/native";

import colors from '../../styles/colors';

export const Input = styled.TextInput.attrs({
  placeholderTextColor: `${colors.white}`
})`
  width: 100%;
  height: 60px;
  background-color: ${colors.grayDark};
  color: ${colors.white};
  border-radius: 50px;
  padding: 10px 30px;
`