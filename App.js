import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font'
import { View, Text } from 'react-native'
import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import BottomTabNavigation from './navigation/BottomTabNavigation'
import { Login, Signup, Welcome, SignupBusiness, LoginBusiness } from "./screens";

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync()
export default function App() {

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
        initialRouteName='Welcome'
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
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Login from './Login'; 
// import Register from './Register';


// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login">
//         <Stack.Screen name="Login" component={Login} options={{ title: 'Giriş Yap' }} />
//         <Stack.Screen name="Register" component={Register} options={{ title: 'Kayıt Ol' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;
