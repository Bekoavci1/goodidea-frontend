import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { View, Text } from 'react-native'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BottomTabNavigation from './navigation/BottomTabNavigation'
import { Login, Signup, Welcome, SignupBusiness,LoginBusiness, BusinessEdit } from "./screens";
import { getToken } from './auth/Auth';
import React, { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync()
export default function App() {

  // const [initialRoute, setInitialRoute] = useState('');
  const [initialRoute, setInitialRoute] = useState('Welcome');

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = await getToken();  // Token'ı alın
  //     if (token) {
  //       setInitialRoute('BottomTabNavigation');  // Eğer token varsa ana sayfaya yönlendir
  //     }
  //     console.log(getToken);
  //   };
  //   checkToken();
  // }, []);


  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      if (token) {
        setInitialRoute('BottomTabNavigation');  // Eğer token varsa ana sayfaya yönlendir
      } else {
        setInitialRoute('Welcome'); // Yoksa Welcome ekranına yönlendir
      }
    };
    checkToken();
  }, []);

  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Poppins-Black.ttf'),
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    mediumItalic: require('./assets/fonts/Poppins-MediumItalic.ttf'),
    semiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    semiBoldItalic: require('./assets/fonts/Poppins-SemiBoldItalic.ttf'),
})

const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
        await SplashScreen.hideAsync()
    }
}, [fontsLoaded])

if (!fontsLoaded) {
    return null
}
  
  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
        // initialRouteName={initialRoute}
        
        Updated upstream
          name="BottomTabNavigation"
          component={BottomTabNavigation}
          options={{
          headerShown: false,
          }}
        />

        <Stack.Screen
          name="SignupBusiness"
          component={SignupBusiness}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="LoginBusiness"
          component={LoginBusiness}
          options={{
            headerShown: false
          }}
        />
          <Stack.Screen
          name="BusinessEdit"
          component={BusinessEdit}
          options={{
            headerShown: false
          }}
        />
        {/* <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PhotoDetail" component={PhotoDetail} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}
