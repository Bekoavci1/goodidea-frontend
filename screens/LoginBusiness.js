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
import { useBusinessId } from "./BusinessIdContext";

const Login = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { lati, longi, setLati, setLongi } = useBusinessId(); 
  const [lati1, setLati1] = useState(null);
  const [longi1, setLongi1] = useState(null);
  const [counter,setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  

  const getLocationAsync = () => {
    return new Promise(async (resolve, reject) => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Konum izni reddedildi");
          reject("Konum izni reddedildi");
          return;
        }
        resolve();
        let location = await Location.getCurrentPositionAsync({});
        console.log("lok:", location)
        setLati(location.coords.latitude);
        setLongi(location.coords.longitude);
        console.log("Gerçek lati benim lan:",lati);
        console.log("Gerçek longi benim lan:",longi);


        // await AsyncStorage.setItem("latigit", lati.toString())
        //   .then(async () => {
        //     // This code will run after the setItem operation is complete
        //     const lati11 = await AsyncStorage.getItem("latigit");
        //     console.log("amq seninde",lati11)
        //     setLati1(lati11);
        //     console.log("lati1", lati1);
        //   })
        //   .catch((error) => {
        //     console.error(
        //       "Error setting or getting AsyncStorage values1:",
        //       error
        //     );
        //   });
        // await AsyncStorage.setItem("longigit", longi.toString())
        //   .then(async () => {
        //     // This code will run after the setItem operation is complete
        //     const longi11 = await AsyncStorage.getItem("longigit");
        //     console.log("amq",longi11)
        //     setLongi1(longi11);
        //     console.log("longi1", longi1);
        //   })
        //   .catch((error) => {
        //     console.error(
        //       "Error setting or getting AsyncStorage values2:",
        //       error
        //     );
        //   });
        // setLatitude(39.99598364966966);
        // setLongtitude(32.71444633734151);
        // latii = location.coords.latitude;
        // longii = location.coords.longitude;
        // console.log("lati: ", location.coords.latitude);
        // console.log("longti: ", location.coords.longitude);

        // Konum alma işlemi tamamlandı, resolve ile işlemi bitir
      } catch (error) {
        console.error("Konum alınamadı:", error);
        reject(error);
      }
    });
  };

  const handleLogin = () => {
    setIsLoading(true);
    HTTP_REQUESTS.USER_SERVICE.LOGIN_BUSINESS(
      { Email: email, Password: password },
      (response) => {
        storeToken(response);
        if(isLocationReady)  {
          setIsLoading(false);
            navigation.navigate("BottomTabNavigation");
          } else {
            //getLocationAsync();
            setCounter(counter+1);
            //handleLogin();
          }
      },
      (error) => {
        setIsLoading(false);
        console.error("Giriş hatası:", error);
        Alert.alert("The Username or Password is wrong!");
      }
    );
  };
const [isLocationReady, setIsLocationReady] = useState(false);

useEffect(() => {
  if(lati && longi) setIsLocationReady(true);
}, [lati, longi]);
  useEffect(() => {
    getLocationAsync();
    console.log("Gerçek lati benim lan2:",lati);
    console.log("Gerçek longi benim lan2:",longi);
    const unsubscribe = navigation.addListener("focus", getLocationAsync);
      return () => {
        unsubscribe();
      };
  }, [counter]);

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
      <ScrollView>
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