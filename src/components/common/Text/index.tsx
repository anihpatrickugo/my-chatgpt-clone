import React, { FC } from 'react'
import { TextProps, StyleProp, Text as BaseText, TextStyle }  from 'react-native'
import { useFonts } from 'expo-font';
import { white } from '../variables'


interface Props extends TextProps {
    size: "xs" | "sm" | "md" | "lg" | "xl",
    bold?: boolean
    color?: string
}

interface VariantStyleProps extends StyleProp<TextStyle> { 
    fontSize?: number | null,
    lineHeight?: number | null, 
    fontWeight?: string | number | null, 
    color?: string | null
}

const Text: FC<Props> = ({children, size, bold, color, style, ...props}) => {

    const [fontsLoaded] = useFonts({
        'Raleway': require('@/assets/fonts/Raleway-VariableFont_wght.ttf'),
      });

   let variantStyles: VariantStyleProps = { fontSize: null, lineHeight: null, fontWeight: null, color: color || white}


//   custom sizes
    switch(size){
        case "xs":
            variantStyles = {...variantStyles, fontSize: 12}
            break;
        case "sm":
            variantStyles = {...variantStyles, fontSize: 14}
            break;
        case "md":
            variantStyles = {...variantStyles, fontSize: 16, lineHeight: 30}
            break;
        case "lg":
            variantStyles = {...variantStyles, fontSize: 20}
            break;
        case "xl":
            variantStyles = {...variantStyles, fontSize: 32}
            break;
        default: 
           variantStyles= {...variantStyles, fontSize: 10}
    }

    // bold
    switch (bold){
        case true:
            variantStyles = {...variantStyles, fontWeight: "bold"}
            break;
        default:
            variantStyles = {...variantStyles, fontWeight: null}
    }

 return  <BaseText style={[style, variantStyles]} {...props}>{children}</BaseText>

}

export {Text};