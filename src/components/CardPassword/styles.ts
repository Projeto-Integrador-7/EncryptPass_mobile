import styled from "styled-components/native";

import colors from "../../styles/colors";

export const Card = styled.View`
  width: 100%;
  min-height: 200px;
  background-color: ${colors.grayDark};
  border-radius: 50px;
  padding: 20px;
`

export const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px 20px;
`

export const HeaderContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  flex-direction: row;
`

export const IconBackground = styled.View`
  background-color: ${colors.white};
  padding: 5px;
  border-radius: 50px;
  margin-right: 12px;
`

export const Favicon = styled.Image`
  width: 25px;
  height: 25px;
`

export const CredentialsContainer = styled.View`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: column;
  padding: 10px 20px;
`

export const Text = styled.Text`
  color: ${colors.white};
  font-size: 16px;
`

export const CredentialsText = styled.Text`
  color: ${colors.white};
  font-size: 12px;
`