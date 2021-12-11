import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import loginScreen from './screens/loginScreen';
import homeScreen from './screens/homeScreen';
import addScreen from './screens/addScreen';
import detailsScreen from './screens/detailsScreen';

export default function App() {
    
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={ loginScreen } />
                <Stack.Screen name="Home" component={ homeScreen } />
                <Stack.Screen name="Add" component={ addScreen } />
                <Stack.Screen name="Details" component={ detailsScreen } />
            </Stack.Navigator>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({
    screen: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    appTitle: {
        color: '#030436',
        fontSize: 26,
        textAlign: 'center'
    },
    textStyle: {
        color: '#e1e8e9',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    label: {
        color: '#030436',
    },
    message: {
        color: '#030436',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    buttonContainer: {
        paddingVertical: 40,
        width: '90%',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#030436',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
        paddingTop: 30,
    }
});
