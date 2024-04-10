import React, { FC } from 'react'
import { View, StyleSheet, Platform, ToastAndroid, Pressable } from 'react-native'
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as UI from '@/components/common';
import { ChatProps } from '@/redux/slices/chatSlices';
import { primaryColor, white } from '../common/variables';
import Animated, { FlipInYLeft, FlipInYRight } from 'react-native-reanimated';

interface Prop {
    value: {item: ChatProps}
}

const MessageItem: FC<Prop> = ({value}) => {

    const [copied, setCopied] = React.useState(false)

    const copyToClipboard = async (text: string) => {
      await Clipboard.setStringAsync(text);
      // Display a success message 
      if (Platform.OS === 'android') { 
        ToastAndroid.show('Text copied!', 
            ToastAndroid.SHORT); 
    } else if (Platform.OS === 'ios') {
    } 
  
    setCopied(true);
    };

  return (
    <View style={[styles.chatItem, {justifyContent: (value.item.role === "user") ? "flex-end": "flex-start"}]}>
    <Animated.View entering={value.item.role === "user" ? FlipInYRight.duration(500) : FlipInYLeft.duration(900)} style={[ styles.textContainner, (value.item.role === "user") ? {backgroundColor: primaryColor, borderBottomRightRadius: 0} : {backgroundColor: "rgba(255, 255, 255, 0.2);", borderBottomLeftRadius: 0}]}>
       <UI.Text size='sm' color='white' style={{width: '100%' }}>{value.item.parts[0]?.text}</UI.Text>

       <Pressable onPress={()=> copyToClipboard(value.item.parts[0]?.text)} style={{alignSelf: (value.item.role === "user") ? "flex-end": "flex-start"}}>
           { copied ? 
             <AntDesign name="checksquare" size={20} color={white} /> :  
             <Ionicons name="copy-sharp" size={20} color={white} />
             }
          
       </Pressable>
    </Animated.View>

    
   </View>
  )
}


const styles = StyleSheet.create({
    chatItem: {
        width: "100%", 
        marginTop: 4, 
        paddingVertical:8, 
        flexDirection: "row", 
        alignItems: "center",
        gap: 5
        
       },
    
       textContainner: {
        width:"80%", 
        padding: 8,
        borderRadius: 8,
       },  
    
})

export default MessageItem
