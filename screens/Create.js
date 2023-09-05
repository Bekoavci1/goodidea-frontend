import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import HTTPClient from "../api/httpClient/httpClient";

export default function ImagePickerExample() {
  const [selectedImageUri, setSelectedImageUri] = useState(null);
  const [formData, setFormData] = useState({
    ContentDescription: "",
    PhotoImageFile: "",
    PhotoId: 1,
    Date: "2023-11-11",
    Location: 2,
    LikeCount: 3,
    CommentCount: 4,
    BusinessId: 5,
    photoId: 6,
    PhotoPhotoUrl: "berkay",
    PhotoUserId: 8,
    PhotoBusinessId: 9,
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImageUri(uri);
      const type = "image/jpeg";
      const name = "photo.jpg";
      setFormData((prevState) => ({
        ...prevState,
        PhotoImageFile: { uri, type, name },
      }));
    }
  };

  const handleSubmit = async () => {
    console.log("handleSubmit started");
    const data = new FormData();
    data.append('ContentDescription', formData.ContentDescription);
    data.append('PhotoId', formData.PhotoId);
    data.append('Date', formData.Date);
    data.append('Location', formData.Location);
    data.append('LikeCount', formData.LikeCount);
    data.append('CommentCount', formData.CommentCount);
    data.append('BusinessId', formData.BusinessId);
    data.append('Photo.PhotoUrl', formData.PhotoPhotoUrl);
    data.append('Photo.UserId', formData.PhotoUserId);
    data.append('Photo.BusinessId', formData.PhotoBusinessId);
    data.append('Photo.Id', formData.photoId);
    data.append('Photo.ImageFile', formData.PhotoImageFile);
    let client = new HTTPClient();
    const token = await client.setAuthTokenAccess2();
    console.log("Token:", token);
    console.log("data", data);
    console.log("imageFile",formData.PhotoImageFile)
    axios
      .post("https://goodidea.azurewebsites.net/api/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "multipart/form-data",
          "Authorization": token,
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        Alert.alert("Error", "Something went wrong.");
      });
  };

  return (
    <View style={styles.container}>
      <Button
        title="Select Photo"
        onPress={handleImagePick}
        style={styles.button}
      />
      {selectedImageUri && (
        <Image source={{ uri: selectedImageUri }} style={styles.image} />
      )}
      <TextInput
        placeholder="Enter your content"
        placeholderTextColor={COLORS.black}
        value={formData.ContentDescription}
        onChangeText={(text) =>
          setFormData((prevState) => ({
            ...prevState,
            ContentDescription: text,
          }))
        }
        style={styles.textInput}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const COLORS = {
  black: '#000',
  primary: '#007BFF',
  white: '#FFF'
};

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",  // Bu özellik ile ögeleri ortalamış oluyoruz.
    flexDirection: "column",
    padding: 20,
    paddingTop: 60,  // Üst padding'i artırarak ögeleri biraz daha aşağıya çekiyoruz.
    backgroundColor: '#F7F9FC'
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 300,
    marginTop: 20,
    borderRadius: 12,
  },
  textInput: {
    width: "100%",
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginTop: 20,
    backgroundColor: '#FFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    height: 50,
    width: '100%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 18,
  },
};





// import React from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import HTTPClient from '../api/httpClient/httpClient';

// const App = () => {
//     const [photo, setPhoto] = React.useState(null);
//     const [photoShow, setPhotoShow] = React.useState(null);

//     const takePhotoAndUpload = async () => {

//         let result = await ImagePicker.launchImageLibraryAsync({
//             allowsEditing: false,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (result.cancelled) {
//             return;
//         }

//         let localUri = result.uri;
//         setPhotoShow(localUri);
//         let filename = localUri.split('/').pop();

//         let match = /\.(\w+)$/.exec(filename);
//         let type = match ? `image/${match[1]}` : `image`;

//         let formData = new FormData();
//         formData.append('Photo.ImageFile', { uri: localUri, name: filename, type });
//         formData.append('Photo.PhotoUrl', "asdasdasd");

//         let client = new HTTPClient();
//         const token = await client.setAuthTokenAccess2();
//         console.log("Token:", token);

//         await axios.post('https://goodidea.azurewebsites.net/api/posts', formData, {
//             headers: { 'Content-Type': 'multipart/form-data', "Authorization": token },
//         }).then(res => {
//             setPhoto(res.data.photo.photo);
//         }).catch(err => {
//             console.log(err.response);
//         });
//     }

//     const dicardImage = () => {
//         setPhotoShow(null);
//     }

//     return (
//         <View style={styles.mainBody}>
//             <View style={styles.titleContainer}>
//                 <Text style={styles.title}>React Native Image Upload Axios</Text>
//             </View>

//             {photoShow &&
//                 <View style={styles.imageContainer}>
//                     <Image
//                         source={{ uri: photoShow }}
//                         style={{ width: '100%', height: 350 }}
//                     />
//                 </View>
//             }

//             <TouchableOpacity
//                 style={styles.buttonStyle}
//                 activeOpacity={0.5}
//                 onPress={takePhotoAndUpload}
//             >
//                 <Text style={styles.buttonTextStyle}>Upload Image</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//                 style={styles.buttonStyle}
//                 activeOpacity={0.5}
//                 onPress={dicardImage}
//             >
//                 <Text style={styles.buttonTextStyle}>Discard Image</Text>
//             </TouchableOpacity>
            
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     mainBody: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 20,
//     },
//     buttonStyle: {
//         backgroundColor: '#307ecc',
//         borderWidth: 0,
//         color: '#FFFFFF',
//         borderColor: '#307ecc',
//         height: 40,
//         alignItems: 'center',
//         borderRadius: 30,
//         marginLeft: 35,
//         marginRight: 35,
//         marginTop: 15,
//     },
//     buttonTextStyle: {
//         color: '#FFFFFF',
//         paddingVertical: 10,
//         fontSize: 16,
//     },
//     textStyle: {
//         backgroundColor: '#fff',
//         fontSize: 15,
//         marginTop: 16,
//         marginLeft: 35,
//         marginRight: 35,
//         textAlign: 'center',
//     },
//     imageContainer: {
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         borderWidth:1,
//         borderColor:'#d9d6d6',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.8,
//         shadowRadius: 2,  
//         elevation: 5,
//     },
//     titleContainer: {
//         alignItems:'center',
//         marginBottom:30,
//     },
//     title: {
//         fontSize:23,
//         fontWeight:'bold',
//     },
// });

// export default App;



