import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/core';
import { firestore } from '../firebaseConfig';


const detailsScreen = (route) => {
    let data = route.route.params;

    const [selectedImage, setSelectedImage] = useState();
    const [myMemory, setMyMemory] = useState('');

    const imageSelectedHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    const onMemoryChangeHandler = memory => {
        setMyMemory(memory);
    }

    useEffect(() => {
        setSelectedImage(data.imageURI);
        setMyMemory(data.memory);
    },[]);

    const verifyPermission = async () => {
        const cameraResult = await ImagePicker.requestCameraPermissionsAsync();
        const libraryResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if(cameraResult.status !== 'granted' && libraryResult.status !== 'granted') {
            Alert.alert('Insufficient Permissions!', 'You need to grant camera permissions to use this app.', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    }

    const retrieveImageHandler = async () => {
    
        const hasPermission = await verifyPermission();
        if(!hasPermission) {
            return false;
        }
        
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });
      
        if (!image.cancelled) {
            imageSelectedHandler(image.uri);
        }
    }

    const takeImageHandler = async () => {
    
        const hasPermission = await verifyPermission();
        if(!hasPermission) {
            return false;
        }
        
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5
        });
      
        if (!image.cancelled) {
            imageSelectedHandler(image.uri);
        }
    }

    const navigation = useNavigation();

    const deleteFromDatabase = () => {
        firestore
            .collection('moments')
            .doc(data.id)
            .delete()
            .then(() => {
                console.log('DELETED!');
            })
            .catch((error) => {
                console.log(error);
            })
        
        // Navigate back to home page
        navigation.replace("Home");
    }

    async function updateToDatabase() {
        // Move image file to permanent storage
        let fileName = selectedImage.split('/').pop();
        let destinationUri = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({ from: selectedImage, to: destinationUri });
            console.log("File moved!");
        } catch (err) {
            throw new Error('Something went wrong on moving image file!');
        }
    
        // Store data to Firestore
        firestore
            .collection('moments')
            .doc(data.id)
            .update({
                imageURI: destinationUri,
                memory: myMemory,
            })
            .then(() => {
            console.log("UPDATED!");
            })
            .catch((error) => {
                console.log(error);
            })

        // Navigate back to home page
        navigation.replace("Home");
    }

    const cancel = () => {
        navigation.replace("Home");
    }

    return (
        <View style={ styles.screen }>
            <View style={ styles.main }>
                <Text style={ styles.textLabel }>Your moment</Text>
                <TouchableOpacity style={ styles.imageController } activeOpacity={.8} onPress={ () => Alert.alert(
                "Image Selector", 
                "Select your picture",
                [
                    { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
                    { text: "From Gallery", onPress: retrieveImageHandler },
                    { text: "Take A Photo", onPress: takeImageHandler },
                ]
                ) }>
                {
                    selectedImage &&
                    <Image style={styles.image} source={{ uri: selectedImage }} />
                }
                </TouchableOpacity>
                <TextInput 
                    style={styles.textInput} 
                    multiline
                    numberOfLines={5}
                    onChangeText={ onMemoryChangeHandler }
                    value={ myMemory }
                />
                
            </View>
            <View style={ styles.main }>
                <TouchableOpacity style={ styles.button } activeOpacity={.8} onPress={ updateToDatabase } >
                    <Text style={ styles.label }> Update </Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.delete } activeOpacity={.8} onPress={ () =>
                    Alert.alert(
                        "Warning!", 
                        "Your moment will be deleted permanently. Are you sure to continue?",
                        [
                            { text: "Cancel" },
                            { text: "Confirm", onPress: deleteFromDatabase }
                        ]
                        )} >
                    <Text style={ styles.label }> Delete </Text>
                </TouchableOpacity>
                <TouchableOpacity style={ styles.cancel } activeOpacity={.8} onPress={ cancel } >
                    <Text style={ styles.label }> Back </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default detailsScreen;

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },
    textLabel: {
        marginTop: 60,
        color: '#030436',
        fontSize: 20,
        textAlign: 'left'
    },
    main: {
        width: '100%',
        alignItems: 'center',
    },
    imageController: {
        width: '100%',
        height: 300,
        borderColor: '#030436',
        borderWidth: 3,
        marginTop: 20
    },
    image: {
        width: '100%',
        height: 294
    },
    textInput: {
        width: '100%',
        fontSize: 16,
        borderColor: '#030436',
        borderWidth: 3,
        margin: 15,
        paddingVertical: 4,
        paddingHorizontal: 4,
        textAlignVertical: 'top',
        marginBottom: 30
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#030436',
        justifyContent: 'center',
        alignItems: 'center',
    },
    delete: {
        width: '100%',
        height: 50,
        backgroundColor: '#e06666',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    cancel: {
        width: '100%',
        height: 50,
        backgroundColor: '#6f8693',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    label: {
        color: '#e1e8e9',
        fontSize: 20,
        fontWeight: 'bold',
    },
})
