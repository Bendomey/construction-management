import 'react-native-gesture-handler';
import { Navigator } from './source/navigation'
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Navigator />
    </NativeBaseProvider>
  );
}
