import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalColors } from '../globalStyles';
import { StatusBar } from 'expo-status-bar';

function Header() {
    return (
        <View style={styles.header}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Dashboard</Text>
            <TouchableOpacity>
                <MaterialCommunityIcons name='exit-to-app' size={30} />
            </TouchableOpacity>
        </View>
    )
}

// Thẻ hiển thị thông số
function TempCard({ value=0 }) {
    return (
        <ImageBackground source={require('../assets/heat.jpg')} style={styles.cardContainer} resizeMode='cover'>
            <Text style={styles.title}>Temperature</Text>
            <Text style={styles.value}>{value} ℃</Text>
        </ImageBackground>
    )
}
function HumidCard({ value=0 }) {
    return (
        <ImageBackground source={require('../assets/humid.jpg')} style={styles.cardContainer} resizeMode='cover'>
            <Text style={styles.title}>Humidity</Text>
            <Text style={styles.value}>{value} %</Text>
        </ImageBackground>
    )
}
function SmokeCard({ value=0 }) {
    return (
        <ImageBackground source={require('../assets/smoke.jpg')} style={styles.cardContainer} resizeMode='cover'>
            <Text style={styles.title}>Smoke level</Text>
            <Text style={styles.value}>{value}</Text>
        </ImageBackground>
    )
}


export default function Main({navigation}) {
    const platform = Platform.OS;

    const [temp, setTemp] = React.useState(0);
    const [humid, setHumid] = React.useState(0);
    const [smoke, setSmoke] = React.useState(0);

    const fetchData = async() => {
        const message = await fetch('https://blynk.cloud/external/api/get?token=dRy4l-vUrswJ9nJNR3kR8L_7vhYN-J1u&v0');
        return message.json();
    }

    const getStatus = () => {
        if (temp < 50) {
            return <Text style={[styles.status, {color: 'green'}]}> Safe</Text>;
        }
        else return <Text style={[styles.status, {color: 'red'}]}> Critical</Text>;;
    }

    React.useEffect(() => {
        console.log(Platform.OS);
        const data = fetchData();
        console.log(data);
    }, []);

    return (
        <ImageBackground style={styles.mainContainer} source={require('../assets/home_desktop.jpg')} resizeMode='cover'>
            <ScrollView style={{marginTop: platform === 'web'? 0: 24}}>
                <Header />
                <View style={styles.bodyContainer}>
                    <Text style={styles.status}>
                        Status:  
                        {
                            getStatus()
                        }
                    </Text>
                    <View style={styles.valuesContainer}>
                        <TempCard value={temp} />
                        <HumidCard value={humid} />
                        <SmokeCard value={smoke} />
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    mainContainer: {
        backgroundColor: globalColors.backgroundBlue, 
        flex: 1,
    },
    bodyContainer: {
        padding: 20,
    },
    valuesContainer: {
        alignItems: 'center',

    },
    cardContainer: {
        width: Platform.OS === 'web' ? 350: 250,
        height: 175,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
        overflow: 'hidden',
    },
    status: {
        fontSize: 26,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: Platform.OS === 'web' ? 28 : 24, 
        fontWeight: 'bold',
        color: '#fff'
    },
    value: {
        fontSize: 30,
        color: '#fff',
    },
});