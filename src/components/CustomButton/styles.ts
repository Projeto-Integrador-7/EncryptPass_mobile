import styled from "styled-components/native";

import colors from "../../styles/colors";

interface ButtonProps {
  color: 'green' | 'red' | 'none';
  isPressed: boolean;
}

const btnColors = {
  green: colors.greenDark,
  red: colors.red,
  none: 'transparent'
}

export const Button = styled.Pressable<ButtonProps>`
  width: 100%;
  height: 50px;
  background-color: ${(props) => btnColors[props.color]};
  border: ${(props) => props.color != 'none' ? 0 : '2px solid ' + colors.greenDark};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => props.isPressed ? 0.8 : 1};
`

export const Text = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`