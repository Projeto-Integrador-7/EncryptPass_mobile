import React, { useState } from "react";
import { FormControl, Stack, Icon } from "native-base";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";

import { RootStackParamList } from "../../models/rootStackParamList";

import { ButtonContainer } from "./styles";

type CreateFolderProps = StackNavigationProp<RootStackParamList, 'CreateFolder'>;

export default function CreateFolderPassword() {
  const navigation = useNavigation<CreateFolderProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'CreateFolderPassword'>>();

  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <PageContainer>
      <PageBody
        title={`Criando senha em ${route.params.title}`}
        onPress={() => navigation.navigate('Credentials', { _id: route.params._id, title: route.params.title })}
        back={true}
      >
        <FormControl>
          <Stack space={4} width="100%">
            <CustomInput
              placeholder="Título"
              type="text"
            />

            <CustomInput
              placeholder="Usuário"
              type="text"
            />

            <CustomInput
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              InputRightElement={<Icon
                as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                size={5}
                mr="5"
                onPress={() => handleShowPassword()}
              />
              }
            />

            <Stack>
              <CustomInput
                placeholder="URL (Opcional)"
                type="text"
              />

              <FormControl.HelperText>
                Exemplo: https://unipam.edu.br
              </FormControl.HelperText>
            </Stack>
          </Stack>
        </FormControl>
        <ButtonContainer>
          <CustomButton
            title="Adicionar"
            color="green"
          //onPress={handleSignIn}
          />
        </ButtonContainer>
      </PageBody>
    </PageContainer>
  )
}