import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

interface ButtonProps extends IButtonProps {
  title: string;
  type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type, ...props }: ButtonProps) {
  return (
    <NativeBaseButton
      w='full'
      h={14}
      rounded='sm'
      fontSize='md'
      textTransform='uppercase'
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.400' : 'yellow.600',
      }}
      {...props}
    >
      <Text
        fontSize='sm'
        fontFamily='heading'
        color={type === 'SECONDARY' ? 'white' : 'black'}
      >
        {title}
      </Text>
    </NativeBaseButton>
  );
}
