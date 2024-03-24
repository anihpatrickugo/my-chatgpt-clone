import React, { useRef, useState, FC } from 'react';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView, StyleSheet, StatusBar, Dimensions, View, Text, FlatList } from 'react-native';
import LogoIcon from '@/assets/icons/Logo'
import onboardingData  from '@/constants/OnboardingData';
import OnboardingItem from '@/components/main/OnboardingItem';
import { grey, primaryColor } from '@/components/common/variables';
import * as UI from '@/components/common';
import { NavigationProp } from '@react-navigation/native';
import { Route } from 'expo-router';


export default function OnboardingScreen({navigation}: {navigation: any}) {



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

  const { width, height } = Dimensions.get('window')
  const ITEM_WIDTH = width;

  const handlePress = () => {
    if (currentIndex === 2) {

      // wi
      navigation.navigate('/Dashboard');
    
    } else {
      flatListRef.current.scrollToIndex({index: currentIndex + 1})
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       {/* tittle */}
      <View style={{width: '100%',alignItems: 'center'}}>
         <View style={styles.logoIcon}>
           <LogoIcon height={30} width={30}/>
         </View>
         <UI.Text style={{width: '80%', textAlign: 'center'}} size='xl' bold>Welcome to ChatGPT</UI.Text>
         <UI.Text style={{ textAlign: 'center', marginVertical: 10}} size='md'>Ask anything, get yout answer</UI.Text>
      </View>

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
