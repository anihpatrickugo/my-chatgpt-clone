import { GestureHandlerRootView } from "react-native-gesture-handler";
import NavigationFlows from "../src/navigation";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationFlows />
    </GestureHandlerRootView>
  );
}
