import { Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import { useEffect, useState } from 'react';

import {
  Button,
  EmptyPoolList,
  Header,
  Loading,
  PoolCard,
  PoolCardProps,
} from '../components';
import { api } from '../services';

export function Pools() {
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();
  const toast = useToast();

  async function fetchPools() {
    try {
      setIsLoading(true);

      const { data } = await api.get('/pools');

      setPools(data.pools);
    } catch (error) {
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPools();
  }, []);

  return (
    <VStack flex='1' bgColor='gray.900'>
      <Header title='Meus bolões' />

      <VStack
        mt='6'
        mx='5'
        borderBottomWidth='1'
        borderBottomColor='gray.600'
        pb='4'
        mb='4'
      >
        <Button
          title='BUSCAR BOLÃO POR CÓDIGO'
          leftIcon={
            <Icon as={Octicons} name='search' color='black' size='md' />
          }
          onPress={() => navigation.navigate('find')}
        />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pools}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <PoolCard data={item} />}
          ListEmptyComponent={<EmptyPoolList />}
          showsVerticalScrollIndicator={false}
          px={5}
          _contentContainerStyle={{
            pb: 82,
          }}
        />
      )}
    </VStack>
  );
}
