import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { Linking } from "react-native";
import {
  MaterialIcons,
  Ionicons,
  Feather,
  Foundation,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { friends } from "../constants/data";
import { useState } from "react";
import { Modal } from "react-native";
import * as Animatable from "react-native-animatable";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect } from "react";
import { HTTP_REQUESTS } from "../api/httpRequestService/httpRequestService";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {useVeri} from "../screens/LoginBusiness"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lati,longi } from "./BusinessIdContext";
import Spinner from 'react-native-loading-spinner-overlay';
 

const Feed = () => {
  //useStateler
  const [isLoading, setIsLoading] = useState(true); // Loading durumu

  const [directions, setDirections] = useState([]);
  const [isLiked, setIsLiked] = useState(true);
  const [lat, setLat] = useState([]);
  const [lng, setLng] = useState([]);
  const [likeCount, setLikeCount] = useState(22);
  const [refreshing, setRefreshing] = useState(false);
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const [address, setAddress] = useState(null);
  const [postlat, setPostlar] = useState([]);
  const [photoDataa, setphotoDataa] = useState(null);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  let busines = [];
  let lat1;
  let long1;
  let latArray;
  let longArray

  
 
  //users prop
  const users = [images.user1, images.user2, images.user3, images.user4];
  //APIler
  const API_KEY = "AIzaSyDU_pWP66-BTzvW7AnEcQRSaBPutMzWxU4";
  //kaydırma ve refresh olayını sağlayan fonksiyon
  function renderSuggestionsContainer() {
    return (
      <View>
        <View style={{ marginVertical: 8 }}>
          <Text style={{ ...FONTS.h3, textAlign: "center" }}>GOOD IDEA</Text>
        </View>

        <FlatList
          horizontal={true}
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <View
              key={item.id}
              style={{
                flexDirection: "column",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
          )}
        />
      </View>
    );
  }
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
        lat1 = location.coords.latitude;
        long1 = location.coords.longitude;
        console.log("Gerçek lati benim lan:",lat1);
        console.log("Gerçek longi benim lan:",long1);
        
        getCoordinate();

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
  //fetch data fonk(post ve business istekleri)
  const fetchData = async () => {
  //  await getLocationAsync();
     try {
      // console.log("burası 6 lati:",lati);
      // console.log("burası 6 longti:",longi);
     
      
      const url = "https://goodidea.azurewebsites.net/api/posts/getposts?lati="+lat1+"&longi="+long1;
      const response = await axios.get(url);
        setPostlar(response.data);
    // console.log("burası 7 lati:",lati);
    //   console.log("burası 7 longti:",longi);

    console.log("burası 8");

    let businessRequests = response.data.flat().map((post) => {
      return axios.get(
        "https://goodidea.azurewebsites.net/api/Businesses/" + post.businessId
      );
    });
    console.log("burası 9");

    let businessResults = await Promise.all(businessRequests);
    console.log("burası 10");

    let businessesData = await Promise.all(businessResults.map((response) => response.data));
    console.log("burası 11");

    setItems((prevItems) => [...prevItems, ...businessesData]);
    console.log("burası 12");
    var i = 0;
    if (businessesData) {
      for (const item of businessesData) {
        
        console.log("business " + i+ "data",item);
        busines[i++] = item; // Veriyi eklerken boş bir nesne kullanın
      }
      console.log("burası 14");

      console.log("adresi set ettim kankr", address);
      console.log("burası 15");

      console.log("burası 25");


    } else {
      console.log("Buraya giremediğim için olmadı beler");
    }
    console.log("kanka postları çektim loadingi kapatcam",businessesData)
    
    
  } catch (error) {
    console.error("Error fetching data:", error);
    
  }
  };
  ///Harita fonk

  const navigasyonuAc = () => {
    const hedefEnlem = lat; // Hedefinizin enlem değerini değiştirin
    const hedefBoylam = lng; // Hedefinizin boylam değerini değiştirin
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hedefEnlem},${hedefBoylam}`;

    Linking.openURL(url)
      .then(() => console.log("Navigasyon başarıyla açıldı"))
      .catch((error) =>
        console.error("Navigasyon açılırken hata oluştu", error)
      );
  };
  //Kardelen Mah Başkent Bulvarı. No: 224 H, 06370 Yenimahalle/Ankara
  const getCoordinate = async () => {
    
    await fetchData();
    
    setIsLoading(false);
   
    try {
      console.log("burası 16");
      
      for(var i = 0;i<busines.length;i++){
         latArray = [...lat];
       longArray = [...lng];
        const addressParts = [];
      if (busines[i] && busines[i].address && busines[i].address.streetName !== null) {
        addressParts.push(busines[i].address.streetName);
      }
  
      if (busines[i] && busines[i].address && busines[i].address.streetNumber !== null) {
        addressParts.push(busines[i].address.streetNumber);
      }
  
      if (busines[i] && busines[i].address && busines[i].address.buildingNumber !== null) {
        addressParts.push("no:" + busines[i].address.buildingNumber);
      }
  
      if (busines[i] && busines[i].address && busines[i].address.district !== null) {
        addressParts.push(busines[i].address.district);
      }
  
      if (busines[i] && busines[i].address && busines[i].address.city !== null) {
        addressParts.push("/" + busines[i].address.city);
      }
  
      if (busines[i] && busines[i].address && busines[i].address.country !== null) {
        addressParts.push("/" + busines[i].address.country);
      }
  
      if (busines[i] && busines[i].address && busines[i].address.postCode !== null) {
        addressParts.push(busines[i].address.postCode);
      }
  
      if (busines[i] && busines[i].name !== null) {
        addressParts.push(busines[i].name);
      }
      console.log("burası 17");
      const formattedAddress = addressParts.join(" ");
      console.log("burası 18");
      console.log("formattedaddress:", formattedAddress);
      // const addresss = adress.country+adress.city;
      console.log("burası 19");
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          formattedAddress
        )}&key=${API_KEY}`
      );
      console.log("burası 20");
      // let Coordinate = await Promise.all(response);
      console.log("burası 21");
     
      if (response.data.results.length > 0) {
        
        console.log("burası 22");
        latArray.push(response.data.results[0].geometry.location.lat);

        setLat(latArray);
        console.log("burası 23");

        longArray.push(response.data.results[0].geometry.location.lng);

        setLng(longArray);
        console.log("burası 24");
        console.log("asd: ", lat, "fdsf: ",lng)

        console.log("aq senin:", lat, " ", lng);
      } else {
        throw new Error("Adres bulunamadı.");
      }
      
    }
     
    } catch (error) {
      console.error("Geocode hatası:", error);
      throw error;
    }
  };
  // const getDirections = async () => {
  //   try {
  //     // Google Maps Directions API'yi çağırın ve başlangıç ve varış adreslerini belirtin
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/directions/json?origin=İşçi Blokları, 1495. Sk. No:11, 06530 Çankaya/Ankara&destination=İşçi Blokları, Mahallesi, Öğretmenler Cd. No:14, 06530 Çankaya/Ankara&key=AIzaSyDU_pWP66-BTzvW7AnEcQRSaBPutMzWxU4`
  //     );

  //     // API yanıtındaki rota bilgilerini alın
  //     const routes = response.data.routes;

  //     // Rota bilgilerini durumda saklayın
  //     setDirections(routes);
  //   } catch (error) {
  //     console.error("Rota alınamadı:", error);
  //   }
  // };

  const openMapModal = () => {
    setMapModalVisible(true);
  };
  const closeMapModal = () => {
    setMapModalVisible(false);
  };

  //Beğeni fonk
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
  // genel view içeren fonk.
  function renderFeedPost() {
    useEffect(() => {
      
      

      getLocationAsync();
      
      
      
      
      //getDirections();
      const verileriAl = async () => {
        try {
  
          console.log("dsadfsad:",lati," ",longi);
        } catch (error) {
          console.error('konumu alamadım aq: ', error);
        }
      };
  
      verileriAl();
      

      const unsubscribe = navigation.addListener("focus", fetchData);
      return () => {
        unsubscribe();
      };
    }, [lat1, long1]);

    var counter = 0;
    return (
      <View>
        {postlat.flat().map((post, index) => (
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "column",
              width: "100%",
              borderRadius: 26,
              borderWidth: 1,
              borderColor: "#fff",
              marginVertical: 12,
            }}
          >
            {/* Post header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 8,
                }}
              >
                {/* <Image
                  // source={{ uri: logos[counter].photoUrl }}
                    style={{
                      height: 52,
                      width: 52,
                      borderRadius: 20,
                    }}
                  /> */}

                <View style={{ marginLeft: 12 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Profile", {
                        businessId: post.businessId,
                      })
                    }
                  >
                    {items[counter] && items[counter].name ? (
                      <Text style={{ ...FONTS.body2, fontWeight: "bold" }}>
                        {items[index].name}
                      </Text>
                    ) : null}
                  </TouchableOpacity>

                  <Text
                    style={{
                      ...FONTS.body4,
                      color: COLORS.primary,
                      fontWeight: "bold",
                    }}
                  >
                    {post.contentDescription || "#NoDescription"}
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
                backgroundColor: "#fff",
                flexDirection: "column",
                width: "100%",
                borderRadius: 26,
                borderWidth: 1,
                borderColor: "#fff",
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
                  source={{ uri: post.photo.photoUrl }} // İlgili gönderinin resim kaynağına göre güncelleyin
                  style={{
                    width: "100%",
                    height: 200, // İstenilen yükseklik
                    borderRadius: 20,
                  }}
                />
              </View>

              {/* Diğer gönderi içeriği */}
              <View
                style={{
                  marginHorizontal: 8,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "regular",
                    color: COLORS.primary,
                    marginLeft: 4,
                  }}
                >
                  <TouchableOpacity onPress={openMapModal}>
                    <Text
                      style={{
                        marginTop: 20,
                        fontSize: 18,
                        color: COLORS.primary,
                      }}
                    >
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
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 6,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: SIZES.padding2,
                  }}
                >
                  <View
                    style={{
                      marginHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity onPress={() => handleLikePress()}>
                      <Animatable.View
                        animation={isLiked ? "pulse" : undefined}
                        duration={300}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <FontAwesome
                            name={isLiked ? "heart" : "heart-o"}
                            size={20}
                            color={isLiked ? "red" : "black"}
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
                    flexDirection: "row",

                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="message-text-outline"
                    size={20}
                    color={COLORS.black}
                  />
                  <Text style={{ ...FONTS.body4, marginLeft: 2 }}>22</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text style={{ ...FONTS.body4, fontWeight: "bold" }}>
                    Liked By 340
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
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
                        borderColor: "#fff",
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
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
              >
                <View
                  style={{
                    width: "80%",
                    aspectRatio: 1, // Kare boyut
                    borderRadius: 20,
                    overflow: "hidden",
                  }}
                >
                  {/* Harita */}
                  <MapView
  style={{ flex: 1 }}
  initialRegion={{
    latitude: lat[counter], // İstediğiniz enlem değeri ile değiştirin
    longitude: lng[counter], // İstediğiniz boylam değeri ile değiştirin
    latitudeDelta: 0.01, // Yakınlaştırmayı artırmak veya azaltmak için bu değeri ayarlayın
    longitudeDelta: 0.01, // Yakınlaştırmayı artırmak veya azaltmak için bu değeri ayarlayın
  }}
>
  {/* Gönderi konumu için işaretçi */}
  <Marker
    coordinate={{
      latitude: lat[counter], // İstediğiniz enlem değeri ile değiştirin
      longitude: lng[counter], // İstediğiniz boylam değeri ile değiştirin
    }}
    title="Gönderi Konumu"
    description="Bu, gönderinin konumudur."
  />
</MapView>

                  <View>
                    <View>
                      <Button title="Git" onPress={navigasyonuAc} />
                    </View>
                    <Text>Rota Bilgileri:</Text>
                    {directions.map((route, index) => (
                      <View key={index}>
                        <Text>
                          Adım {index + 1} - Mesafe:{" "}
                          {route.legs[0].distance.text}
                        </Text>
                        <Text>
                          Adım {index + 1} - Süre: {route.legs[0].duration.text}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {/* Kapatma düğmesi */}
                  <TouchableOpacity
                    onPress={closeMapModal}
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
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
                flexDirection: "row",
                marginHorizontal: 8,
                paddingVertical: 18,
                borderTopWidth: 1,
                borderTopColor: "#FDF6ED",
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
                  borderColor: "#CCC",
                  marginLeft: 12,
                  paddingLeft: 12,
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="Add a comment"
                  placeholderTextColor="#CCC"
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E7E7E7" }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        {/* Show loading spinner when isLoading is true */}
        <Spinner
          visible={isLoading}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF' }}
        />
        <ScrollView>
          {renderSuggestionsContainer()}
          {renderFeedPost()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Feed;
