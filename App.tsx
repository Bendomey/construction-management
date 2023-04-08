import 'react-native-gesture-handler';
import { Navigator } from './source/navigation'
import { Box, Center, NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './source/state';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  );
}

const Loader = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Center pt={50}>
          <ActivityIndicator />
        </Center>
      </View>
    </SafeAreaView>
  )
}
