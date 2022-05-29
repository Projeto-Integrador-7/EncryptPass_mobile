import React, { useState } from 'react';
import { GestureResponderEvent } from 'react-native';
import { Modal, Button } from "native-base";
import { ButtonContainer, HeaderText, ModalCloseButton, ModalContent, ModalHeader } from "./styles";

interface CustomModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  onClose: any;
  onPress: ((event: GestureResponderEvent) => void);
}

export function CustomModal({ title, children, isOpen, isLoading, onClose, onPress }: CustomModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      animationPreset="slide"
    >
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          <HeaderText>{title}</HeaderText>
        </ModalHeader>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <ButtonContainer>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={onClose}
              rounded="full"
              paddingLeft={5}
              paddingRight={5}
              _text={{
                color: "error.400"
              }}
            >
              Cancelar
            </Button>
            <Button
              onPress={onPress}
              rounded="full"
              paddingLeft={5}
              paddingRight={5}
              backgroundColor="primary.400"
              isLoading={isLoading}
              isLoadingText="Criando..."
            >
              Criar
            </Button>
          </ButtonContainer>
        </Modal.Footer>
      </ModalContent>
    </Modal>
  )
}