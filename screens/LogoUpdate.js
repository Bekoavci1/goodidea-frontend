import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import HTTPClient from "../api/httpClient/httpClient";

const LogoUpdate = ({ navigation, route })  => {

  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImageUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    let client = new HTTPClient();
    const token = await client.setAuthTokenAccess2();
    if (selectedImageUri) {
        const apiUrl = 'https://goodidea.azurewebsites.net/api/Photos/upload-logo';
        let formData = new FormData();
        formData.append('ImageFile', {
          uri: selectedImageUri,
          type: 'image/jpeg', // Tipi değişebilir.
          name: 'userLogo.jpg' // İsim değişebilir.
        });

        formData.append('PhotoUrl', "Berkay");

        try {
          const uploadResponse = await axios.post(apiUrl, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              "Authorization": token,
            }
          });
        
          if (uploadResponse.status === 200) {
            navigation.navigate('Profile', { selectedImageUri: selectedImageUri });
          } else {
            Alert.alert('Error', 'Image upload failed. Please try again.');
          }
        } catch (error) {
          Alert.alert('Error', 'There was a problem updating the image.');
        }
    } else {
      Alert.alert('Error', 'Please select an image first.');
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={handleImagePick}>
        {selectedImageUri ? (
          <Image source={{ uri: selectedImageUri }} style={{ width: 200, height: 200, borderRadius: 100 }} />
        ) : (
          <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Select Image" onPress={handleImagePick} />
          </View>
        )}
      </TouchableOpacity>

      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
}

export default LogoUpdate;
