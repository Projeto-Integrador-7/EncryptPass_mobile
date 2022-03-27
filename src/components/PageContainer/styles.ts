import styled from "styled-components/native";

import colors from "../../styles/colors";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${colors.gray};
  border-radius: 31px;
  padding: 20px 25px;
  margin-top: 40px;
  margin-bottom: 90px;
`

export const TextContainer = styled.View`
  margin-bottom: 20px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #FFFFFF;
`
