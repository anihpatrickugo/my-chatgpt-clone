import React from 'react';
import { View, Text, Image, TouchableOpacity , Linking, StyleSheet, StatusBar, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { primaryColor, grey, white, black } from '@/components/common/variables';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as UI from '@/components/common';

const { width, height } = Dimensions.get('window')

const DeveloperScreen = () => {
    const developer = {
        name: 'Anih-Patrick Ugochukwu',
        about: 'Fullstack Mobile Developer',
        description: 'Passionate about creating innovative and user-friendly mobile applications.',
        image: require('../assets/images/developer.jpeg'),
        github: 'https://github.com/anihpatrickugo',
        linkedin: 'https://linkedin.com/in/anihpatrickugo',
        twitter: 'https://twitter.com/anihpatrickugo',
        gmail: 'mailto:iampatrickugo@gmail.com',
        phone: '+2349059209717',
        instagram: 'https://instagram.com/anihpatrickugoo',
        website: 'https://anihpatrickugo.github.io',
    };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={developer.image} style={{ width: 200, height: 200, borderRadius: 100 }} />

            <View style={{alignItems: "center"}}>
               <UI.Text size='lg' bold color={primaryColor}>{developer.name}</UI.Text>
               <UI.Text size='sm' bold color={grey} style={{textAlign: "center"}}>{developer.about}</UI.Text>

               <UI.Text size='xs' color={grey} style={{textAlign: "center"}}>{developer.description}</UI.Text>
            </View>


            <View style={{ flexDirection: 'row', marginTop: 16, gap: 12 }}>
                <TouchableOpacity onPress={() => Linking.openURL(developer.github)}>
                    <Ionicons name="logo-github" size={32} color="black" style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(developer.linkedin)}>
                    <Ionicons name="logo-linkedin" size={32} color="black" style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(developer.twitter)}>
                    <Ionicons name="logo-twitter" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(developer.instagram)}>
                    <Ionicons name="logo-instagram" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(developer.gmail)}>
                    <MaterialCommunityIcons name="gmail" size={32} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(developer.website)}>
                    <MaterialCommunityIcons name="web" size={32} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    //   justifyContent: "space-between",
      paddingTop: StatusBar.currentHeight,
      padding: 16,
      backgroundColor: white,
      height: height,
      width: width
    },
  
  });

export default DeveloperScreen;