import React, { useEffect, useState } from "react";
import { Slider, Stack, useClipboard, useToast } from "native-base";

import { PageBody } from "../../components/PageBody";
import { PageContainer } from "../../components/PageContainer";
import { CheckB, CheckboxContainer, PasswordField, PasswordSize, SlideContainer, Text } from "./styles";
import { CustomButton } from "../../components/CustomButton";
import { CustomToast } from "../../components/CustomToast";

export default function PasswordGenerator() {
  const { onCopy } = useClipboard();
  const toast = useToast();

  const [sliderValue, setSliderValue] = useState(8);
  const [upperEnabled, setUpperEnabled] = useState(true);
  const [lowerEnabled, setLowerEnabled] = useState(true);
  const [numbersEnabled, setNumbersEnabled] = useState(true);
  const [symbolsEnabled, setSymbolsEnabled] = useState(true);
  const [password, setPassword] = useState('');

  useEffect(() => {
    generatePassword()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      generatePassword()
    }, 200)
  }, [sliderValue, upperEnabled, lowerEnabled, numbersEnabled, symbolsEnabled])

  function upperLetters() {
    let upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return upper[Math.floor(Math.random() * upper.length)];
  }

  function lowerLetters() {
    let lower = "abcdefghijklmnopqrstuvwxyz"
    return lower[Math.floor(Math.random() * lower.length)];
  }

  function numbers() {
    let numbers = "0123456789"
    return numbers[Math.floor(Math.random() * numbers.length)];
  }

  function symbols() {
    let symbols = "!@#$%&*()_+"
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  function generatePassword() {
    let password = [];

    let finalPassword = "";

    if (upperEnabled || lowerEnabled || numbersEnabled || symbolsEnabled) {
      for (let i = 0; i < sliderValue; i++) {
        if (upperEnabled) {
          password.push(upperLetters());
        }

        if (lowerEnabled) {
          password.push(lowerLetters());
        }

        if (numbersEnabled) {
          password.push(numbers());
        }

        if (symbolsEnabled) {
          password.push(symbols());
        }

        finalPassword += password[Math.floor(Math.random() * password.length)]
      }
      setPassword(finalPassword)
    } else {
      setPassword('')
    }
  }

  return (
    <PageContainer>
      <PageBody title="Gerador de Senhas">
        <Text align="left">Tamanho de caracteres da senha</Text>
        <SlideContainer>
          <Slider
            width="85%"
            defaultValue={sliderValue}
            minValue={4}
            maxValue={50}
            paddingRight={2}
            onChange={value => {
              let sliderTimeoutId;
              clearTimeout(sliderTimeoutId)
              sliderTimeoutId = setTimeout(() => {
                setSliderValue(value)
              }, 100)
            }}
          >
            <Slider.Track>
              <Slider.FilledTrack bgColor="primary.400" />
            </Slider.Track>
            <Slider.Thumb bgColor="primary.400" />
          </Slider>
          <PasswordSize>
            <Text align="center">{sliderValue}</Text>
          </PasswordSize>
        </SlideContainer>
        <Text align="left">Configuração da Senha</Text>
        <CheckboxContainer>
          <Stack space={2}>
            <CheckB
              value="Upper"
              isChecked={upperEnabled}
              onChange={setUpperEnabled}
            >
              Letra maiúscula
            </CheckB>
            <CheckB
              value="Lower"
              isChecked={lowerEnabled}
              onChange={setLowerEnabled}
            >
              Letra minuscula
            </CheckB>
            <CheckB
              value="Numbers"
              isChecked={numbersEnabled}
              onChange={setNumbersEnabled}
            >
              Números
            </CheckB>
            <CheckB
              value="Symbols"
              isChecked={symbolsEnabled}
              onChange={setSymbolsEnabled}
            >
              Símbolos
            </CheckB>
          </Stack>
        </CheckboxContainer>
        <PasswordField>
          <Text align="left">{password.length !== 0 ? password : 'Selecione uma opção em configuração de senha.'}</Text>
        </PasswordField>
        {password.length !== 0 &&
          <CustomButton
            title="Copiar Senha"
            color="none"
            onPress={() => {
              onCopy(password)
              toast.show({
                render: () => {
                  return (
                    <CustomToast
                      type="success"
                      description="Senha copiada"
                    />
                  )
                }
              });
            }}
            noBorder={true}
          />
        }
      </PageBody>
    </PageContainer>
  )
}