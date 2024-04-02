import React, { useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingFlow from "./OnboardingFlow";
import MainFlow from "./MainFlows";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useSelector } from "react-redux";


const NavigationFlows = () => {
    let token = useSelector((state: any) => state.auth.token)
    const user = useSelector((state: any) => state.auth.user);

    useLayoutEffect(() => {
      const fetchData = async () => {
        const data = await AsyncStorage.getItem("access_token");
        if (data) {
          token = data;
        }
        token = null;
      };
      fetchData();
    }, []);

  return (
  
      <NavigationContainer independent >
        {user || token ? <MainFlow /> : <OnboardingFlow />}
      </NavigationContainer>
    
  );
};


export default NavigationFlows;