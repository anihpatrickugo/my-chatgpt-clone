import React, { useRef, useState, FC } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, View, Pressable, FlatList,} from 'react-native';
import { router, Stack } from 'expo-router';
import ChatgptIcon from '@/assets/icons/Chatgpt'
import { FontAwesome6 } from '@expo/vector-icons';
import SendIcon from '@/assets/icons/Send'


import { white, primaryColor, black, danger, grey } from '@/components/common/variables';
import * as UI from '@/components/common';
import OnboardingData from '@/constants/OnboardingData';


const { width, height } = Dimensions.get('window')


const ChatScreen = () => {

    const [text, setText] = useState("")

  return (
    <SafeAreaView style={styles.container}>
        {/* header stack */}
        <Stack.Screen
        options={{
        headerShown: false,
        }}
      />

      {/* header */}
      <Pressable style={styles.headerButton}>
       <View style={{flexDirection: "row", alignItems: "center", gap: 12}}>
          <FontAwesome6 name="less-than" size={20} color={white} />
          <UI.Text size='md'>Back</UI.Text>
        </View>
        <ChatgptIcon width={25} height={25}/>
      </Pressable>


      {/* chat history */}
      <View style={styles.chatContainner}>

        { OnboardingData ? (
           <FlatList
           style={{width: "100%"}}
           data={OnboardingData}
           showsVerticalScrollIndicator={false}
           renderItem={(value)=>(
              <View style={[styles.chatItem, {justifyContent: (value.item.id === "2") ? "flex-end": "flex-start"}]}>
                    <View style={[ styles.textContainner, (value.item.id === "2") ? {backgroundColor: primaryColor, borderBottomRightRadius: 0} : {backgroundColor: "rgba(255, 255, 255, 0.2);", borderBottomLeftRadius: 0}]}>
                       <UI.Text size='sm' color='white' style={{width: '100%' }}>{value.item.text1}</UI.Text>
                    </View>
              </View>
           )}/>
        ) : (
             <UI.Text size='md' color="rgba(255, 255, 255, 0.4);">Ask anything, get yout answer</UI.Text>
        )}

      </View>


    {/* Textinput */}
    <UI.TextInput placeholder="Type a message" value={text} selectTextOnFocus editable keyboardType="default" multiline onChangeText={setText} >
        <Pressable style={styles.sendButton}>
          <SendIcon width={20} height={20}/>
        </Pressable>
    </UI.TextInput>
 
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
    backgroundColor: grey,
    height: height,
    width: width
  },

  headerButton: {
    width: "100%", 
    marginTop: 8, 
    paddingVertical:8, 
    borderBottomWidth: 0.2, 
    borderBottomColor: white, 
    flexDirection: "row", 
    justifyContent: "space-between",
   },

  chatContainner: {
    width: "100%", 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
},

  chatItem: {
    width: "100%", 
    marginTop: 4, 
    paddingVertical:8, 
    flexDirection: "row", 
   },

   textContainner: {
    width:"80%", 
    padding: 8,
    borderRadius: 8,
   },  


   sendButton: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 3
   }

});

export default ChatScreen;