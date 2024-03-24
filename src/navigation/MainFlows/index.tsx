import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "@/screens/dashboard";
import ChatScreen from "@/screens/chat";


const Stack = createNativeStackNavigator();

const MainFlow = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
     
    </Stack.Navigator>
  );
};

export default MainFlow;