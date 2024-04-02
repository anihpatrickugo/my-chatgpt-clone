import React, { useRef, useState, FC } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, View, TouchableOpacity, FlatList, Alert,} from 'react-native';
import { Stack } from 'expo-router';
import ChatIcon from '@/assets/icons/Chat'
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { white, black, danger } from '@/components/common/variables';
import * as UI from '@/components/common';
import OnboardingData from '@/constants/OnboardingData';

import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '@/redux/slices/authSlices'; // Import the logout action
import { useDispatch } from 'react-redux';
import { supabase } from '@/utils/supabase';

const { width, height } = Dimensions.get('window')

type DashboardScreenProps = {
  navigation: NavigationProp<any>;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {



  const dispatch = useDispatch();

  const handleLogout = async() => {

    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "No",
        onPress: () => {},
        style: "cancel"
      },
      { text: "Yes", onPress: async() => {
        
        const { error } = await supabase.auth.signOut()
        if (!error){
          await AsyncStorage.removeItem("access_token");
          dispatch(logout());
          navigation.navigate("Onboarding");
        }
      
      } }
    ]);
  }

  return (
    <SafeAreaView style={styles.container}>
        {/* header stack */}
        <Stack.Screen
        options={{
        headerShown: false,
        }}
      />

      {/* chat */}
      <View style={{width: "100%", flex: 1}}>

        {/* New chat */}
      <TouchableOpacity style={styles.chatButton} onPress={()=>navigation.navigate("Chat")}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 12}}>
          <ChatIcon width={20} height={20}/>
          <UI.Text size='md'>New Chat</UI.Text>
        </View>
        <FontAwesome6 name="greater-than" size={20} color={white} />
      </TouchableOpacity>


      {/* chat history */}
      <FlatList
         style={{width: "100%"}}
         data={OnboardingData}
         showsVerticalScrollIndicator={false}
         renderItem={(item)=>(
            <TouchableOpacity style={styles.chatButton}>
                <View style={{flexDirection: "row", alignItems: "center", gap: 12}}>
                  <ChatIcon width={20} height={20}/>
                   <UI.Text size='md'>New Chat</UI.Text>
                  </View>
                  <View style={{flexDirection: "row", gap:24,}}>
                     <TouchableOpacity>
                        <Feather name="more-vertical" size={20} color={white} />
                     </TouchableOpacity>
                     <FontAwesome6 name="greater-than" size={20} color={white} />
                  </View>
            </TouchableOpacity>
         )}/>

      </View>
      
      


    {/* footer */}
    <View style={styles.footer}>
     
      <TouchableOpacity style={styles.menuButton}>
       <View style={styles.menuButtonText}>
          <AntDesign name="delete" size={20} color={white} />
          <UI.Text size='md'>Clear conversations</UI.Text>
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.menuButton}>
       <View style={styles.menuButtonText}>
          <Feather name="user" size={20} color={white} />
          <UI.Text size='md'>My Profile</UI.Text>
        </View>

        {/* <UI.Text size='sm' color="#887B06" style={{paddingHorizontal: 10, paddingVertical: 4, borderRadius:12, backgroundColor: "#FBF3AD"}}>NEW</UI.Text> */}
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={()=>navigation.navigate("Developer-Info")}>
       <View style={styles.menuButtonText}>
          <FontAwesome6 name="laptop-code" size={20} color={white} />
          <UI.Text size='md'>Developer Info</UI.Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuButton} onPress={handleLogout}>
       <View style={styles.menuButtonText}>
          <MaterialIcons name="logout" size={20} color={danger} />
          <UI.Text size='md' color={danger}>Logout</UI.Text>
        </View>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight,
    padding: 16,
    backgroundColor: black,
    height: height,
    width: width
  },

  chatButton: {
    width: "100%", 
    marginTop: 8, 
    paddingVertical:8, 
    borderBottomWidth: 0.2, 
    borderBottomColor: white, 
    flexDirection: "row", 
    justifyContent: "space-between",
   },

  footer: { 
    justifyContent: "space-between", 
    width: "100%", 
    paddingVertical: 8, 
    borderTopWidth: 0.2, 
    borderTopColor: white,
 },

  menuButton: {
    width: "100%", 
    marginTop: 8, 
    paddingVertical:8, 
    flexDirection: "row", 
    justifyContent: "space-between",
   },

   menuButtonText: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 12
}

});

export default DashboardScreen;