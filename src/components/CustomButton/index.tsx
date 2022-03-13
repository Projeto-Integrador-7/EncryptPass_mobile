import { useState } from 'react';
import { Button, Text } from './styles';

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  color: 'green' | 'red' | 'none';
}

export function CustomButton({ color, title, onPress, ...props } : CustomButtonProps){
  const [isPressed, setIsPressed] = useState<boolean>(false);
  
  function onPressIn(){
    setIsPressed(true);
  }

  function onPressOut(){
    setIsPressed(false);
  }

  return(
    <Button 
      color={color}
      onPress={onPress}
      isPressed={isPressed} 
      onPressIn={onPressIn} 
      onPressOut={onPressOut}
      {...props}
    >
      <Text>{title}</Text>
    </Button>
  )
}