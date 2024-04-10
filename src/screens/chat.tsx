import React, { useRef, useState, FC, useEffect, useLayoutEffect, useMemo } from 'react';
import { SafeAreaView, Keyboard, TouchableOpacity, StyleSheet, StatusBar, Dimensions, View, Pressable, FlatList, Alert, KeyboardAvoidingView,} from 'react-native';
import { router, Stack } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import SendIcon from '@/assets/icons/Send'


import { white, primaryColor,grey } from '@/components/common/variables';
import * as UI from '@/components/common';
import OnboardingData from '@/constants/OnboardingData';
import { useSelector, useDispatch } from 'react-redux';

import { askGemini } from '@/utils/askGemini';
import { ChatProps, HistoryProp, addChat, createHistory } from '@/redux/slices/chatSlices';
import MessageItem from '../components/main/MessageItem';
import AsyncStorage from '@react-native-async-storage/async-storage';







const { width, height } = Dimensions.get('window')



const ChatScreen = ({navigation}: any) => {

 
  const [historyState, setHistoryState] = useState<HistoryProp>([])
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState("")
  
  const flatlistRef = useRef<FlatList>(null)

  const chat = useSelector((state: any) => state.chat)
  const dispatch = useDispatch()


  // by initializing the history ref with a copy of the chat redux store, history will always be in syc
  // and bot will always remember previous conversations even if you leave the the chat screen.
  const history = useRef<any>([...chat]).current


  const handleSend = async() => {


      if (text !== "") {
        const userQuestion: ChatProps = {role: "user", parts: [{text: text}]}

        setHistoryState([...historyState, userQuestion])
        dispatch(addChat({role: "user", text: text}))

        // get the text from the input and quickly clear it out of the text input
        const question = text
        setText("")

         // dismiss the keyboard and scroll to the end of the flatlist
         Keyboard.dismiss()

           // set loading to true
          setLoading(true)

         const data = await askGemini(question, history)


        // only push to the history ref after asking the model
        history.push(userQuestion)
      
        
        
        // check if there isnt an error and data is not empty
        if (!data.includes("error") || (data?.trim()?.length || 0 ) > 0 ) {
          const modelAnswer: ChatProps = {role: "model", parts: [{text: data}]}
          setHistoryState([...historyState, userQuestion, modelAnswer]) // i still added the user question here to avoid reloading...
          dispatch(addChat({role: "model", text: data}))


           // save the chat to the local storage
          const local = await AsyncStorage.getItem("history")
          if (local){
          const list = JSON.parse(local)
            list.push({role: "user", parts: [{text: text}]})
            AsyncStorage.setItem("history", JSON.stringify(list))
           }
          
          const objModel: ChatProps = {role: "model", parts: [{text: data}]} 
          history.push(objModel)
          
          }

        
          // save the chat to the local storage
            const obj = await AsyncStorage.getItem("history")
            if (obj) {
              const list = JSON.parse(obj)
              list.push({role: "model", parts: [{text: data}]})
              AsyncStorage.setItem("history", JSON.stringify(list))
              
            }
      

        }else{
          Alert.alert("Error", "Could not get an answer, please try again later.")
        }

        // set loading to false
        setLoading(false)

    }



    const handleClearHistory = async() => {
       Alert.alert("Clear History", "Are you sure you want to clear your chat history?", [
         {
           text: "Yes",
           onPress: async() => {
             await AsyncStorage.setItem("history", JSON.stringify([]))
             setHistoryState([])
           }
         },
         {
           text: "No",
           onPress: ()=>null
         }
       ])
    }

    useLayoutEffect(()=> {
      const getHistory = async ()=>{
       const localHistory = await AsyncStorage.getItem("history")
       if (localHistory){
         const list = JSON.parse(localHistory)
      
        setHistoryState(list)
   

  
       }else {
         await AsyncStorage.setItem("history", JSON.stringify([]))
       }
       
       }
       getHistory()
     }, [])

  

    

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
       <Pressable onPress={historyState.length > 0 ? handleClearHistory : ()=>{}}>
          <AntDesign name="delete" size={24} color={white} />
       </Pressable>
      
      </View>


      {/* chat history */}
      <KeyboardAvoidingView style={styles.chatContainner}>

        { OnboardingData ? (
           <FlatList
           style={{width: "100%"}}
           data={historyState}
           ref={flatlistRef}
           onContentSizeChange={()=>flatlistRef.current?.scrollToEnd()}
           showsVerticalScrollIndicator={false}
           renderItem={(value)=>(
              <MessageItem value={value}/>
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


   sendButton: {
    backgroundColor: primaryColor,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
    borderRadius: 3
   }

});

export default ChatScreen;