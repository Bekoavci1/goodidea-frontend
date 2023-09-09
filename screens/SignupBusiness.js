import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Button as RNButton,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import axios from "axios";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import ModalDropdown from "react-native-modal-dropdown"; // Import the library
const SignupBusiness = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const [cityname,setCityname] = useState("");
  const [countryname,setCountryname] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    phoneNumber: "",
    bio: "",
    role: "string",
    vatNumber: "string",
    logo: "string",
    createdTime: "2023-08-29T23:57:58.856Z",
    updatedTime: "2023-08-29T23:57:58.856Z",
    deletedTime: "2023-08-29T23:57:58.856Z",
    addressId: "3",
    address: {
      country: "",
      city: "",
      district: "",
      postCode: 5,
      streetName: "",
      streetNumber: "",
      buildingNumber: "",
    },
  });

  const styles = StyleSheet.create({
    dropdownContainer: {
      width: "100%",
      height: 48,
      borderColor: COLORS.black,
      borderWidth: 1,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      paddingLeft: 22,
      marginBottom: 12,
    },
    dropdown: {
      height: 48,
      width: "100%",
      color: "black",
      fontSize: 16,
      borderColor: "black",
      borderWidth: 0,
      borderRadius: 8,
    },
  });

  const handleSignup = () => {
    // if (formData.password !== formData.passwordConfirmation) {
    //     console.log("pas",formData.password)
    //     Alert.alert('Error', 'Passwords do not match!');
    //     return;

    // }
    console.log(formData);
    const apiUrl = "https://goodidea.azurewebsites.net/api/register-business";
    formData.address.country = countryname;
    formData.address.city = cityname;
    axios
      .post(apiUrl, formData)
      .then((response) => {
        navigation.navigate("LoginBusiness"); // bunu sonra login olarak değiştir
        console.log("Signup successful", response.data);
      })
      .catch((error) => {
        console.error("Error during signup", error);
        Alert.alert("Error", "An error occurred while signing up.");
        7;
      });

    // axios.post(apiUrl, {
    //     Username: "",
    //     Email: "",
    //     password: "",
    //     ConfirmPassword: "",
    //     Name: "",
    //     surname: "",
    //     phoneNumber: "",
    //     birthday: "",
    //     gender: "",
    //     bio: "",

    // })
    // .then((response) => {
    //     navigation.navigate("BottomTabNavigation");
    // })
    // .catch((error) => {
    //     Alert.alert('Error', 'An error occurred while signing up.');
    // });
  };
  useEffect(() => {
    // Axios ile ülke verilerini çekin
    axios
      .get("https://goodidea.azurewebsites.net/api/Businesses/countries") // Ülke verilerinin URL'sini buraya ekleyin
      .then((response) => {
        setCountries(response.data); // API'den gelen ülke verilerini ayarlayın
        // console.log("gelen ülkeler", response.data);
      })
      .catch((error) => {
        console.error("Ülke verileri alınamadı", error);
      });
  }, []);
 
  const handleCountryChange = (country) => {
    console.log("seçilen country:", country.baslik);
    setSelectedCountry(country.id);
    setCountryname(country.baslik);
    
    // Ülke bilgilerini almak için axios isteği
    axios
      .get("https://goodidea.azurewebsites.net/api/Businesses/cities/" + country.id)
      .then((response) => {
        setCities(response.data); // API'den gelen şehir verilerini ayarlayın
        console.log("gelen iller", response.data);
      })
      .catch((error) => {
        console.error("il verileri alınamadı", error);
      });
  
    console.log("seçilen ülke: ", selectedCountry);
  };
  const handleCityChange = (city) => {
    console.log("seçilen şehir: ", city.baslik);
    setSelectedCity(city.id);
    setCityname(city.baslik);
    
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
              Create Account
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
                placeholder="Enter name of the Business "
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                onChangeText={(text) =>
                  setFormData((prevState) => ({ ...prevState, name: text }))
                }
              />
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
                  onChangeText={(text) =>
                    setFormData((prevState) => ({ ...prevState, email: text }))
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
                Password
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
                  placeholder="Enter your password"
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
              <ModalDropdown
                options={countries.map((country) => country.baslik)}
                defaultValue="Select Country"
                onSelect={(index) => {
                  const selectedCountryId = countries[index]; // Seçilen ülkenin ID'sini al
                  handleCountryChange(selectedCountryId);
                }}
                style={styles.dropdownContainer}
              />
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
              <ModalDropdown
                options={cities.map((city) => city.baslik)}
                defaultValue="Select City"
                onSelect={(index) => {
                  const selectedCityId = cities[index]; // Seçilen ülkenin ID'sini al
                  handleCityChange(selectedCityId);
                }}
                style={styles.dropdownContainer}
              />
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
                placeholder="Enter Open Address"
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
                placeholder="Enter your phone number"
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

          <View
            style={{
              flexDirection: "row",
              marginVertical: 6,
            }}
          >
            <Checkbox
              style={{ marginRight: 8 }}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? COLORS.primary : undefined}
            />

            <Text>I aggree to the terms and conditions</Text>
          </View>

          <Button
            title="Sign Up"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            onPress={handleSignup}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
            <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: COLORS.grey,
                marginHorizontal: 10,
              }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../assets/ınstagram.jpg")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                height: 52,
                borderWidth: 1,
                borderColor: COLORS.grey,
                marginRight: 4,
                borderRadius: 10,
              }}
            >
              <Image
                source={require("../assets/google.png")}
                style={{
                  height: 36,
                  width: 36,
                  marginRight: 8,
                }}
                resizeMode="contain"
              />

              <Text>Google</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16, color: COLORS.black }}>
              Already have an account
            </Text>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.black,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupBusiness;
