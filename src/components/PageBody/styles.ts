import styled from "styled-components/native";

import colors from "../../styles/colors";

interface ContainerProps {
  marginBottom: string;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${colors.gray};
  border-radius: 31px;
  padding: 20px 20px;
  margin-top: 30px;
  margin-bottom: ${(props) => props.marginBottom};
`

export const TextContainer = styled.View`
  margin-bottom: 35px;
`

export const Title = styled.Text`
  font-size: 24px;
  color: #FFFFFF;
`

export const TitleAndBackBtn = styled.View`
  flex-direction: row;
  align-items: center;
`
