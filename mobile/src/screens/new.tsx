import { Heading, Text, useToast, VStack } from 'native-base';
import { useState } from 'react';

import Logo from '../assets/logo.svg';
import { Button, Header, Input } from '../components';
import { api } from '../services';

export function New() {
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    }

    try {
      setIsLoading(true);

      await api.post('/pools', { title });

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      setTitle('');
    } catch (error) {
      toast.show({
        title: 'Não foi possível criar o bolão',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

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

        <Input
          mb={2}
          placeholder='Qual nome do seu bolão?'
          value={title}
          onChangeText={setTitle}
        />

        <Button
          title='CRIAR MEU BOLÃO'
          isLoading={isLoading}
          onPress={handlePoolCreate}
        />

        <Text color='gray.200' fontSize='sm' textAlign='center' px='10' mt='4'>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
