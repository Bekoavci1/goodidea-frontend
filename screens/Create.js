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
import { useNavigation } from '@react-navigation/native';
import { HTTP_REQUESTS } from "../api/httpRequestService/httpRequestService";
import HTTPClient from "../api/httpClient/httpClient";
import axios from "axios";

export default function ImagePickerExample() {
  const navigation = useNavigation();
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

  //   HTTP_REQUESTS.USER_SERVICE.POST_CREATE(
  //     { formData:data },
  //     async (response) => {
  //         console.log("giriş yaptım : ",response)
  //         console.log(data);
  //         navigation.navigate("BottomTabNavigation");
  //     },
  //     (error) => {
  //       setIsLoading(false);
  //       console.error("Giriş hatası:", error);
  //       Alert.alert("The Post unsuccsess!");
  //     }
  //   );
  // };
  let client = new HTTPClient();
  const token = await client.setAuthTokenAccess2();
    axios
      .post("https://goodidea.azurewebsites.net/api/posts", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "multipart/form-data",
          "Authorization": token,
        },
      })
      .then((response) => {
       
        navigation.navigate("Profile");
      })
      .catch((error) => {
        
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
