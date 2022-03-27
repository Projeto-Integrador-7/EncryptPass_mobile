import styled from "styled-components/native";

import colors from "../../styles/colors";

interface ButtonProps {
  color: 'green' | 'red' | 'none';
  isPressed: boolean;
  width: string;
}

const btnColors = {
  green: colors.greenDark,
  red: colors.red,
  none: 'transparent'
}

export const Button = styled.Pressable<ButtonProps>`
  width: ${(props) => props.width};
  height: 48px;
  background-color: ${(props) => btnColors[props.color]};
  border: ${(props) => props.color != 'none' ? 0 : '2px solid ' + colors.greenDark};
  border-radius: 50px;
  opacity: ${(props) => props.isPressed ? 0.8 : 1};
`

export const TextButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const Text = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`