import React, { useState, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { firestore, auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/core';

import Moment from '../components/moments';


const homeScreen = () => {
    let [retrieved, setRetrieved] = useState(false);
    let [memories, setMemories] = useState([]);
    

    useEffect(() => {
        const subscriber = async () => {
            try {
                const result = [];
                const data = await firestore.collection('moments').get();
                data.forEach(e => {
                    result.push( { id: e.id, uri: e.data().imageURI, quote: e.data().memory} );
                })
                // console.log("useEffect memories: ", memories);
                if (result.length > 0) {
                    // console.log("is retrieved before: ", retrieved);
                    setRetrieved(true);
                    setMemories(result);
                    // console.log('Total moments: ', memories.length);
                }
            } catch(err) {
                console.log(err);
            }
        }
        subscriber();
        },[]);

    // Logout function
    const navigation = useNavigation();

    const logoutAccount = () => {
        auth
        .signOut()
        .then(function () {
            // if logout was successful
            if (!auth.currentUser) {
                Alert.alert(
                    "Thank you!",
                    "See you again!"),
                    [{ text: "Okay" }];
                navigation.replace("Login");
            }
        });
    }
    
    const toAddScreen = () => {
        navigation.replace("Add");
    }

    return (
        <View style={ styles.container }>
            <View style={ styles.main }>
                <TouchableOpacity style={ styles.button } activeOpacity={.8} onPress={ logoutAccount }>
                        <Text style={ styles.buttonText }>Log out</Text>
                </TouchableOpacity>
                    <Text style={ styles.appTitle }>My Favourite Moments</Text>
                <View style={ styles.momentWrapper}>
                    <ScrollView styles={ styles.moments }>
                        {
                            retrieved &&
                            memories.map( memory =>
                                <Moment key={ memory.id } id={ memory.id } imageURI={ memory.uri } memory={ memory.quote } /> )
                        }
                    </ScrollView>
                </View>
            </View>
            <TouchableOpacity style={ styles.addButton } activeOpacity={.8} onPress={ toAddScreen }> 
                    <Text style={ styles.addButtonText }>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default homeScreen;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        flex: 1,
        justifyContent: 'space-between'
    },
    main: {
        width: '100%',
    },
    appTitle: {
        color: '#030436',
        fontSize: 26,
        textAlign: 'center', 
        fontWeight: 'bold',
        marginTop: 20,
    },
    momentWrapper: {
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 20,
        height: '80%',
    },
    moments: {
        paddingTop: 80,
        paddingHorizontal: 20,
        flex: 1,
        height: '100%',
    },
    button: {
        width: '20%',
        height: 40,
        backgroundColor: '#030436',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 25,
        marginTop: 50,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: '#e1e8e9',
        fontSize: 18,
        fontWeight: 'bold'
    },
    addButton: {
        width: 60,
        height: 60,
        backgroundColor: '#030436',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        position: 'absolute',
        right: 30,
        bottom: 30,
    },
    addButtonText: {
        color: '#e1e8e9',
        fontSize: 30,
        fontWeight: 'bold'
    },
})
