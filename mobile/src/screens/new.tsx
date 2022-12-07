import { Heading, Text, VStack } from 'native-base';

import Logo from '../assets/logo.svg';
import { Button, Header, Input } from '../components';

export function New() {
  return (
    <VStack flex='1' bgColor='gray.900'>
      <Header title='Criar novo bolão' />

      <VStack mt='8' mx='5' alignItems='center'>
        <Logo />

        <Heading
          fontFamily='heading'
          fontSize='xl'
          textAlign='center'
          color='white'
          my='8'
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input mb={2} placeholder='Qual nome do seu bolão?' />

        <Button title='CRIAR MEU BOLÃO' />

        <Text color='gray.200' fontSize='sm' textAlign='center' px='10' mt='4'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
