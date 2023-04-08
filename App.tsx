import 'react-native-gesture-handler';
import { Navigator } from './source/navigation'
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import store from './source/state';

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  );
}
