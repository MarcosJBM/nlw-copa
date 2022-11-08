import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from './src/components';
import { SignIn } from './src/screens';
import { THEME } from './src/styles';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />

      {fontsLoaded ? <SignIn /> : <Loading />}
    </NativeBaseProvider>
  );
}
