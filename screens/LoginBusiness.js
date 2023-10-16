import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "../components/Button";
import { storeToken } from "../auth/Auth";
import { HTTP_REQUESTS } from "../api/httpRequestService/httpRequestService";
import COLORS from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";


const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
 
 
  const handleLogin = () => {
    setTimeout(() => {
      Keyboard.dismiss();
    }, 100);

    HTTP_REQUESTS.USER_SERVICE.LOGIN_BUSINESS(
      { Email: email, Password: password },
      async (response) => {
          console.log("response LOGIN_BUSINESS**123 : ",response)
          await storeToken(response, "Business");
          navigation.navigate("BottomTabNavigation");
          setIsLoading(false);
      },
      (error) => {
        setIsLoading(false);
        console.error("Giriş hatası:", error);
        Alert.alert("The Username or Password is wrong!");
      }
    );
  };
 
  useEffect(() => {
  }, []);

  //deneme için dummy data
  // const handleLogin = async () => {
  //     try {
  //         let mockResponse;

  //         if (email === "Admin" && password === "123456") {
  //             // Sahte bir başarılı cevap oluşturuyoruz.
  //             mockResponse = {
  //                 status: 200,
  //                 data: "Başarılı giriş!"
  //             };
  //         } else {
  //             // Sahte bir hata mesajı oluşturuyoruz.
  //             mockResponse = {
  //                 status: 401,  // Yetkisiz erişim kodu
  //                 data: "Kullanıcı adı veya şifre yanlış!"
  //             };
  //         }

  //         if (mockResponse.status === 200) {
  //             // success
  //             navigation.navigate("BottomTabNavigation");
  //         } else {
  //             // error
  //             alert(mockResponse.data);
  //         }
  //     }
  //     catch (error) {
  //         console.error("Giriş hatası:", error);
  //         Alert.alert("Hata oluştu!");
  //     }

  // };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <ScrollView keyboardShouldPersistTaps='handled'>
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
              Hi Welcome Back ! 👋
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
              Email
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
                placeholder="Enter your Email"
                placeholderTextColor={COLORS.black}
                onChangeText={(text) => setEmail(text)}
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
                onChangeText={(text) => setPassword(text)}
                style={{
                  width: "100%",
                }}
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

            <Text>Remenber Me</Text>
          </View>

          {/* <Button
            onPress={handleLogin}
            title="Login"
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
          /> */}
           <Button
            onPress={handleLogin}
            title={isLoading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              "Login"
            )}
            filled
            style={{
              marginTop: 18,
              marginBottom: 4,
            }}
            disabled={isLoading}
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
            <Text style={{ fontSize: 14 }}>Or Login with</Text>
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
              Don't have an account ?{" "}
            </Text>
            <Pressable onPress={() => navigation.navigate("SignupBusiness")}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.primary,
                  fontWeight: "bold",
                  marginLeft: 6,
                }}
              >
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;