import { useRoute } from '@react-navigation/native';
import { HStack, useToast, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { Share } from 'react-native';

import {
  EmptyMyPoolList,
  Header,
  Loading,
  Option,
  PoolCardProps,
  PoolHeader,
} from '../components';
import { api } from '../services';
import { ShowToastProps } from './find';

interface RouteParams {
  id: string;
}

export function Details() {
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<'guesses' | 'ranking'>(
    'guesses'
  );

  const toast = useToast();
  const route = useRoute();

  const { id } = route.params as RouteParams;

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  function showToast({ title, type = 'error' }: ShowToastProps) {
    toast.show({
      title,
      placement: 'top',
      bgColor: type === 'error' ? 'red.500' : 'green.500',
    });
  }

  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const { data } = await api.get(`/pools/${id}`);

      setPoolDetails(data.pool);
    } catch (error) {
      showToast({
        title: 'Não foi possível carregar os detalhes do bolão',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <VStack flex='1' bgColor='gray.900'>
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />

      {poolDetails._count?.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={poolDetails} />

          <HStack p={1} rounded='sm' mb={5} bgColor='gray.800'>
            <Option
              title='Seus palpites'
              isSelected={selectedOption === 'guesses'}
              onPress={() => setSelectedOption('guesses')}
            />

            <Option
              title='Ranking do grupo'
              isSelected={selectedOption === 'ranking'}
              onPress={() => setSelectedOption('ranking')}
            />
          </HStack>
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} />
      )}
    </VStack>
  );
}
