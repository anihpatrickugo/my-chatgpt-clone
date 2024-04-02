import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationFlows from "../src/navigation";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationFlows />
      </GestureHandlerRootView>
    </Provider>
  );
}
