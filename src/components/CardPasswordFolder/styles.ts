import styled from "styled-components/native";

import colors from "../../styles/colors";



export const Card = styled.View`
  width: 100%;
  min-height: 80px;
  background-color: ${colors.grayDark};
  border-radius: 50px;
  align-items: center;
  padding: 20px ;
`

export const HeaderContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

export const BottomContainer = styled.View`
  width: 100%;
  flex-direction:column;
`

export const Container = styled.View`
  flex: 1;
  width: 100%;

  justify-content: space-between;
  flex-direction: column;
  padding: 0px 20px;
`

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`

export const Description = styled.Text`
  color: ${colors.white};
  font-size: 12px;
  text-align: left;
`
