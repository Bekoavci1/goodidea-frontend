import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    TextInput,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, images } from '../constants'
import {
    MaterialIcons,
    Ionicons,
    Feather,
    Foundation,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { friends } from '../constants/data'
import  { useState } from 'react';
import { Modal } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { HTTP_REQUESTS } from "../api/httpRequestService/httpRequestService";
import axios from 'axios';

const users = [images.user1, images.user2, images.user3, images.user4]

const Feed = () => {
    const [lati,setLatitude]=useState('');
    const[longi,setLongtitude]=useState('');
    async function getLocationAsync() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Konum izni reddedildi');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongtitude(location.coords.longitude);
      
        
        console.log('lati: ', location.coords.latitude);
        console.log('longti: ', location.coords.longitude);
    }
    const [isLiked, setIsLiked] = useState(true);
    const [likeCount, setLikeCount] = useState(22);
   
   
    const feedData = [
        {
            id: 1,
            username: 'Emre Arslan',
            hashtag: '#goodıdea',
            text: '#So who am I\nIn this world of virtual connections. It is important to remember the value of real, meaningful relationships',
            imageSource:  require('../assets/w8pk-hero.jpg')
        },
      
        
    ];

    const [isMapModalVisible, setMapModalVisible] = useState(false);
    const openMapModal = () => {
        setMapModalVisible(true);
      };
    
      const closeMapModal = () => {
        setMapModalVisible(false);
      };

      const handleLikePress = () => {
        if (isLiked) {
            // Eğer beğeni yapılmışsa, beğeni durumunu kaldır ve beğeni sayısını azalt
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        } else {
            // Eğer beğeni yapılmamışsa, beğeni durumunu aktif et ve beğeni sayısını artır
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        }
    };
    

    useEffect(() => {
        getLocationAsync();
        console.log("selamun aleyküm burası post");
        const fetchData = async () => {
            try {
                const response = await axios.get('https://goodidea.azurewebsites.net/api/posts/getposts?lati='+ lati +'&longi='+longi); 
                console.log("postlar geliyor: ",response.data);
            } catch (error) {
                console.error("Postlar gelmiyor", error);
            }
        };
        fetchData();
      }, []);


    function renderSuggestionsContainer() {
        return (
            <View>
                <View style={{ marginVertical: 8 }}>
                    <Text style={{ ...FONTS.h3,textAlign:'center' }}>GOOD IDEA</Text>
               
                </View>

                <FlatList
                    horizontal={true}
                    data={friends}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <View
                            key={item.id}
                            style={{
                                flexDirection: 'column',
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                           
                        </View>
                    )}
                />
            </View>
        )
    }

    function renderFeedPost() {
        return (
            
            <View
                style={{
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    width: '100%',
                    borderRadius: 26,
                    borderWidth: 1,
                    borderColor: '#fff',
                    marginVertical: 12,
                }}
            >
                {/* Post header */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 8,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 8,
                        }}
                    >
                        <Image
                            source={images.user1}
                            style={{
                                height: 52,
                                width: 52,
                                borderRadius: 20,
                            }}
                        />

                        <View style={{ marginLeft: 12 }}>
                            <Text
                                style={{ ...FONTS.body4, fontWeight: 'bold' }}
                            >
                               Emre Arslan
                            </Text>
                            
                            <Text
                                style={{
                                    ...FONTS.body4,
                                    color: COLORS.primary,
                                    fontWeight: 'bold',
                                }}
                            >
                                #goodıdea
                            </Text>
                        </View>
                    </View>

                    <MaterialCommunityIcons
                        name="dots-vertical"
                        size={24}
                        color={COLORS.black}
                    />
                </View>

                {/* Post content */}

                <View
            style={{
                backgroundColor: '#fff',
                flexDirection: 'column',
                width: '100%',
                borderRadius: 26,
                borderWidth: 1,
                borderColor: '#fff',
                marginVertical: 12,
            }}
        >
           

            {/* Post content */}
            <View
                style={{
                    marginHorizontal: 8,
                    marginVertical: 8,
                }}
            >
                {/* Görsel */}
                <Image
                    source={feedData[0].imageSource} // İlgili gönderinin resim kaynağına göre güncelleyin
                    style={{
                        width: '100%',
                        height: 200, // İstenilen yükseklik
                        borderRadius: 20,
                    }}
                />
            </View>

            {/* Diğer gönderi içeriği */}
            <View
                style={{
                    marginHorizontal: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        fontFamily: 'regular',
                        color: COLORS.primary,
                        marginLeft: 4,
                    }}
                >
                    <TouchableOpacity onPress={openMapModal}>
                        <Text style={{ marginTop: 20, fontSize: 18, color: COLORS.primary }}>
                            <Ionicons
                                name="location-outline"
                                size={21}
                                color={COLORS.primary}
                            />
                            <Text>Open With Maps</Text>
                        </Text>
                    </TouchableOpacity>
                </Text>
            </View>

        </View>

                
                

                {/* Posts likes and comments */}

                <View
                    style={{
                        marginHorizontal: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: 6,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                       
                           <View
    style={{
        flexDirection: 'row',
        marginRight: SIZES.padding2,
    }}
>
<View
    style={{
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
    }}
>
<TouchableOpacity onPress={() => handleLikePress()}>
                    <Animatable.View
                        animation={isLiked ? 'pulse' : undefined}
                        duration={300}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                          <View>
                          <FontAwesome
  name={isLiked ? 'heart' : 'heart-o'}
  size={20}
  color={isLiked ? 'red' : 'black'}
  onPress={() => handleLikePress()}
/>

    </View>
    <Text>{likeCount} Beğeni</Text>
                    </Animatable.View>
                </TouchableOpacity>

               

</View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',

                                alignItems: 'center',
                            }}
                        >
                            <MaterialCommunityIcons
                                name="message-text-outline"
                                size={20}
                                color={COLORS.black}
                            />
                            <Text style={{ ...FONTS.body4, marginLeft: 2 }}>
                                22
                            </Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text
                                style={{ ...FONTS.body4, fontWeight: 'bold' }}
                            >
                                Liked By 340
                            </Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 10,
                            }}
                        >
                            {users.map((user, index) => (
                                <Image
                                    source={user}
                                    key={index}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        borderRadius: 999,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        marginLeft: -5,
                                    }}
                                />
                            ))}
                        </View>
                    </View>
                </View>

                <Modal
    animationType="slide"
    transparent={true}
    visible={isMapModalVisible}
>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View
            style={{
                width: '80%',
                aspectRatio: 1, // Kare boyut
                borderRadius: 20,
                overflow: 'hidden',
            }}
        >
            {/* Harita */}
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: 37.78825, // İstenilen başlangıç enlem değeri ile değiştirin
                    longitude: -122.4324, // İstenilen başlangıç boylam değeri ile değiştirin
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {/* Konum için işaretçi */}
                <Marker
                    coordinate={{
                        latitude: 37.78825, // Gönderi konumunun enlem değeri ile değiştirin
                        longitude: -122.4324, // Gönderi konumunun boylam değeri ile değiştirin
                    }}
                    title="Gönderi Konumu"
                    description="Bu, gönderinin konumudur."
                />
            </MapView>

            {/* Kapatma düğmesi */}
            <TouchableOpacity
                onPress={closeMapModal}
                style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: 20,
                    padding: 10,
                }}
            >
                <Text style={{ fontSize: 16, color: COLORS.primary }}>
                    Kapat
                </Text>
            </TouchableOpacity>
        </View>
    </View>
</Modal>

                <View
                    style={{
                        flexDirection: 'row',
                        marginHorizontal: 8,
                        paddingVertical: 18,
                        borderTopWidth: 1,
                        borderTopColor: '#FDF6ED',
                    }}
                >
                    <Image
                        source={images.user2}
                        resizeMode="contain"
                        style={{
                            height: 52,
                            width: 52,
                            borderRadius: 26,
                        }}
                    />

                    <View
                        style={{
                            flex: 1,
                            height: 52,
                            borderRadius: 26,
                            borderWidth: 1,
                            borderColor: '#CCC',
                            marginLeft: 12,
                            paddingLeft: 12,
                            justifyContent: 'center',
                        }}
                    >
                        <TextInput
                            placeholder="Add a comment"
                            placeholderTextColor="#CCC"
                        />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#E7E7E7' }}>
            <View style={{ flex: 1, paddingHorizontal: 22 }}>
               
                <ScrollView>
                    {renderSuggestionsContainer()}
                    {renderFeedPost()}
                    {renderFeedPost()}
                    {renderFeedPost()}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Feed