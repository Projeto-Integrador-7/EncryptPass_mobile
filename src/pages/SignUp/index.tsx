import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Stack } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";

import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";

import { ScrollView, StepperContainer, Stepper, StepperText, Container, FormContainer, ButtonContainer } from "./styles"

import { RootStackParamList } from "../../models/rootStackParamList";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

type SignUpProps = StackNavigationProp<RootStackParamList, 'SignUp'>;

export default function SignUp() {
  const navigation = useNavigation<SignUpProps>();
  const api = useAxiosPrivate();

  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordReminder, setPasswordReminder] = useState<Boolean>();
  const [passwordReminderTip, setPasswordRemindeTip] = useState('')

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleNextStep() {
    setStep(step + 1);
  }

  function handleBackStep() {
    setStep(step - 1);
  }

  async function handleCreateAccount() {
    try {
      setPasswordReminder(passwordReminderTip !== null ? true : false);

      const response = api.post('user/create', {
        name,
        email,
        password,
        phoneNumber,
        passwordReminder,
        passwordReminderTip
      })

      navigation.navigate('SignIn');

    } catch (e) {

    }
  }

  return (
    <ScrollView>
      <Container>
        <StepperContainer>
          <Stack space={2} width="100%">
            <Stepper>Passo {step + 1} de 2</Stepper>
            <StepperText>
              {step === 0 && 'Informações pessoais'}
              {step === 1 && 'Configuração de senha'}
            </StepperText>
          </Stack>
        </StepperContainer>
        <FormContainer>
          <Stack space={4} width="100%">
            {step == 0 &&
              <>
                <CustomInput
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                />
                <CustomInput
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                />
                <CustomInput
                  placeholder="Telefone (Opcional)"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </>
            }
            {step === 1 &&
              <>
                <CustomInput
                  placeholder="Senha Master"
                  secureTextEntry={showPassword ? false : true}
                  value={password}
                  onChangeText={setPassword}
                />
                <CustomInput
                  placeholder="Repita a Senha Master"
                  secureTextEntry={showPassword ? false : true}
                />
                <CustomInput
                  placeholder="Dica de Senha (Opcional)"
                  value={passwordReminderTip}
                  onChangeText={setPasswordRemindeTip}
                />
              </>
            }
          </Stack>
        </FormContainer>
        <ButtonContainer>
          <Stack space={4} width="100%">
            <CustomButton
              title={step > 0 ? "Cadastrar" : "Avançar"}
              color="green"
              onPress={step > 0 ? handleCreateAccount : handleNextStep}
            />
            <CustomButton
              title={step < 1 ? "Cancelar" : "Voltar"}
              color="none"
              noBorder={true}
              onPress={step < 1 ? () => navigation.navigate('Welcome') : handleBackStep}
            />
          </Stack>
        </ButtonContainer>
      </Container>
    </ScrollView>
  )
}