import React, { FC } from 'react'
import { StyleSheet, TextInputProps, View } from 'react-native'
import { grey, white } from '../variables'
import { TextInput as BaseTextInput } from 'react-native'

interface Props extends TextInputProps {
}

const TextInput: FC<Props> = ({children, ...props}) => {


 return<View style={styles.containner}>
    <BaseTextInput  {...props} style={styles.inputField} />
    {children}
 </View>  

}

const styles = StyleSheet.create({
    containner: {
        backgroundColor: "rgba(255, 255, 255, 0.1);",
        width: "100%",
        borderWidth:1,
        borderRadius: 8,
        borderColor: white,
        flexDirection: "row",
        alignItems: "center",
        padding: 4,
        height: 'auto',
    },
    inputField: {
        height: "100%",
        flex: 1,
        color: white,
       
    }
})
export {TextInput};