import styled from "styled-components/native";

import colors from "../../styles/colors";

export const Card = styled.View`
  width: 100%;
  height: 70px;
  background-color: ${colors.grayDark};
  border-radius: 50px;
  padding: 10px 25px;
`

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

export const Text = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`
