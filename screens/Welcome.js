import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../constants/colors';
import Button from '../components/Button';

const Welcome = ({ navigation }) => {

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.grey, COLORS.silver,COLORS.black]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    {/* <Image
                        source={require("../assets/hero1.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../assets/deneme.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    /> */}

                    

<Image
    source={require("../assets/logo2-removebg-preview.png")}
    style={{
        height: 300, // Yeni yükseklik değeri
        width: 300, // Yeni genişlik değeri

        position: "absolute",
        
        
        transform: [
            { translateX: 50 },
            { translateY: 50 },
        ]
    }}
/>
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 350,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.black,
                        textAlign:"center"
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.black,
                        textAlign:"center"
                    }}>Started</Text>

                    

                    <Button
                        title="Join As User"
                        onPress={() => navigation.navigate("Signup")}
                        style={{
                            marginTop: 50,
                            width: "100%",
                            
                        }}
                    />
                    <Button
                        title="Join As Business Owner"
                        onPress={() => navigation.navigate("SignupBusiness")}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    <View style={{
                        
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center",
                       
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.black,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}

export default Welcome