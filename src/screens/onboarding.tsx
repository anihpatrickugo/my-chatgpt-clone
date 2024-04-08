
import React, { useRef, useState, FC, useEffect } from 'react';
import Animated, { BounceIn,BounceOut, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, View, Text, FlatList, Alert } from 'react-native';



import {GoogleSignin} from '@react-native-google-signin/google-signin'
import { supabase } from '@/utils/supabase'
import LogoIcon from '@/assets/icons/Logo';
import onboardingData  from '@/constants/OnboardingData';
import OnboardingItem from '@/components/main/OnboardingItem';
import { grey, primaryColor } from '@/components/common/variables';
import * as UI from '@/components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "@/redux/slices/authSlices";



export default function OnboardingScreen({navigation}: {navigation: any}) {
  const [error, setError] = useState<any>(null);

  const dispatch = useDispatch()
  

  // google auth
 
   const configureGoogleSignIn =  () => {
     GoogleSignin.configure({
      webClientId: process.env.GOOGLE_EXPO_CLIENT_ID,
      androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    });
   }
    

  useEffect(()=>{
    configureGoogleSignIn()
   }, [])

  // flatlist functions
  const [currentIndex, setCurrentIndex] = useState(1);
  let flatListRef = useRef<any>();
  const translateX = useSharedValue(0);

  const viewConfigRef = {viewAreaCoveragePercentThreshold: 100}

  const onViewRef = useRef(({changed} : {changed: any})=>{
    if (changed[0].isViewable){
      setCurrentIndex(changed[0].index)
    }
  })

  const { width } = Dimensions.get('window')
  const ITEM_WIDTH = width;

  const handlePress = async () => {
    

    if (currentIndex === 2) {
      //prompt google
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        
        if (userInfo.idToken) {
          const { data } = await supabase.auth.signInWithIdToken({provider: 'google', token: userInfo.idToken})
          
          try {
            const jsonValue = JSON.stringify(userInfo.idToken)
            await AsyncStorage.setItem('access_token', jsonValue)
          } catch (e) {
            console.log(e)
          }
          // set the user in the redux store
          // dispatch(login({ payload: data?.user || {}, token: userInfo.idToken }))
          dispatch(login({ payload: userInfo.user || {}, token: userInfo.idToken }))
          navigation.replace('/Dashoard')
        } else {
          setError({message: 'Google token not found'})
        }
        setError(null)
      } catch (error) {
        setError(error);
      }
      
    } else {
      flatListRef.current.scrollToIndex({index: currentIndex + 1})
    }
  };

  if (error) {
    Alert.alert('Error', error.message)
  }

  return (
    <SafeAreaView style={styles.container}>
       {/* tittle */}
      <Animated.View style={{width: '100%',alignItems: 'center'}} entering={BounceIn.delay(100)} exiting={BounceOut.duration(100)}>
         <View style={styles.logoIcon}>
           <LogoIcon height={30} width={30}/>
         </View>
         <UI.Text style={{width: '80%', textAlign: 'center'}} size='xl' bold>Welcome to ChatGPT</UI.Text>
         <UI.Text style={{ textAlign: 'center', marginVertical: 10}} size='md'>Ask anything, get yout answer</UI.Text>
      </Animated.View>

      {/* flatlist items */}
      <View>
        <Animated.FlatList
        ref={(ref)=>{flatListRef.current = ref}}
        data={onboardingData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          translateX.value = nativeEvent.contentOffset.x;
        }}
        onScrollEndDrag={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / ITEM_WIDTH);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => <OnboardingItem item={item}/>}
        viewabilityConfig={viewConfigRef}
        onViewableItemsChanged={onViewRef.current}
        
        />
      </View>
 
      
      {/* button and indication bar */}
      <View style={{width: '100%', position: 'absolute', bottom: 12}}>

         {/* flatlist  counter items  */}
         <View style={styles.animationContainner}>
           {onboardingData.map(({}, index:number) => <Text key={index} style={[styles.animationItem, {backgroundColor: index ===  currentIndex ? primaryColor: 'rgba(255, 255, 255, 0.08)'}]}> </Text>)}
         </View>

        {/* button */}
        <UI.Button variant='coloured' onPress={handlePress}>
            {currentIndex === 2 ? "Let’s Chat" : "Next"}
        </UI.Button>
      </View>
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
    padding: 16,
    backgroundColor: grey
  },

  logoIcon: {
    marginVertical: 18,
    alignItems: "center"
  },

  animationContainner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    gap: 12
  
  },

  animationItem: {
    lineHeight: 4,
    borderRadius: 2,
    marginHorizontal: 2,
    paddingHorizontal: 20
  },

});
