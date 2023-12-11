// ./src/CatProfile/CatMediaUploadScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addMedia } from '../../Redux/Slices/CatProfile/CatProfileSlice';
import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';
import { useNavigation } from '@react-navigation/native';

const CatMediaUploadScreen = () => {
    const [image, setImage] = useState([]);
    const dispatch = useDispatch();
    const mediaList = useSelector((state) => state.catProfile.mediaUpload.mediaList);
    const navigation = useNavigation();
    const [isBtnPressed, setIsBtnPressed] = useState(false);

    const onPressIn = () => {
        setIsBtnPressed(true);
    };

    const onPressOut = () => {
        setIsBtnPressed(false);
    };


    const photoCamera = () => {
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then((pickedImage) => {
            console.log(pickedImage);
            setImage([pickedImage.path]); // Use an array to store a single image path
        });
    };

    const photoLib = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((pickedImage) => {
            console.log(pickedImage.path);
            setImage([pickedImage.path]); // Use an array to store a single image path
        });
    };

    const handleSaveToFirestore = () => {
        try {
            if (image.length > 0) {
                // Dispatch the 'addMedia' action with the selected image URI
                dispatch(addMedia({ uri: image[0] }));

                // Save media upload data to Firestore with only one image
                dispatch(
                    saveCatProfileToFirestore(
                        {
                            mediaUpload: {
                                mediaList: [{ uri: image[0] }],
                            },
                        },
                        'catProfiles'
                    )
                );
                navigation.navigate('Home');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{ ...styles.container, backgroundColor: 'white' }}>
            <Text style={styles.title}>Cat Media Upload</Text>

            <View style={{ height: 350, width: '100%' }}>
                {image.length > 0 && (
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        source={{ uri: image[0] }}
                        onLoad={() => console.log('Image loaded successfully')}
                        onError={(error) => console.log('Image load error:', error)}
                    />
                )}
            </View>

            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={photoCamera}>
                    <Text style={styles.buttonText}>Upload Photo from camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={photoLib}>
                    <Text style={styles.buttonText}>Upload Photo from drive</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.buttonContainer}>
                <TouchableHighlight
                    style={[styles.button, isBtnPressed && styles.buttonPressed]}
                    onPress={photoCamera}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    underlayColor="#47C1FF"
                    color='#fff'

                >
                    <Text style={[styles.buttonText, isBtnPressed && { color: '#fff' }]}>Upload Photo from camera</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={[styles.button, isBtnPressed && styles.buttonPressed]}
                    onPress={photoLib}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    underlayColor="#47C1FF"
                    color='#fff'
                >
                    <Text style={[styles.buttonText, isBtnPressed && { color: '#fff' }]}>Upload Photo from drive</Text>
                </TouchableHighlight>
            </View>

            <TouchableOpacity style={styles.profileButton} onPress={handleSaveToFirestore}>
                <Text style={styles.profileButtonText}>Profile Created</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginTop:15,

        marginBottom: 16,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
    },
    // button: {
    //     backgroundColor: '#fff',
    //     padding: 10,
    //     borderRadius: 25,
    //     flex: 1,
    //     marginHorizontal: 10,
    //     borderColor: '#47C1FF',
    //     borderWidth: 2,
    // },
    // buttonText: {
    //     fontSize: 14,
    //     color: '#47C1FF',
    //     textAlign: 'center',
    //     fontFamily: 'Poppins-SemiBold',
    // },

    button: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 25,
        flex: 1,
        marginHorizontal: 10,
        borderColor: '#47C1FF',
        borderWidth: 2,
        ...Platform.select({
            android: {
                elevation: 1,
            },
        }),
    },
    buttonPressed: {
        ...Platform.select({
            android: {
                elevation: 2, // Adjust the elevation when pressed
            },
        }),
    },
    buttonText: {
        fontSize: 14,
        color: '#47C1FF',
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileButton: {
        backgroundColor: '#47C1FF',
        fontFamily: 'Poppins-SemiBold',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 20,
        width: '50%',
        alignContent: 'center',
        position:'relative',
        left: '25%',
    },
    profileButtonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
    }
});

export default CatMediaUploadScreen;

