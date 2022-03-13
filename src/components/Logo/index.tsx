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
      <Image
        style={{ width: keyboardStatus ? 250 : 150, height: keyboardStatus ? 125 : 75 }}
        resizeMode="stretch"
        source={require('../../images/logo-green.png')}
      />
    </ImageContainer>
  )
}