import { useNavigation } from '@react-navigation/native';
import { Heading, useToast, VStack } from 'native-base';
import { useState } from 'react';

import { Button, Header, Input } from '../components';
import { api } from '../services';

enum Errors {
  'Pool not found' = 'Bolão não encontrado!',
  'You already joined this pool' = 'Você já está nesse bolão',
}

interface ShowToastProps {
  title: string;
  type?: 'success' | 'error';
}

export function Find() {
  const [code, setCode] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const navigation = useNavigation();

  function showToast({ title, type = 'error' }: ShowToastProps) {
    toast.show({
      title,
      placement: 'top',
      bgColor: type === 'error' ? 'red.500' : 'green.500',
    });
  }

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return showToast({
          title: 'Informe o código',
        });
      }

      await api.post('/pools/join', { code });

      showToast({
        title: 'Você entrou no bolão com sucesso',
        type: 'success',
      });

      navigation.navigate('pools');
    } catch (error) {
      setIsLoading(false);

      const errorMessage: string = error.response?.data?.message;

      if (errorMessage) {
        return showToast({
          title: Errors[errorMessage],
        });
      }

      showToast({
        title: 'Não foi possível encontrar o bolão',
      });
    }
  }

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

        <Input
          mb={2}
          placeholder='Qual o código do bolão?'
          autoCapitalize='characters'
          value={code}
          onChangeText={setCode}
        />

        <Button
          title='BUSCAR BOLÃO'
          isLoading={isLoading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
