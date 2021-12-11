import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/core';


const loginScreen = () => {
    // Firebase
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Navigation
    const navigation = useNavigation();

    useEffect(() => {
        const isLoggedIn = auth.onAuthStateChanged( user => {
            if( user ) {
                navigation.replace('Home');
            }
        });

        return isLoggedIn;
    }, [])

    // Sign up function
    const registerAccount = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Registered with: " + user.email);
            Alert.alert(
                "Welcome on board", 
                "Thank you for your registration. Enjoy our app!",
                [{ text: "Okay" }] 
            );
        })
        .catch( error => console.log(error) )        
    }

    // Login function
    const loginAccount = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Logged in with: " + user.email);
        })
        .catch( error => {
            console.log(error);
            Alert.alert(
                "Something went wrong!", 
                "Please enter a email and password to login!",
                [{ text: "Okay" }] 
            );
        } )
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.appTitle }>Final Project{"\n"}Phuong Anh Hoang</Text>
            
            <View style={ styles.form }>
                <Text style={ styles.inputLabel }>Email address:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={ (email) => setEmail(email) }
                    autoCapitalize="none"
                    autoCorrect={ false }
                    autoCompleteType="email"
                    keyboardType="email-address"
                    placeholder="Email"
                />
                <Text style={ styles.inputLabel }>Password:</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={ (password) => setPassword(password) }
                    autoCapitalize="none"
                    autoCorrect={ false }
                    autoCompleteType="password"
                    secureTextEntry
                    placeholder="Password"
                />
                <View style={ styles.textContainer }>
                    <Text>Don't have account yet? </Text>
                    <TouchableOpacity activeOpacity={.8} onPress={ registerAccount }>
                        <Text style={ styles.textStyle }>Register with above details</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={ styles.button } activeOpacity={.8} onPress={ loginAccount }>
                    <Text style={ styles.buttonText }>Sign In</Text>
                </TouchableOpacity>
            </View> 
        </View>
    )
}

export default loginScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    appTitle: {
        color: '#030436',
        fontSize: 30,
        textAlign: 'center', 
        fontWeight: 'bold',
        marginTop: 60,
    },
    form: {
        paddingVertical: 40,
        width: '90%',
    },
    inputLabel: {
        color: '#030436',
        textAlign: 'left',
        fontSize: 16,
        marginBottom: 5,
    },
    textStyle: {
        color: '#31579e',
        fontSize: 14,
    },
    textInput: {
        borderColor: '#030436',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        padding: 8,
    },
    textContainer: {
        flexDirection: 'row',
        display: 'flex',
        alignSelf: 'flex-end',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#030436',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
        marginTop: 30,
    },
    buttonText: {
        color: '#e1e8e9',
        fontSize: 18,
        fontWeight: 'bold'
    },
})
