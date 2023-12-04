import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Platform, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { globalColors } from '../globalStyles';
import { auth, db } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { ref, onValue } from '@firebase/database';
import emailjs from '@emailjs/browser';
// Import animations
import { FadeInTemp, FadeInHumid, FadeInSmoke } from '../components/FadeAnim';

function Header({ logOut }) {
    const username = auth.currentUser.displayName;

    const handleSignOut = () => {
        signOut(auth).then(() => {
            if (confirm("Do you want to sign out?")) {
                logOut();
                alert('You logged out successfully');
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <View style={styles.header}>
            <Text style={styles.dashboardTitle}>
                {username}'s Home sensors
            </Text>
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

function EmptyCard() {
    return (
        <View style={emptyCard.container}>
            <View style={emptyCard.iconContainer}>
                <MaterialCommunityIcons name='fire-off' color='#dedede' size={40} />
                <MaterialCommunityIcons name='water-off' color='#dedede' size={40} />
                <MaterialCommunityIcons name='wifi-off' color='#dedede' size={40} />
            </View>
            <View style={emptyCard.textContainer}>
                <Text style={emptyCard.text}>No data available. Please connect your sensors and try again.</Text>
            </View>
        </View>
    )
}

// const sendEmailTemp = ()=>{
//     console.log("hello11" )
//     emailjs.sendForm('service_0oexdbn', 'template_n8kb5iz', form.target, 'vRpK3hlM2u0_-RXFR')
//     .then((result) => {
//         console.log(result.text);
//     }, (error) => {
//         console.log(error.text);
//     });
// }
export default function Main({ navigation }) {
    const platform = Platform.OS;
    const userID = auth.currentUser.uid;
    const userName = auth.currentUser.displayName;

    const [temp, setTemp] = React.useState(0);
    const [humid, setHumid] = React.useState(0);
    const [smoke, setSmoke] = React.useState(0);

    //function send email
    const sendEmailTemp = (temperature) => {
        const currentEmail = auth.currentUser.email;
        console.log(currentEmail)
        console.log("hello11")
        emailjs.send('service_0oexdbn', 'template_n8kb5iz', { subject: "Alert temperature", to_name: userName, message: "Alert temperature: " + temperature, sender: "Fire alarm system", receiver: currentEmail }, 'vRpK3hlM2u0_-RXFR')
    }
    const sendEmailHumi = (Humi) => {
        const currentEmail = auth.currentUser.email;
        console.log(currentEmail)
        console.log("hello11")
        emailjs.send('service_0oexdbn', 'template_n8kb5iz', { subject: "Alert humidity", to_name: userName, message: "Alert humidity: " + Humi, sender: "Fire alarm system", receiver: currentEmail }, 'vRpK3hlM2u0_-RXFR')
    }
    const sendEmailSmoke = (Smoke) => {
        const currentEmail = auth.currentUser.email;
        console.log(currentEmail)
        console.log("hello11")
        emailjs.send('service_0oexdbn', 'template_n8kb5iz', { subject: "Alert smoke", to_name: userName, message: "Alert smoke: " + Smoke, sender: "Fire alarm system", receiver: currentEmail }, 'vRpK3hlM2u0_-RXFR')
    }
    const fetchData = () => {
        const dataRef = ref(db, userID + '/temperature');
        const dataRef2 = ref(db, userID + '/humidity');
        const dataRef3 = ref(db, userID + '/smoke');

        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setTemp(data);
            console.log(data);
            if(data > 50 && data < 60){
                sendEmailTemp(data);
            }

            if (data > 60) {
                sendEmailTemp(data);
            }
        }
            , (error) => {
                console.error("Error fetching data from Firebase:", error);
            });
        onValue(dataRef2, (snapshot) => {
            const data = snapshot.val();
            setHumid(data);
            if (data < 20) {
                sendEmailHumi(data);
            }

        }
            , (error) => {
                console.error("Error fetching data from Firebase:", error);
            });
        onValue(dataRef3, (snapshot) => {
            const data = snapshot.val();
            setSmoke(data);
            if (data > 60) {
                sendEmailSmoke(data);
            }
        }
            , (error) => {
                console.error("Error fetching data from Firebase:", error);
            });
    };

    const getStatus = () => {
        if (temp < 45) {
            return <Text style={[styles.status, { color: 'green' }]}> Safe</Text>;
        }
        else if (temp < 60) {
            return <Text style={[styles.status, { color: 'orange' }]}> Unsafe</Text>;
        }
        else return <Text style={[styles.status, { color: 'red' }]}> Critical</Text>;
    }

    const getSubtitle = () => {
        let status = "";
        if (temp < 45) {
            status += "Temperature, humidity is normal.";
        }
        else if (temp < 60) {
            status += "Your house's temperature is high.";
        }
        else status += "Your house's temperature is dangerously high!";

        if (smoke < 100) {
            status += "\nCarbon dioxide is at a safe level.";
        }
        else if (smoke < 200) {
            status += "\nCarbon dioxide level is high.";
        }
        else status += "\nCarbon dioxide level is dangerously high!";
        return status;
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <ImageBackground style={styles.mainContainer} source={require('../assets/home_desktop.jpg')} resizeMode='cover'>
            <Header logOut={() => { navigation.navigate('Login') }} />
            <ScrollView style={{ marginTop: 0 }}>
                <View style={styles.bodyContainer}>
                    {
                        temp > 0 && humid > 0 && smoke >= 0 ? (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.status}>
                                    Status: {getStatus()}
                                </Text>
                                <Text style={styles.statusSub}>
                                    {getSubtitle()}
                                </Text>
                                <View style={styles.valuesContainer}>
                                    <FadeInTemp>
                                        <TempCard value={temp} />
                                    </FadeInTemp>
                                    <FadeInHumid>
                                        <HumidCard value={humid} />
                                    </FadeInHumid>
                                    <FadeInSmoke>
                                        <SmokeCard value={smoke} />
                                    </FadeInSmoke>

                                </View>
                            </View>
                        )
                            :
                            (
                                <View style={{ height: '100%', justifyContent: 'center' }}>
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
    dashboardTitle: {
        fontSize: Platform.OS === 'web' ? 30 : 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: Platform.OS === 'web' ? 0 : 24,
    },
    mainContainer: {
        backgroundColor: globalColors.backgroundBlue,
        flex: 1,
    },
    bodyContainer: {
        padding: 20,
        alignItems: 'center',
    },
    valuesContainer: {
        alignItems: 'center',
        flexDirection: Platform.OS === 'web' ? 'row' : 'column',
        marginTop: Platform.OS === 'web' ? 40 : 0,
        justifyContent: 'space-evenly',
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
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    status: {
        fontSize: 26,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 40,
    },
    statusSub: {
        fontSize: 26,
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 20,
        padding: 10,
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
    title: {
        fontSize: Platform.OS === 'web' ? 28 : 24,
        fontWeight: 'bold',
        color: '#fff'
    },
    value: {
        fontSize: 26,
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
        marginTop: 40,
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