import React, { useRef, useState, FC, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, Keyboard, TouchableOpacity, StyleSheet, StatusBar, Dimensions, View, Pressable, FlatList, Alert, KeyboardAvoidingView,} from 'react-native';
import { router, Stack } from 'expo-router';
import ChatgptIcon from '@/assets/icons/Chatgpt'
import { FontAwesome6 } from '@expo/vector-icons';
import SendIcon from '@/assets/icons/Send'


import { white, primaryColor,grey } from '@/components/common/variables';
import * as UI from '@/components/common';
import OnboardingData from '@/constants/OnboardingData';
import { useSelector, useDispatch } from 'react-redux';

import { askGemini } from '@/utils/askGemini';
import { ChatProps, HistoryProp, addChat } from '@/redux/slices/chatSlices';





const { width, height } = Dimensions.get('window')



const ChatScreen = ({navigation}: any) => {
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")
 
  const flatlistRef = useRef<FlatList>(null)

  const chat = useSelector((state: {chat: HistoryProp}) => state.chat)

  // by initializing the history ref with a copy of the chat redux store, history will always be in syc
  // and bot will always remember previous conversations even if you leave the the chat screen.
  let history = useRef<HistoryProp>([...chat]).current

  const dispatch = useDispatch()


  const handleSend = async() => {
      // dispatch to the chat store must be called first
      dispatch(addChat({role: "user", text: text}))
      

      // set loading to true
      setLoading(true)
  

      if (text !== "") {
        const newObj: ChatProps = {role: "user", parts: [{text: text}]}

        // get the text from the input and quickly clear it out of the text input
        const question = text
        setText("")

         // dismiss the keyboard and scroll to the end of the flatlist
         Keyboard.dismiss()

         const data = await askGemini(question, history)


        // only push to the history ref after asking the model
        history.push(newObj)
        
        
        // check if there isnt an error and data is not empty
        if (!data.includes("error") && (data?.trim()?.length || 0 ) > 0 ) {
          const objModel: ChatProps = {role: "model", parts: [{text: data}]} 
          history.push(objModel)
          dispatch(addChat({role: "model", text: data}))
          
          }
        }else{
          Alert.alert("Error", "Could not get an answer, please try again later.")
        }

        // set loading to false
        setLoading(false)

    }

    

  return (
    <SafeAreaView style={styles.container}>
        {/* header stack */}
        <Stack.Screen
        options={{
        headerShown: false,
        }}
      />

      {/* header */}
      <View style={styles.headerButton} >
       <Pressable style={{flexDirection: "row", alignItems: "center", gap: 12}} onPress={()=>navigation.goBack()}>
          <FontAwesome6 name="less-than" size={20} color={white} />
          <UI.Text size='md'>Back</UI.Text>
        </Pressable>

       { loading && <UI.Text size='md' color={primaryColor}>Loading..</UI.Text>} 
       <ChatgptIcon width={25} height={25}/>
      
      </View>


      {/* chat history */}
      <KeyboardAvoidingView style={styles.chatContainner}>

        { OnboardingData ? (
           <FlatList
           style={{width: "100%"}}
           data={chat}
           ref={flatlistRef}
           onContentSizeChange={()=>flatlistRef.current?.scrollToEnd()}
           showsVerticalScrollIndicator={false}
           renderItem={(value)=>(
              <View style={[styles.chatItem, {justifyContent: (value.item.role === "user") ? "flex-end": "flex-start"}]}>
                    <View style={[ styles.textContainner, (value.item.role === "user") ? {backgroundColor: primaryColor, borderBottomRightRadius: 0} : {backgroundColor: "rgba(255, 255, 255, 0.2);", borderBottomLeftRadius: 0}]}>
                       <UI.Text size='sm' color='white' style={{width: '100%' }}>{value.item.parts[0]?.text}</UI.Text>
                    </View>
              </View>
           )}/>
        ) : (
             <UI.Text size='md' color="rgba(255, 255, 255, 0.4);">Ask anything, get yout answer</UI.Text>
        )}

      </KeyboardAvoidingView>


    {/* Textinput */}
    <UI.TextInput placeholder="Type a message" value={text} selectTextOnFocus editable keyboardType="default" multiline onChangeText={setText} >
        <TouchableOpacity style={styles.sendButton} onPress={(text?.trim()?.length || 0 ) > 0 ? handleSend : ()=>null}>
          <SendIcon width={20} height={20}/>
        </TouchableOpacity>
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