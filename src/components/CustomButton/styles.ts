import styled from "styled-components/native";

import colors from "../../styles/colors";

interface ButtonProps {
  color: 'green' | 'red' | 'none';
  isPressed: boolean;
  width: string;
  height: string;
  border: boolean;
}

interface TextProps {
  fontSize: string;
}

const btnColors = {
  green: colors.greenDark,
  red: colors.red,
  none: 'transparent'
}

export const Button = styled.Pressable<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => btnColors[props.color]};
  border: ${(props) => props.border ? (props.color != 'none' ? 0 : '2px solid ' + colors.greenDark) : 0};
  border-radius: 50px;
  opacity: ${(props) => props.isPressed ? 0.8 : 1};
`

export const TextButtonContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const Text = styled.Text<TextProps>`
  color: ${colors.white};
  font-weight: bold;
  font-size: ${(props) => props.fontSize};
`