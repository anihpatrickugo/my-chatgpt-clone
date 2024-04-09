import React, { useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingFlow from "./OnboardingFlow";
import MainFlow from "./MainFlows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase";

import { useSelector, useDispatch } from "react-redux";



const NavigationFlows = () => {
    let token = useSelector((state: any) => state.auth.token)
    let user = useSelector((state: any) => state.auth.user);

  

    useLayoutEffect(() => {
      const fetchData = async () => {
        const data = await AsyncStorage.getItem("access_token");
        if (data) {
          token = data;
          console.log(token)
          
        }
        token = null;
      };
      fetchData();
    }, [token]);

  return (
  
      <NavigationContainer independent >
        {user || token ? <MainFlow /> : <OnboardingFlow />}
      </NavigationContainer>
    
  );
};


export default NavigationFlows;