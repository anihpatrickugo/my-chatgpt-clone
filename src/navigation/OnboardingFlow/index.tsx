import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "@/screens/onboarding";


const Stack = createNativeStackNavigator();

const OnboardingFlow = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Index" component={OnboardingScreen} />
     
    </Stack.Navigator>
  );
};

export default OnboardingFlow;