import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalColors } from '../globalStyles';
import { auth, db } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { ref, onValue } from '@firebase/database';

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
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Dashboard</Text>
            <TouchableOpacity onPress={handleSignOut}>
                <MaterialCommunityIcons name='exit-to-app' size={30} />
            </TouchableOpacity>
        </View>
    )
}

// Thẻ hiển thị thông số
function TempCard({ value }) {
    return (
        <ImageBackground source={require('../assets/heat.jpg')} style={styles.cardContainer} resizeMode='cover'>
            <Text style={styles.title}>Temperature</Text>
            <Text style={styles.value}>{value} ℃</Text>
        </ImageBackground>
    )
}
function HumidCard({ value = 0 }) {
    return (
        <ImageBackground source={require('../assets/humid.jpg')} style={styles.cardContainer} resizeMode='cover'>
            <Text style={styles.title}>Humidity</Text>
            <Text style={styles.value}>{value} %</Text>
        </ImageBackground>
    )
}
function SmokeCard({ value = 0 }) {
    return (
        <ImageBackground source={require('../assets/smoke.jpg')} style={styles.cardContainer} resizeMode='cover'>
            <Text style={styles.title}>Smoke level</Text>
            <Text style={styles.value}>{value}</Text>
        </ImageBackground>
    )
}


export default function Main({ navigation }) {
    const platform = Platform.OS;
    const userID = auth.currentUser.uid;

    const [temp, setTemp] = React.useState(0);
    const [humid, setHumid] = React.useState(0);
    const [smoke, setSmoke] = React.useState(0);

    //fetch data from realtime firebase with key "DHT11/Temperature"
    const fetchData = () => {
        //get userId
        const userId = auth.currentUser.uid;
        const dataRef = ref(db, userID + '/temperature');
        const dataRef2 = ref(db, userID + '/humidity');
        const dataRef3 = ref(db, userID + '/smoke');
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setTemp(data);
            console.log(data);
            console.log("Hello", userID);
        }
            , (error) => {
                console.error("Error fetching data from Firebase:", error);
            });
        onValue(dataRef2, (snapshot) => {
            const data = snapshot.val();
            setHumid(data);

        }
            , (error) => {
                console.error("Error fetching data from Firebase:", error);
            });
        onValue(dataRef3, (snapshot) => {
            const data = snapshot.val();
            setSmoke(data); 
        }
            , (error) => {
                console.error("Error fetching data from Firebase:", error);
            });
    };

    const getStatus = () => {
        if (temp < 50) {
            return <Text style={[styles.status, { color: 'green' }]}> Safe</Text>;
        }
        else return <Text style={[styles.status, { color: 'red' }]}> Critical</Text>;;
    }

    React.useEffect(() => {
        console.log(Platform.OS);
        const data = fetchData();
        console.log("Hello");
        console.log(data);
    }, []);

    return (
        <ImageBackground style={styles.mainContainer} source={require('../assets/home_desktop.jpg')} resizeMode='cover'>
            <ScrollView style={{ marginTop: platform === 'web' ? 0 : 24 }}>
                <Header logOut={() => { navigation.navigate('Login') }} />
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
        width: Platform.OS === 'web' ? 350 : 250,
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