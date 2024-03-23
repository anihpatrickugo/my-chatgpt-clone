import { FC } from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import * as UI from '@/components/common';
import LightIcon from '@/assets/icons/Light'
import ThunderIcon from '@/assets/icons/Thunder'
import LimitIcon from '@/assets/icons/Limit'

const { width } = Dimensions.get('window');
const PADDING = 16
const ITEM_WIDTH = width - (PADDING * 2);


interface CarouselItems {
    id: string,
    title: string,
    text1: string,
    text2: string,
    text3: string,
}

interface Props {
    item: CarouselItems
}

const OnboardingItem: FC<Props> = ({item}) => {
  return (
    <Animated.View style={styles.itemContainer}>
      
      <View>
        {
            item.title === 'Examples' ? (
                <LightIcon height={30} width={30}/>
            ) : item.title === 'Capabilities' ? (
                <ThunderIcon height={30} width={30}/>
            ) : (
                <LimitIcon height={30} width={30}/>
            )
        }
         
      </View>

      <UI.Text size='lg' style={{marginBottom: 20}}>{item.title}</UI.Text>

      <View style={styles.description}>
         <UI.Text size='sm' style={{textAlign: 'center', width: "80%"}}>{item.text1}</UI.Text>
      </View>

      <View style={styles.description}>
         <UI.Text size='sm' style={{textAlign: 'center', width: "80%"}}>{item.text2}</UI.Text>
      </View>

      <View style={styles.description}>
         <UI.Text size='sm' style={{textAlign: 'center', width: "80%"}}>{item.text3}</UI.Text>
      </View>
  </Animated.View>
  )
}
const styles = StyleSheet.create({
itemContainer: {
 justifyContent: 'center',
 alignItems: 'center',
 width: ITEM_WIDTH,
 height: 300,
//  backgroundColor: 'red'

},

description: {
  width: '100%', 
  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
  paddingVertical: 12,
  alignItems: "center",
  borderRadius: 8,
  marginBottom: 10
},

title: {
  fontSize: 23,
  textAlign: "center",
  fontWeight: 'bold',
//   fontFamily: 'Poppins_700Bold',
  
},

})

export default OnboardingItem