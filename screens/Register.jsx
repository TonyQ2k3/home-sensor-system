import React from 'react';
import { Text, View, StyleSheet, ImageBackground, Platform, TouchableOpacity, TextInput, Image } from 'react-native';
import { globalStyles } from '../globalStyles';
import { Formik } from 'formik';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import * as yup from 'yup';

// Import icons
import { MaterialCommunityIcons } from '@expo/vector-icons';


const SignUpSchema = yup.object({
    username: yup.string()
    .label('Username')
    .min(5)
    .required(),
    email: yup.string().email()
    .label('Email')
    .required(),
    password: yup.string()
    .label('Password')
    .min(6)
    .required(),
    confirmPass: yup.string()
    .label('Password confirmation')
    .required()
    .oneOf([yup.ref('password')], 'Your passwords do not match.')
});


export default function Register({navigation}) {
    const platform = Platform.OS;
    const [valid, setValid] = React.useState(true);

    const handleSignUp = (values) => {
        createUserWithEmailAndPassword(auth, values.email, values.password)
        .then(() => {
            updateProfile(auth.currentUser, {
                displayName: values.username,
            });
            navigation.navigate('Dashboard');
        })
        .catch(() => {
            setValid(false);
        });
    }


    return (
        <ImageBackground style={globalStyles.container} source={require('../assets/home_desktop.jpg')} resizeMode='cover'>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between', padding: 20}}>
                <View />
                <View style={[globalStyles.formContainer, {marginTop: 40}]}>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={SignUpSchema}
                        onSubmit={(values) => {
                            console.log(values);
                            handleSignUp(values);
                        }}
                    >
                    {
                        ({handleChange, handleSubmit, values, errors}) => (
                        <View style={{padding: 20, alignItems: 'center'}}>
                            <Text style={{fontSize: 28, fontWeight: 'bold'}}>Create a new account</Text>

                            <View>
                                <View style={globalStyles.form_inputWrapper}>
                                    <MaterialCommunityIcons name='account-circle' size={24} />
                                    <TextInput
                                        placeholder='Username' 
                                        style={globalStyles.form_input}
                                        value={values.username}
                                        onChangeText={handleChange('username')}
                                    />
                                </View>
                                <Text style={globalStyles.errorText}>{errors.username}</Text>
                            </View>

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
                                        secureTextEntry
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        />
                                </View>
                                <Text style={globalStyles.errorText}>{errors.password}</Text>
                            </View>

                            <View>
                                <View style={globalStyles.form_inputWrapper}>
                                    <MaterialCommunityIcons name='lock' size={24}/>
                                    <TextInput 
                                        placeholder='Confirm Password'
                                        style={globalStyles.form_input}
                                        secureTextEntry
                                        value={values.confirmPass}
                                        onChangeText={handleChange('confirmPass')}
                                        />    
                                </View>
                                <Text style={globalStyles.errorText}>{errors.confirmPass}</Text>
                            </View>
                            {
                                valid ? null : (
                                    <View style={{width: 250, marginTop: 10}}>
                                        <Text style={{color: 'red', textAlign: 'center', flexWrap: 'wrap'}}>There has been an error creating your account, please try again.</Text>
                                    </View>
                                )
                            }
                            <TouchableOpacity style={globalStyles.submitBtn} onPress={handleSubmit}>
                                <Text style={{ fontSize: 20,}}>Register</Text>
                            </TouchableOpacity>
                        </View>)
                    }
                    </Formik>
                </View>

                <View>
                    <Text style={styles.bottomText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.bottomTextBold}>Log in</Text>
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