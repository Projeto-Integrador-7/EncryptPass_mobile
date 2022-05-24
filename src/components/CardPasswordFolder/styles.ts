import styled from "styled-components/native";

import colors from "../../styles/colors";

export const Card = styled.View`
  width: 100%;
  height: 55px;
  background-color: ${colors.grayDark};
  border-radius: 50px;
  align-items: center;
`

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0px 20px;
`

export const Text = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`
