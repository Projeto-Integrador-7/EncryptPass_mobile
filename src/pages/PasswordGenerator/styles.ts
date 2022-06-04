import { Checkbox } from "native-base";
import styled from "styled-components/native";

import colors from "../../styles/colors";

interface TitleProps {
  align: 'left' | 'right' | 'center' | 'justify';
}

export const SlideContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-top: 5px;
  margin-bottom: 10px;
`
export const Text = styled.Text<TitleProps>`
  font-size: 16px;
  color: ${colors.white};
  text-align: ${(props) => props.align};
`

export const PasswordSize = styled.View`
  width: 15%;
  height: 24px;
  background-color: ${colors.grayDark};
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const CheckboxContainer = styled.View`
  margin-top: 15px;
  margin-bottom: 10px;
`

export const CheckB = styled(Checkbox).attrs({
  _icon: {
    color: colors.white
  },
  size: "md"
})``

export const ButtonContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 20px;
`

export const PasswordField = styled.View`
  width: 100%;
  min-height: 65px;
  background: ${colors.grayDark};
  padding: 15px 20px;
  border-radius: 50px;

  margin-top: 10px;
`