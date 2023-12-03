import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Platform, TouchableOpacity, TextInput, Image } from 'react-native';
import { globalStyles } from '../globalStyles';
import { Formik } from 'formik';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as yup from 'yup';

// Import icons
import { MaterialCommunityIcons } from '@expo/vector-icons';


const LoginSchema = yup.object({
    email: yup.string().email()
    .label('Email')
    .required(),
    password: yup.string()
    .label('Password')
    .min(6)
    .required(),
});


export default function Login({navigation}) {
    const platform = Platform.OS;
    const [valid, setValid] = React.useState(true);

    const handleLogin = (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            navigation.navigate('Dashboard');
        })
        .catch(() => {
            setValid(false);
        });
    }


    return (
        <ImageBackground style={globalStyles.container} source={require('../assets/home_desktop.jpg')} resizeMode='cover'>
            <View
                style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 20}}
            >
                <View />
                <View style={[globalStyles.formContainer, {marginTop: 40}]}>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={LoginSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            handleLogin(values);
                        }}
                    >
                    {
                        ({handleChange, handleSubmit, values, errors}) => (
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>Login</Text>

                            <View>
                                <View style={globalStyles.form_inputWrapper}>
                                    <MaterialCommunityIcons name='email' size={24}/>
                                    <TextInput
                                        placeholder='Email' 
                                        style={globalStyles.form_input}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                    />
                                </View>
                                <Text style={globalStyles.errorText}>{errors.email}</Text>
                            </View>

                            <View>
                                <View style={globalStyles.form_inputWrapper}>
                                    <MaterialCommunityIcons name='lock' size={24}/>
                                    <TextInput 
                                        placeholder='Password'
                                        style={globalStyles.form_input}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        secureTextEntry
                                    />
                                </View>
                                <Text style={globalStyles.errorText}>{errors.password}</Text>
                            </View>
                            {
                                valid ? null : (
                                    <View style={{width: 250, marginTop: 10}}>
                                        <Text style={{color: 'red', textAlign: 'center', flexWrap: 'wrap'}}>Either email or password is incorrect. Please double-check and try again.</Text>
                                    </View>
                                )
                            }
                            <TouchableOpacity style={globalStyles.submitBtn} onPress={handleSubmit}>
                                <Text style={{ fontSize: 20,}}>Login</Text>
                            </TouchableOpacity>
                        </View>)
                    }
                    </Formik>
                </View>

                <View>
                    <Text style={styles.bottomText}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.replace('Register')}>
                        <Text style={styles.bottomTextBold}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    login: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 40,
    },
    bottomText: {
        fontSize: 20, 
        textAlign: 'center'
    },
    bottomTextBold: {
        fontSize: 20, 
        textAlign: 'center',
        fontWeight: 'bold',
    }
});