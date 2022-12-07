import { Heading, VStack } from 'native-base';

import { Button, Header, Input } from '../components';

export function Find() {
  return (
    <VStack flex='1' bgColor='gray.900'>
      <Header title='Buscar por código' showBackButton />

      <VStack mt='8' mx='5' alignItems='center'>
        <Heading
          fontFamily='heading'
          fontSize='xl'
          textAlign='center'
          color='white'
          mb='8'
        >
          Encontre um bolão através de seu código único
        </Heading>

        <Input mb={2} placeholder='Qual o código do bolão?' />

        <Button title='BUSCAR BOLÃO' />
      </VStack>
    </VStack>
  );
}
