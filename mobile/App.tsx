import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { NativeBaseProvider, StatusBar } from 'native-base';

import { Loading } from './src/components';
import { AuthContextProvider } from './src/contexts';
import { SignIn } from './src/screens';
import { Find } from './src/screens/find';
import { New } from './src/screens/new';
import { THEME } from './src/styles';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />

        {fontsLoaded ? <Find /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
