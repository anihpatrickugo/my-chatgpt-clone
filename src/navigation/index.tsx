import React, { useEffect, useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingFlow from "./OnboardingFlow";
import MainFlow from "./MainFlows";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "@/utils/supabase";

import { useSelector, useDispatch } from "react-redux";



const NavigationFlows = () => {
    let token = useSelector((state: any) => state.auth.token)
    let user = useSelector((state: any) => state.auth.user);

    // console.log(token)

  

    useEffect(() => {
      const fetchData = async () => {
        const tokenData = await AsyncStorage.getItem("access_token");
        const userData = await AsyncStorage.getItem("user");

        if (tokenData && userData) {
          token = tokenData;
          user = userData;  
        }
        token = null;
      };
      fetchData();
      // console.log(token)
    }, [token, user]);

  return (
  
      <NavigationContainer independent >
        {user ||  token ? <MainFlow /> : <OnboardingFlow />}
      </NavigationContainer>
    
  );
};


export default NavigationFlows;