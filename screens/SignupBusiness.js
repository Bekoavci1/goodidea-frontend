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
import DateTimePicker from "@react-native-community/datetimepicker";
import { DatePickerIOS } from "react-native";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import axios from "axios";




const SignupBusiness = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    
    email: '',
    password: "",
    passwordConfirmation: "",
    name: "",
    surname: "",
    birthday: "2023-08-29", // buna bak entegre edemedim
    phoneNumber: "",
    gender: "male",
    bio: "",
    role: 'string',
    vatNumber:'string',
    logo:'string',
    createdTime: "2023-08-29T23:57:58.856Z",
    updatedTime: "2023-08-29T23:57:58.856Z",
    deletedTime: "2023-08-29T23:57:58.856Z",
    addressId: "3",
    address: {
        country: "",
        city: "",
        // district: "",
        // postCode: null,
        // streetName: "",
        // streetNumber: "",
        // buildingNumber: ""
    }

});

const handleSignup = () => {
  // if (formData.password !== formData.passwordConfirmation) {
  //     console.log("pas",formData.password)
  //     Alert.alert('Error', 'Passwords do not match!');
  //     return;

  // }
  console.log(formData);
  const apiUrl = 'https://goodidea.azurewebsites.net/api/register-business';

  axios.post(apiUrl, formData)
  .then((response) => {
      navigation.navigate("BottomTabNavigation"); // bunu sonra login olarak değiştir
      console.log("Signup successful", response.data);
  })
  .catch((error) => {
      console.error("Error during signup", error);
      Alert.alert('Error', 'An error occurred while signing up.');7
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
 

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const handleDoneButton = () => {
    setShowDatePicker(false);
    
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
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
                onChangeText={(text) => setFormData(prevState => ({ ...prevState, name: text }))}
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
                onChangeText={(text) => setFormData(prevState => ({ ...prevState, email: text }))}

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
                onChangeText={(text) => setFormData(prevState => ({ ...prevState, password: text }))}

              />

              <TouchableOpacity
                onPress={() => setIsPasswordShown(!isPasswordShown)}
                style={{
                  position: "absolute",
                  right: 12,
                }}
              >
                {isPasswordShown == true ? (
                  <Ionicons name="eye-off" size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name="eye" size={24} color={COLORS.black} />
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
                secureTextEntry={isPasswordShown}
                
                style={{
                  width: "100%",
                }}
                onChangeText={(text) => setFormData(prevState => ({ ...prevState, passwordConfirmation: text }))}

              />
              
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
                    placeholder="Enter Country"
                    placeholderTextColor={COLORS.black}
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                    }}
                    value={formData.address.country}
                                    onChangeText={(text) => setFormData(prevState => ({
                                        ...prevState,
                                        address: {
                                            ...prevState.address,
                                            country: text
                                        }
                                    }))}
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
                    placeholder="Enter City"
                    placeholderTextColor={COLORS.black}
                    keyboardType="email-address"
                    style={{
                      width: "100%",
                    }}
                    value={formData.address.city}
                                    onChangeText={(text) => setFormData(prevState => ({
                                        ...prevState,
                                        address: {
                                            ...prevState.address,
                                            city: text
                                        }
                                    }))}
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
                    placeholder="Enter District"
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
                    placeholder="Enter Street"
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
                    placeholder="Enter Door Number"
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
                onChangeText={(text) => setFormData(prevState => ({ ...prevState, phoneNumber: text }))}
              />
            </View>
          </View>

          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                      marginVertical: 2,
                      textAlign: "center",
                    }}
                  >
                    Choose Date
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
                    }}
                  >
                    <TouchableOpacity
                     
                      
                      onPress={openDatePicker}
                      style={{
                        width: "100%",
                      }}
                    >
                      <Text style={{ fontSize: 18, textAlign: "center" }}>
                        {date.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="spinner"
                      onChange={onChangeDate}
                      onTouchCancel={() => setShowDatePicker(false)} 
                    />
                    
                  )}
                  <TouchableHighlight
  underlayColor="#DDDDDD" // Bu renk, butona dokunduğunuzda arka plan renginin değiştiğini gösterir
  onPress={handleDoneButton}
  style={{
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  }}
>
  <Text style={{ textAlign: 'center', color: 'black' }}>Done</Text>
</TouchableHighlight>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>

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