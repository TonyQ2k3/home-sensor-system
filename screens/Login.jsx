import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { globalColors } from '../globalStyles';

// Import icons
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Login({navigation}) {
    return (
        <View style={styles.mainContainer}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: globalColors.backgroundBlue, 
        flex: 1,
    },
    bodyContainer: {
        padding: 20,
    },
});