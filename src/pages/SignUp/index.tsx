import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Icon, Stack, useToast } from "native-base";
import { StackNavigationProp } from "@react-navigation/stack";
import { Controller, useForm } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";

import { CustomInput } from "../../components/CustomInput";
import { CustomButton } from "../../components/CustomButton";
import { CustomToast } from "../../components/CustomToast";

import { ScrollView, StepperContainer, Stepper, StepperText, Container, FormContainer, ButtonContainer } from "./styles"

import { RootStackParamList } from "../../models/rootStackParamList";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

type SignUpProps = StackNavigationProp<RootStackParamList, 'SignUp'>;

type FormData = {
  name: string;
  email: string;
  password: string;
  password_repeat: string;
  phoneNumber: string;
  passwordReminder: boolean;
  passwordReminderTip: string;
};

export default function SignUp() {
  const navigation = useNavigation<SignUpProps>();
  const api = useAxiosPrivate();
  const toast = useToast();

  const [step, setStep] = useState(0);
  const [onCreating, setOnCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const { control, handleSubmit, reset, watch, trigger, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      password_repeat: '',
      phoneNumber: '',
      passwordReminder: false,
      passwordReminderTip: ''
    }
  })

  useEffect(() => {
    const unsubscribe = () => { };

    return unsubscribe;
  }, [navigation])

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function handleShowPasswordRepeat() {
    setShowPasswordRepeat(!showPasswordRepeat)
  }

  function handleNextStep() {
    setStep(step + 1);
  }

  function handleBackStep() {
    setStep(step - 1);
  }
  
  async function handleNext() {
    let isValid = false;

    switch (step) {
      case 0:
        isValid = await trigger(['name', 'email']);
        break;
      case 1:
        isValid = await trigger(['password', 'password_repeat']);
        break;
    }

    if (isValid) {
      handleNextStep();
    }
  }

  const onSubmit = async (data: FormData) => {
    setOnCreating(true);

    let passwordReminder = data.passwordReminderTip ? true : false

    try {
      const response = await api.post('user/create', {
        name: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        passwordReminder,
        passwordReminderTip: data.passwordReminder
      });

      toast.show({
        render: () => {
          return (
            <CustomToast
              type="success"
              description="Sua conta foi criada com sucesso"
            />
          )
        }
      });
      reset();
      navigation.navigate('SignIn');
    } catch (res: any) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              type="error"
              description={res.response.data.Erro}
            />
          )
        }
      });
    }
    setOnCreating(false);
  };

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
            {step == 0 &&
               <Stack space={2} width="100%">
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      defaultValue={value}
                      placeholder="Nome completo *"
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      isInvalid={Boolean(errors.name)}
                      errorText={errors.name?.message}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Informe um nome'
                    },
                    minLength: {
                      value: 3,
                      message: "O nome deve conter no mínimo 3 caracteres"
                    }
                  }}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="E-mail *"
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      isInvalid={Boolean(errors.email)}
                      errorText={errors.email?.message}
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Informe um e-mail'
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "E-mail inválido"
                    }
                  }}
                />

                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Telefone (Opcional)"
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      isInvalid={Boolean(errors.phoneNumber)}
                      errorText={errors.phoneNumber?.message}
                    />
                  )}
                  rules={{
                    required: false,
                    pattern: {
                      value: /[0-9]{11}/,
                      message: "Telefone inválido"
                    }
                  }}
                />
              </Stack>
            }
            {step === 1 &&
               <Stack space={2} width="100%">
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Senha master *"
                      type={showPassword ? "text" : "password"}
                      value={value}
                      onChangeText={onChange}
                      isInvalid={Boolean(errors.password)}
                      errorText={errors.password?.message}
                      InputRightElement={<Icon
                        as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />}
                        size={5}
                        mr="5"
                        onPress={() => handleShowPassword()}
                      />
                      }
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Informe uma senha'
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      message: "A senha deve conter pelo menos: 1 letra maíuscula, 1 letra minuscula e 1 caractere especial."
                    }
                  }}
                />

                <Controller
                  name="password_repeat"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Repita a senha master *"
                      type={showPasswordRepeat ? "text" : "password"}
                      value={value}
                      onChangeText={onChange}
                      isInvalid={Boolean(errors.password_repeat)}
                      errorText={errors.password_repeat?.message}
                      InputRightElement={<Icon
                        as={<MaterialIcons name={showPasswordRepeat ? "visibility" : "visibility-off"} />}
                        size={5}
                        mr="5"
                        onPress={() => handleShowPasswordRepeat()}
                      />
                      }
                    />
                  )}
                  rules={{
                    required: {
                      value: true,
                      message: 'Confirme sua senha'
                    },
                    validate: value => value === watch('password') || "Senha Master não confere"
                  }}
                />

                <Controller
                  name="passwordReminderTip"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomInput
                      placeholder="Dica de senha (Opcional)"
                      type="text"
                      value={value}
                      onChangeText={onChange}
                      isInvalid={Boolean(errors.passwordReminderTip)}
                      errorText={errors.passwordReminderTip?.message}
                    />
                  )}
                  rules={{
                    required: false
                  }}
                />
              </Stack>
            }
        </FormContainer>
        <ButtonContainer>
          <Stack space={4} width="100%">
            <CustomButton
              title={step > 0 ? "Cadastrar" : "Avançar"}
              color="green"
              onPress={step > 0 ? handleSubmit(onSubmit) : handleNext}
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