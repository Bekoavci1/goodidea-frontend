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
const BusinessEdit = ({ navigation }) => {
  // const [isPasswordShown, setIsPasswordShown] = useState(true);
  // const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNumber: "",
    role: "",
    photoId: "",
    vatNumber: "",
    bio: "",
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
    // console.log("selamun aleyküm");
    HTTP_REQUESTS.USER_SERVICE.BUSINESS_EDIT_PROFILE_GET(
      (response) => {
        // console.log("datalar:", response);
        if (response) {
          setFormData({
            ...formData,
            id:response.id,
            name: response.name,
            email: response.email,
            password: response.password,
            passwordConfirmation: response.password,
            phoneNumber: response.phoneNumber,
            role: response.role,
            vatNumber: response.vatNumber,
            bio: response.bio,
            photoId : response.photoId,
            addressId: response.addressId ? String(response.addressId) : "", // Assuming it needs to be a string; if not, remove String()
            address: {
              id:response.address.id || "",
              country: response.address.country || "",
              city: response.address.city || "",
              buildingNumber: response.address.buildingNumber || "",
              district: response.address.district || "",
              postCode: response.address.postCode || "",
              streetName: response.address.streetName || "",
              streetNumber: response.address.streetNumber || "",
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
  }, []);

  const handleUpdate = () => {
    if(formData.address.postCode == "" || formData.address.postCode == null){
      formData.address.postCode = 0;
    }
    HTTP_REQUESTS.USER_SERVICE.BUSINESS_EDIT_PROFILE_PUT(
      formData,
      (response) => {
        Alert.alert("Sucsess", "Sucsess Profile.");
        navigation.navigate("Profile");
        console.log("Güncelleme başarılı", response);
      },
      (error) => {
        console.log(error)
        Alert.alert("Error","özge kızarsa kötü olur.");
      }
    );
  };

  const logOut = (response) => {
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
                    keyboardType="text"
                    style={{
                      width: "100%",
                    }}
                    value={formData.address.district}
                    onChangeText={(text) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        address: {
                          ...prevState.address,
                          district: text,
                        },
                      }))
                    }
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
                    value={formData.address.buildingNumber}
                    onChangeText={(text) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        address: {
                          ...prevState.address,
                          buildingNumber: text,
                        },
                      }))
                    }
                  />
                </View>
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
                  Street Number
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
                    keyboardType="text"
                    style={{
                      width: "100%",
                    }}
                    value={formData.address.streetNumber}
                    onChangeText={(text) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        address: {
                          ...prevState.address,
                          streetNumber: text,
                        },
                      }))
                    }
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
                    value={formData.address.streetName}
                    onChangeText={(text) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        address: {
                          ...prevState.address,
                          streetName: text,
                        },
                      }))
                    }
                  />
                </View>
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
                  PostCode
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
                    keyboardType="numeric"
                    style={{
                      width: "100%",
                    }}
                    value={String(formData.address.postCode)}
                    onChangeText={(text) =>
                      setFormData((prevState) => ({
                        ...prevState,
                        address: {
                          ...prevState.address,
                          postCode: parseInt(text),
                        },
                      }))
                    }
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
                  City
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
          </View>

          <View style={{ flex: 0.48, marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Country
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
                placeholder="+41"
                placeholderTextColor={COLORS.black}
                keyboardType="text"
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
                keyboardType="text"
                style={{
                  width: "80%",
                }}
                value={formData.phoneNumber}
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
            onPress={logOut}
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
