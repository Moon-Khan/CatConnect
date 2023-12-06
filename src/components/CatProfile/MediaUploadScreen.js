// ./src/CatProfile/CatMediaUploadScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addMedia } from '../../Redux/Slices/CatProfile/CatProfileSlice';
import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';

const CatMediaUploadScreen = () => {
    const [image, setImage] = useState([]);
    const dispatch = useDispatch();
    const mediaList = useSelector((state) => state.catProfile.mediaUpload.mediaList);

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
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{ ...styles.container, backgroundColor: 'white' }}>
            <Text style={styles.title}>Cat Media Upload</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={photoCamera}>
                    <Text style={styles.buttonText}>Upload Photo from camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={photoLib}>
                    <Text style={styles.buttonText}>Upload Photo from drive</Text>
                </TouchableOpacity>
            </View>

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

            <TouchableOpacity style={styles.profileButton} onPress={handleSaveToFirestore}>
                <Text style={styles.buttonText}>Profile Created</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'left',
        color: '#212529',
        fontFamily: 'Poppins-SemiBold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#47C1FF',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileButton: {
        backgroundColor: '#47C1FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
});

export default CatMediaUploadScreen;

