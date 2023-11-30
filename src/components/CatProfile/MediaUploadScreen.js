// ./src/CatProfile/CatMediaUploadScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addMedia } from '../../Redux/Slices/CatProfile/CatProfileSlice';
import { saveCatProfileToFirestore } from '../../Redux/Slices/FirestoreSlice';

const CatMediaUploadScreen = () => {
    const dispatch = useDispatch();
    const mediaList = useSelector((state) => state.catProfile.mediaUpload.mediaList);

    const pickImage = () => {
        ImagePicker.showImagePicker({}, (response) => {
            if (!response.didCancel && !response.error) {
                dispatch(addMedia({ type: 'image', uri: response.uri }));
            }
        });
    };

    const pickVideo = () => {
        ImagePicker.showImagePicker({ mediaType: 'video' }, (response) => {
            if (!response.didCancel && !response.error) {
                dispatch(addMedia({ type: 'video', uri: response.uri }));
            }
        });
    };

    const renderMediaItem = ({ item }) => {
        if (item.type === 'image') {
            return <Image source={{ uri: item.uri }} style={styles.mediaItem} />;
        } else if (item.type === 'video') {
            // Assuming you have a VideoPlayer component to handle video rendering
            // Make sure to import and use it appropriately
            return <VideoPlayer source={{ uri: item.uri }} style={styles.mediaItem} />;
        }
    };

    const handleSaveToFirestore = () => {
        try {
            dispatch(
                saveCatProfileToFirestore(
                    {
                        mediaUpload: {
                            mediaList,
                        },
                    },
                    'catProfiles'
                )
            );

        } catch (err) {
            console.log(err);
        }
        // Save media upload data to Firestore

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cat Media Upload</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Upload Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={pickVideo}>
                    <Text style={styles.buttonText}>Upload Video</Text>
                </TouchableOpacity>
            </View>

            {mediaList.length > 0 && (
                <FlatList
                    data={mediaList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMediaItem}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSaveToFirestore}>
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    mediaItem: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
});

export default CatMediaUploadScreen;