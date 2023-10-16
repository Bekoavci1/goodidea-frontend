import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal,TextInput, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { Feather, AntDesign } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { HTTP_REQUESTS } from "../api/httpRequestService/httpRequestService";
import axios from "axios";


const EditProfile = ({ route, isOwner,navigation }) => {
  const [userData, setUserData] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");
  const [postProfıle, setpostProfıle] = useState([]);
  const [photoDataa, setphotoDataa] = useState(null);
  const [userDat, setUserDat] = useState("");
  const selectedImageUri = route ? route.params?.selectedImageUri : "";
  const isOwnerValue = isOwner
    ? isOwner
    : route 
    ? route.params?.isOwner
    : false;

    const [formData, setFormData] = useState({
      id: "",
      username: "",
      name: "",
      surname:"",
      email: "",
      password: "",
      passwordConfirmation: "",
      phoneNumber: "",
      role: "",
      photoId: "",
      addressId: "",
      address: {
        id:"",
        country: "",
        city: "",
        buildingNumber: "",
        district: "",
        postCode: 0,
        streetName: "",
        streetNumber: "",
      },
      createdTime: "",
      updatedTime: "",
      deletedTime: "",
    });  

  useEffect(() => {
    HTTP_REQUESTS.USER_SERVICE.USER_EDIT_PROFILE_GET(
      (response)=> {
        
        if(response){
          // console.log("beko",response);
          setFormData({
            ...formData,
            id:response.id,
            username:response.username,
            name: response.name,
            surname: response.surname,
            email: response.email,
            password: response.password,
            passwordConfirmation: response.password,
            phoneNumber: response.phoneNumber,
            role: response.role,
            photoId : response.photoId,
            addressId: response.addressId ? String(response.addressId) : "",
            address: {
              id:response.address.id || "",
              country: response.address.country || "",
              city: response.address.city || "",
              // buildingNumber: response.address.buildingNumber || "",
              // district: response.address.district || "",
              // postCode: response.address.postCode || "",
              // streetName: response.address.streetName || "",
              // streetNumber: response.address.streetNumber || "",
            },
            createdTime : response.createdTime,
            updatedTime : new Date().toISOString(),
            deletedTime : new Date().toISOString(),
          });
        }
      },
      (error) => {
        console.error("bilgileri çekemedik:", error);
      }
    );

    if (formData.photoId) {
      axios.get(`https://goodidea.azurewebsites.net/api/Photos/photos/`+ formData.photoId)
        .then((response) => {
          setphotoDataa(response.data);
        })
        .catch((error) => {
          console.error("Resim bilgisi çekilemedi:", error);
        });
    }
    // fetchData();
  }, [formData.photoId]);

  const handleUpdate = () => {
    // console.log("uyqwge",formData)
    if(formData.address.postCode == "" || formData.address.postCode == null){
      formData.address.postCode = 0;
    }
    // console.log("GÖNSWEMEDEN NCEBE", formData)
    HTTP_REQUESTS.USER_SERVICE.USER_EDIT_PROFILE_PUT(
      formData,
      (response) => {
        Alert.alert("Sucsess", "Sucsess Profile.");
        console.log("Güncelleme başarılı", response);
      },
      (error) => {
        console.log(error)
        Alert.alert("Error","NOT Sucsess Profile.");
      }
    );
  };

  const handleDataChange = (key, subKey, value) => {
    if (subKey) { 
      setUserDat(prevData => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          [subKey]: value
        }
      }));
    } else { 
      setUserDat(prevData => ({
        ...prevData,
        [key]: value
      }));
    }
  };
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity >
            <Image
              source={{ uri: selectedImageUri || photoDataa?.photoUrl }}
              style={{
                height: 170, 
                width: 170,
                borderRadius: 85, 
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={formData.name}
                onChangeText={(text) =>
                  
                  setFormData((prevState) => ({ ...prevState, name: text }))
                }
                editable={true}
                
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Email</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={formData.email}
                editable={true}
                onChangeText={(text) =>
                  setFormData((prevState) => ({ ...prevState, email: text }))
                }
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>City</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={formData.address.city}
                onChangeText={(text) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    address: {
                      ...prevState.address,
                      city: text,
                    },
                  }))
                }
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Country</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              value={formData.address.country}
              onChangeText={(text) =>
                setFormData((prevState) => ({
                  ...prevState,
                  address: {
                    ...prevState.address,
                    country: text,
                  },
                }))
              }
            />
          </View>
        </View>

        <TouchableOpacity
        onPress={handleUpdate}
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
