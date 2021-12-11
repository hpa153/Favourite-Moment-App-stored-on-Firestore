import React from 'react';
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const Moment = (props) => {

    const navigation = useNavigation();
    let data = {
        id: props.id,
        imageURI: props.imageURI,
        memory: props.memory
    }

    return (
        <TouchableOpacity style={ styles.moment } activeOpacity={.8} onPress={ () => navigation.push( "Details", data )}>
            <Image style={styles.image} source={{ uri: props.imageURI }} />
            <Text style={ styles.momentText }>{ props.memory }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    moment: {
        backgroundColor: '#e1e8e9',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 5,
        borderColor: '#030436',
        marginRight: 15,
    },
    momentText: {
        color: '#030436',
        fontSize: 16,
        maxWidth: '90%',
    },
})

export default Moment;
