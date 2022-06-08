import styled from "styled-components/native";

import colors from "../../styles/colors";

interface CardProps {
  color: 'gray' | 'red';
}

const cardColors = {
  red: colors.red,
  gray: colors.grayDark
}

export const Card = styled.View<CardProps>`
  width: 100%;
  min-height: 55px;
  background-color: ${(props) => cardColors[props.color]};
  border-radius: 50px;
  align-items: center;
  padding: 15px;
`

export const Container = styled.View`
  flex: 1;
  width: 100%;

  justify-content: flex-start;
  flex-direction: row;
  padding: 0px 10px;
`

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`