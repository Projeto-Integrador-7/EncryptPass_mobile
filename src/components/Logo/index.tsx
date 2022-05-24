import React from 'react';

import { useEffect, useState } from 'react';
import { Image, Keyboard } from 'react-native';
import { ImageContainer } from './styles';

export function Logo() {
  const [keyboardStatus, setKeyboardStatus] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(false);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <ImageContainer>
      {keyboardStatus &&
        <Image
        style={{ width: 250, height: 125 }}
        resizeMode="stretch"
        source={require('../../images/logo-green.png')}
      />
      }
    </ImageContainer>
  )
}