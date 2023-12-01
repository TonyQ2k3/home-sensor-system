import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, ScrollView, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalColors } from '../globalStyles';
import {auth} from '../utils/firebase';
import { signOut } from 'firebase/auth';


function Header({ logOut }) {
    const handleSignOut = () => {
        signOut(auth).then(() => {
            Alert.alert('You logged out successfully');
            logOut();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <View style={styles.header}>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>Dashboard</Text>
            <TouchableOpacity onPress={handleSignOut}>
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

function EmptyCard() {
    return (
        <View style={emptyCard.container}> 
            <View style={emptyCard.iconContainer}>
                <MaterialCommunityIcons name='fire-off' color='#dedede' size={40} />
                <MaterialCommunityIcons name='water-off' color='#dedede' size={40}/>
                <MaterialCommunityIcons name='wifi-off' color='#dedede' size={40}/>
            </View>
            <View style={emptyCard.textContainer}>
                <Text style={emptyCard.text}>No data available. Please connect your sensors and try again.</Text>
            </View>
        </View>
    )
}


export default function Main({navigation}) {
    const platform = Platform.OS;

    const [temp, setTemp] = React.useState(0);
    const [humid, setHumid] = React.useState(0);
    const [smoke, setSmoke] = React.useState(0);

    const getStatus = () => {
        if (temp < 50) {
            return <Text style={[styles.status, {color: 'green'}]}> Safe</Text>;
        }
        else return <Text style={[styles.status, {color: 'red'}]}> Critical</Text>;;
    }

    React.useEffect(() => {
        
    }, []);

    return (
        <ImageBackground style={styles.mainContainer} source={require('../assets/home_desktop.jpg')} resizeMode='cover'>
            <ScrollView style={{marginTop: platform === 'web'? 0 : 24}}>
                <Header logOut={() => {navigation.navigate('Login')}} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.status}>
                        Status:  
                        {
                            getStatus()
                        }
                    </Text>
                    {
                        temp > 0 && humid > 0 && smoke >= 0 ? (
                            <View style={styles.valuesContainer}>
                                <TempCard value={temp} />
                                <HumidCard value={humid} />
                                <SmokeCard value={smoke} />
                            </View>
                        )
                        :
                        (
                            <View style={{height: '100%', justifyContent: 'center'}}>
                                <EmptyCard />
                            </View>
                        )
                    }
                    
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
        alignItems: 'center'
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


const emptyCard = StyleSheet.create({
    container: {
        width: 300,
        height: 300,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
        flexWrap: 'wrap'
    },
});