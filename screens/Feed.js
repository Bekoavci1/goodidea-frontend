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
import { useBusinessId } from "./BusinessIdContext";
 

const Feed = () => {
  //useStateler
  const [directions, setDirections] = useState([]);
  const [isLiked, setIsLiked] = useState(true);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [likeCount, setLikeCount] = useState(22);
  const [refreshing, setRefreshing] = useState(false);
  const [isMapModalVisible, setMapModalVisible] = useState(false);
  const [address, setAddress] = useState(null);
  const [postlat, setPostlar] = useState([]);
  const [photoDataa, setphotoDataa] = useState(null);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const { lati, longi } = useBusinessId(); 
  let olamq1;
  let olamq2;
  let busines = [];
  
 
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
  
  //fetch data fonk(post ve business istekleri)
  const fetchData = async () => {
   // await getLocationAsync();
     try {
      // console.log("burası 6 lati:",lati);
      // console.log("burası 6 longti:",longi);

      olamq1=36.710577319030975;
      olamq2=28.894407302410606;
      const url = "https://goodidea.azurewebsites.net/api/posts/getposts?lati="+olamq1+"&longi="+olamq2;
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
  const getCoordinate = async () => {

    await fetchData();

    try {
      console.log("burası 16");
      const addressParts = [];

      if (busines[3] && busines[3].address && busines[3].address.streetName !== null) {
        addressParts.push(busines[3].address.streetName);
      }
  
      if (busines[3] && busines[3].address && busines[3].address.streetNumber !== null) {
        addressParts.push(busines[3].address.streetNumber);
      }
  
      if (busines[3] && busines[3].address && busines[3].address.buildingNumber !== null) {
        addressParts.push("no:" + busines[3].address.buildingNumber);
      }
  
      if (busines[3] && busines[3].address && busines[3].address.district !== null) {
        addressParts.push(busines[3].address.district);
      }
  
      if (busines[3] && busines[3].address && busines[3].address.city !== null) {
        addressParts.push("/" + busines[3].address.city);
      }
  
      if (busines[3] && busines[3].address && busines[3].address.country !== null) {
        addressParts.push("/" + busines[3].address.country);
      }
  
      if (busines[3] && busines[3].address && busines[3].address.postCode !== null) {
        addressParts.push(busines[3].address.postCode);
      }
  
      if (busines[3] && busines[3].name !== null) {
        addressParts.push(busines[3].name);
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

        setLat(response.data.results[0].geometry.location.lat);
        console.log("burası 23");

        setLng(response.data.results[0].geometry.location.lng);
        console.log("burası 24");

        console.log("aq senin:", lat, " ", lng);
      } else {
        throw new Error("Adres bulunamadı.");
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
      getCoordinate();
      //getDirections();
      const verileriAl = async () => {
        try {
  
          console.log("dsadfsad:",lati," ",longi);
          olamq1=lati;
          olamq2=longi;
        } catch (error) {
          console.error('konumu alamadım aq: ', error);
        }
      };
  
      verileriAl();

      const unsubscribe = navigation.addListener("focus", fetchData);
      return () => {
        unsubscribe();
      };
    }, [olamq1, olamq2]);

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
                      latitude: lat, // İstediğiniz enlem değeri ile değiştirin
                      longitude: lng, // İstediğiniz boylam değeri ile değiştirin
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    {/* Gönderi konumu için işaretçi */}
                    <Marker
                      coordinate={{
                        latitude: lat, // İstediğiniz enlem değeri ile değiştirin
                        longitude: lng, // İstediğiniz boylam değeri ile değiştirin
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
        <ScrollView>
          {renderSuggestionsContainer()}
          {renderFeedPost()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Feed;
