import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  DropDownPicker,
  ScrollView,
  Modal,
  Button as RNButton,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import DateTimePicker from "@react-native-community/datetimepicker";
import COLORS from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from '../components/Button';
import { SelectList } from 'react-native-dropdown-select-list'
import { HTTP_REQUESTS } from '../api/httpRequestService/httpRequestService';


const Signup = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isPasswordConfirmShown, setIsPasswordConfirmShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    surname: "",
    birthday: "2023-08-29", // buna bak entegre edemedim
    phoneNumber: "",
    gender: "male",
    bio: "",
    role: "string",
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
    },
  });


  const handleSignup = () => {
    if (formData.password !== formData.passwordConfirmation) {
      console.log("pas", formData.password);
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    console.log(formData);

    HTTP_REQUESTS.USER_SERVICE.REGISTER(
    formData,
    (response)=>{
        navigation.navigate("Login"); // bunu sonra login olarak değiştir
        console.log("Signup successful", response);
    },(error)=>{
        console.error("Error during signup", error);
        Alert.alert('Error', 'An error occurred while signing up.');
    })
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
 

  const [selected, setSelected] = React.useState("");

  const genderData = [
    { key: "1", value: "Male" },
    { key: "2", value: "Female" },
    { key: "3", value: "Other" },
  ];

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
                textAlign:"center"
              }}
            >
              Create Account
            </Text>
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
                Name
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
                  placeholder="Enter your Name"
                  placeholderTextColor={COLORS.black}
                  keyboardType="text"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) =>
                    setFormData((prevState) => ({ ...prevState, name: text }))
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
                Surname
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
                  placeholder="Enter your Surname"
                  placeholderTextColor={COLORS.black}
                  keyboardType="email-address"
                  style={{
                    width: "100%",
                  }}
                  onChangeText={(text) =>
                    setFormData((prevState) => ({
                      ...prevState,
                      surname: text,
                    }))
                  }
                />
              </View>
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
                // value={formData.Email}
                //     onChange={handleChange}
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
            onPress={() => setIsPasswordConfirmShown(!isPasswordConfirmShown)}
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

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 400,
                marginVertical: 8,
              }}
            >
              Username
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
                placeholder="Enter your Username"
                placeholderTextColor={COLORS.black}
                keyboardType="email-address"
                style={{
                  width: "100%",
                }}
                // value={formData.Username}
                //     onChange={handleChange}
                onChangeText={(text) =>
                  setFormData((prevState) => ({ ...prevState, username: text }))
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
              Gender
              </Text>

              <SelectList
            setSelected={(val) => setSelected(val)}
            data={genderData}
            save="value"
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
                placeholder="+49"
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
                // value={formData.PhoneNumber}
                // onChange={handleChange}
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

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
  <ScrollView
    style={{ flex: 1 }}
    contentContainerStyle={{ flexGrow: 1 }}
  >
    <View style={{ flex: 1, marginHorizontal: 22 }}>
      <View style={{ marginBottom: 12 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            height: 48,
            overflow: 'hidden', // Kenar dışı içeriğin sığmasını sağlar
            
          }}
        >
          <TouchableOpacity
            onPress={openDatePicker}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.lightGray, // Arka plan rengi
            }}
          >
            <Text style={{ fontSize: 16, textAlign: 'center', color: COLORS.black }}>
              Choose Date
            </Text>
            <Text> {`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`}</Text>
          </TouchableOpacity>
          <View
            style={{
              width: 1,
              backgroundColor: COLORS.black,
            }}
          />
          
        </View>

        {/* {showDatePicker && (
          <View>
            <DateTimePicker
              value={date}
              mode="date"
              display="spinner"
              onChange={onChangeDate}
              onTouchCancel={() => setShowDatePicker(false)}
            />
            <TouchableOpacity
              underlayColor="#DDDDDD"
              onPress={handleDoneButton}
              style={{
                marginTop: 8,
                paddingVertical: 10,
                backgroundColor: COLORS.grey,
                borderRadius: 20, // Yuvarlak kenarlıklar
                borderWidth: 1,
                borderColor: COLORS.black,
              }}
            >
              <Text style={{ fontSize: 16, textAlign: 'center', color: COLORS.black }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
      <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            marginLeft:6
          }}
        >
          <Checkbox
            style={{ marginRight: 6 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text style={{
            flexDirection: "row",
            marginVertical: 6,
            
          }}
          >I aggree to the terms and conditions</Text>
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
                color: COLORS.primary,
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

        
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
