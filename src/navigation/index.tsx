import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingFlow from "./OnboardingFlow";
import MainFlow from "./MainFlows";


const NavigationFlows = () => {
    const auth = false;

  return (
    <NavigationContainer independent >
      {auth ? <MainFlow /> : <OnboardingFlow />}
    </NavigationContainer>
  );
};


export default NavigationFlows;