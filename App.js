import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();


// Import Stack screens
import Main from './screens/Main';
import Login from './screens/Login';

export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown: false}}>
            <Stack.Screen 
              name="Main" 
              component={Main}
            />
            <Stack.Screen
              name="Login"
              component={Login}
            />
        </Stack.Navigator>
      </NavigationContainer>
    )
}