import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashboardScreen from "@/screens/dashboard";
import ChatScreen from "@/screens/chat";
import DeveloperScreen from "@/screens/developer";
import ProfileScreen from "@/screens/profile";


const Stack = createNativeStackNavigator();

const MainFlow = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Developer-Info" component={DeveloperScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
     
    </Stack.Navigator>
  );
};

export default MainFlow;