import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { removeToken } from "../auth/Auth";
import { HTTP_REQUESTS } from "../api/httpRequestService/httpRequestService";
import axios from "axios";
import { storeToken } from '../auth/Auth';
const BusinessEdit = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNumber: "",
    role: "",
    vatNumber: "",
    bio: "",
    addressId: "",
    address: "",
    createdTime: "2023-08-29T23:57:58.856",
    updatedTime: "2023-08-29T23:57:58.856",
    deletedTime: "2023-08-29T23:57:58.856",

    //     "isVerified": false,
    //     "photoId": null,
    //     "address": null,
  });

//   const headers = {
//     Authorization: `Bearer ${token}`, // Retrieve token from AsyncStorage or Redux
//   };
  
//   // Make an authenticated request
//   axios.get('your_api_endpoint/protected_resource', { headers: headers })
//     .then(response => {
//       // Handle the response
//     })
//     .catch(error => {
//       console.error('Request failed', error);
//     });

  useEffect(() => {

    
    console.log("selamun aleyküm")

    HTTP_REQUESTS.USER_SERVICE.BUSINESS_EDIT_PROFILE_GET(
      formData,
      async (response) => {
        console.log("datalar:", response);
      },
      (error) => {
        console.error("bilgileri çekemedik:", error);
      }
    );
  }, []);

  

  const handleUpdate = () => {
    console.log("Hayırdır biz geldik")
    HTTP_REQUESTS.USER_SERVICE.BUSINESS_EDIT_PROFILE_PUT(
      formData,
      async (response) => {
        navigation.navigate("Profile");
       
        console.log("Güncelleme başarılı", response.data);
      },
      (error) => {
        console.error("Güncelleme sırasında hata oluştu", error);
        Alert.alert("Hata", "Güncelleme sırasında bir hata oluştu.");
      }
    );
  };

  const handleSubmit = (response) => {
    removeToken(response);
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1, marginHorizontal: 22 }}>
          <View style={{ marginVertical: 22 }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginVertical: 12,
                color: COLORS.black,
                textAlign: "center",
              }}
            >
              Edit Account
            </Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Business name
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter name of the Business"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prevState) => ({ ...prevState, name: text }))
                }
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Email address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                value={formData.email}
                onChangeText={(text) =>
                  setFormData((prevState) => ({ ...prevState, email: text }))
                }
              />
            </View>
          </View>
          <View>
            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                New Password
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Enter New Password"
                  placeholderTextColor={COLORS.black}
                  secureTextEntry={isPasswordShown}
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      password: text,
                    }))
                  }
                />

                <TouchableOpacity
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordShown ? (
                    <Ionicons name="eye" size={24} color={COLORS.black} />
                  ) : (
                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 12 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Password Confirmation
              </Text>

              <View
                style={{
                  width: "100%",
                  height: 48,
                  borderColor: COLORS.black,
                  borderWidth: 1,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                }}
              >
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  secureTextEntry={isPasswordConfirmShown}
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      passwordConfirmation: text,
                    }))
                  }
                />
                <TouchableOpacity
                  onPress={() =>
                    setIsPasswordConfirmShown(!isPasswordConfirmShown)
                  }
                  style={{
                    position: "absolute",
                    right: 12,
                  }}
                >
                  {isPasswordConfirmShown ? (
                    <Ionicons name="eye" size={24} color={COLORS.black} />
                  ) : (
                    <Ionicons name="eye-off" size={24} color={COLORS.black} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ flex: 0.48, marginBottom: 12 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8,
                  }}
                >
                  District
                </Text>

                <View
                  style={{
                    width: "100%",
                    height: 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                  }}
                >
                  <TextInput
                    placeholder="Edit District"
                    placeholderTextColor={COLORS.black}
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 0.48, marginBottom: 12 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8,
                  }}
                >
                  Street
                </Text>

                <View
                  style={{
                    width: "100%",
                    height: 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                  }}
                >
                  <TextInput
                    placeholder="Edit Street"
                    placeholderTextColor={COLORS.black}
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
              <View style={{ flex: 0.48, marginBottom: 12 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginVertical: 8,
                  }}
                >
                  Door Number
                </Text>

                <View
                  style={{
                    width: "100%",
                    height: 48,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                  }}
                >
                  <TextInput
                    placeholder="Edit Door Number"
                    placeholderTextColor={COLORS.black}
                    keyboardType="numeric"
                    style={{
                      width: "100%",
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 0.48, marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Address
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="Edit Open Address"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Mobile Number
            </Text>

            <View
              style={{
                width: "100%",
                height: 48,
                borderColor: COLORS.black,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingLeft: 22,
              }}
            >
              <TextInput
                placeholder="+91"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "12%",
                  borderRightWidth: 1,
                  borderLeftColor: COLORS.grey,
                  height: "100%",
                }}
              />

              <TextInput
                placeholder="Edit phone number"
                placeholderTextColor={COLORS.black}
                keyboardType="numeric"
                style={{
                  width: "80%",
                }}
                onChangeText={(text) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    phoneNumber: text,
                  }))
                }
              />
            </View>
          </View>

          {/* Add other fields for editing here */}

          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 8,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Update</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Cancel Editing
            </Text>
            <Pressable onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Go Back
              </Text>
            </Pressable>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: COLORS.primary,
              borderRadius: 8,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <Text style={{ color: COLORS.red, fontSize: 18 }}>log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessEdit;

// const BusinessEdit = ({ navigation }) => {
//   const [isPasswordShown, setIsPasswordShown] = useState(true);
//   const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(true);
//   const [isChecked, setIsChecked] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     // Add other fields you want to edit here
//   });

//   useEffect(() => {
//     // Fetch the data for editing and populate the formData state
//     const fetchDataForEditing = async () => {
//       try {
//         const response = await axios.get(
//           "https://your-api-endpoint-for-editing"
//         );
//         const data = response.data; // Replace this with your API response structure

//         setFormData(data);
//       } catch (error) {
//         console.error("Error fetching data for editing", error);
//       }
//     };

//     fetchDataForEditing();
//   }, []);

//   const handleUpdate = () => {
//     // Add logic to send the updated data to your API for editing
//     const apiUrl = "https://your-api-endpoint-for-updating";

//     axios
//       .put(apiUrl, formData)
//       .then((response) => {
//         navigation.navigate("Profile"); // Replace "Profile" with the appropriate screen name
//         console.log("Update successful", response.data);
//       })
//       .catch((error) => {
//         console.error("Error during update", error);
//         Alert.alert("Error", "An error occurred while updating.");
//       });
//   };
