
// Importing necessary dependencies and components
import { black, grey, primaryColor } from '@/components/common/variables';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import * as UI from '@/components/common';
import Animated, { PinwheelIn } from 'react-native-reanimated';

// Defining the ProfileScreen component
const ProfileScreen: React.FC = () => {
    // Accessing the user data from the Redux store
    const data = useSelector((state: any) => state.auth);
    const user = data.user.payload;

    return (
        <Animated.View style={styles.container} entering={PinwheelIn.delay(500)}>
            <View style={styles.card}>
                {/* Displaying the user's profile image */}
                <Image source={{ uri: user.photo }} style={styles.profileImage} />
                {/* Displaying the user's name */}
                <UI.Text size='lg' color={black} bold>{user.name}</UI.Text>
                {/* Displaying the user's email */}
                <UI.Text size='md' color={primaryColor} bold>{user.email}</UI.Text>
            </View>
        </Animated.View>
    );
};

// Styling for the ProfileScreen component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: grey,
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: primaryColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.9,
        shadowRadius: 3.84,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
});

export default ProfileScreen;



