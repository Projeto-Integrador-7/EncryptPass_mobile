import styled from "styled-components/native";

import { Skeleton } from "native-base";
import colors from "../../styles/colors";

export const CardPasswordFolder = styled(Skeleton).attrs({
  startColor: colors.grayLight
})`
  width: 100%;
  height: 80px;
  border-radius: 50px;
`

export const CardPassword = styled(Skeleton).attrs({
  startColor: colors.grayLight
})`
  width: 100%;
  height: 200px;
  border-radius: 50px;
`

