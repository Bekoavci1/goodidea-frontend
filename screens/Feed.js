import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  RefreshControl,
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
import { useVeri } from "../screens/LoginBusiness";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lati, longi } from "./BusinessIdContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useMemo } from "react";
import { getLoggedInUserData } from "../auth/Auth";
import * as SecureStore from "expo-secure-store";
import { postData, businessResultData } from "./data";

const Feed = () => {
  //useStateler
  const [isMapModalVisible, setIsMapModalVisible] = useState(false);
  const [selectedPostLocation, setSelectedPostLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [isLoading, setIsLoading] = useState(true); // Loading durumu
  let counter2 = -1;
  let counter3 = 0;
  const [directions, setDirections] = useState([]);
  const [isLiked, setIsLiked] = useState(true);
  const [lat, setLat] = useState([]);
  const [lng, setLng] = useState([]);
  const [likeCount, setLikeCount] = useState(22);
  const [refreshing, setRefreshing] = useState(false);
  const [address, setAddress] = useState(null);
  const [postlat, setPostlar] = useState([]);
  const [photoDataa, setphotoDataa] = useState(null);
  const [items, setItems] = useState([]);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [late, setLate] = useState([]);
  const [longe, setLonge] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1); // Current page

  let busines = [];
  let lat1;
  let long1;
  let latArray = [];
  let longArray = [];
  let direksiyon = [];

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

  const MapModal = ({ isVisible, lat, lng, onClose, onSetRoutePress }) => {
    return (
      <Modal visible={isVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              padding: 10,
              zIndex: 2,
            }}
          >
            <Ionicons
              name="close"
              size={40}
              color="black"
              style={{ top: 20 }}
            />
          </TouchableOpacity>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
          >
            <Marker coordinate={{ latitude: lat, longitude: lng }} />
          </MapView>
          <TouchableOpacity
            onPress={() => onSetRoutePress(lat, lng)}
            style={{
              position: "absolute",
              bottom: 30,
              left: 250,

              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 20,
              backgroundColor: "white", // Set the background color to white
              zIndex: 2,
              borderWidth: 1,
              borderColor: COLORS.primary, // Add a border with the primary color
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: COLORS.primary,
                textAlign: "center",
              }}
            >
              <Ionicons
                name="location-outline"
                size={21}
                color={COLORS.primary}
              />
              Set Route
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  //fetch data fonk(post ve business istekleri)
  const fetchData = async () => {
    try {
      const lats = await AsyncStorage.getItem("lats");
      const longs = await AsyncStorage.getItem("longs");
    
      var posts = postData.flat();
      setPostlar(posts);

      var businessesData = businessResultData.flat();
      setItems((prevItems) => [...prevItems, ...businessesData]);
      var i = 0;
     

      if (businessesData) {
        for (const item of businessesData) {
          const addressParts = [];
         
          if (item && item.address && item.address.streetName !== null) {
            addressParts.push(item.address.streetName);
          }

          if (item && item.address && item.address.streetNumber !== null) {
            addressParts.push(item.address.streetNumber);
          }

          if (item && item.address && item.address.buildingNumber !== null) {
            addressParts.push("no:" + item.address.buildingNumber);
          }

          if (item && item.address && item.address.district !== null) {
            addressParts.push(item.address.district);
          }

          if (item && item.address && item.address.city !== null) {
            addressParts.push("/" + item.address.city);
          }

          if (item && item.address && item.address.country !== null) {
            addressParts.push("/" + item.address.country);
          }
          if (item && item.address && item.address.postCode !== null) {
            addressParts.push(item.address.postCode);
          }
          if (item && item.name !== null) {
            addressParts.push(item.name);
          }
          const formattedAddress = addressParts.join(" ");

          await getDirections(formattedAddress, lats, longs);

          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              formattedAddress
            )}&key=${API_KEY}`
          );
          //console.log("8");
          if (response.data.results.length > 0) {
            latArray[i] = response.data.results[0].geometry.location.lat;
            longArray[i++] = response.data.results[0].geometry.location.lng;
            //console.log("9");
          } else {
            throw new Error("Adres bulunamadı.");
          }
        }
      }
      // console.log("9")
      for (let index = 0; index < directions.length; index++) {
        
      }
      setDirections([...direksiyon]);
      setLate([...latArray]);
      setLonge([...longArray]);
      // console.log("10");
      setIsLoading(false);
      // console.log("11");
    } catch (error) {
  
    }
  };
  const getDirections = async (addressGet, lats, longs) => {
    try {
      // Google Maps Directions API'yi çağırın ve başlangıç ve varış adreslerini belirtin
      // console.log("Gerçek adres benim ananın amı:", addressGet);
      //console.log("API_KEY:", API_KEY);

      const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lats},${longs}&key=AIzaSyDU_pWP66-BTzvW7AnEcQRSaBPutMzWxU4`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === "OK" && data.results[0]) {
        const address = data.results[0].formatted_address;
        // console.log("Adres:", address);

        const responsee = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${address}&destination=${addressGet}&key=AIzaSyDU_pWP66-BTzvW7AnEcQRSaBPutMzWxU4`
        );
        //console.log("responseum benim", responsee);

        // API yanıtındaki rota bilgilerini alın
        const routes = responsee.data.routes;
        

        // Rota bilgilerini durumda saklayın
        //  console.log(postlat.length)

        if (responsee.data.routes.length > 0) {
      
          // directions.push(routes[0].legs[0].distance.text);
          direksiyon.push(routes[0].legs[0].distance.text);
        }
      } else {
     
      }
    } catch (error) {
  
    }
  };

  ///Harita fonk

  const navigasyonuAc = (lat, lng) => {
    const hedefEnlem = lat; // Hedefinizin enlem değerini değiştirin
    const hedefBoylam = lng; // Hedefinizin boylam değerini değiştirin
    //console.log("vbvnbc", latArray[index], " ", longArray[index]);
    //console.log("navigasyonAç  lat:"+late[index]+" long:"+longe[index])
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hedefEnlem},${hedefBoylam}`;

    Linking.openURL(url)
      .then(() => console.log("Navigasyon başarıyla açıldı"))
      .catch((error) =>
        console.error("Navigasyon açılırken hata oluştu", error)
      );
  };

  //Kardelen Mah Başkent Bulvarı. No: 224 H, 06370 Yenimahalle/Ankara
  var counter = 0;

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
      // getLocationAsync();
      fetchData();
      // SecureStore.getItemAsync('userData').then((userDataa) => {
      //   console.log("sadsaf",userDataa)
      // setUserData(JSON.parse(userDataa))
      //   console.log("434rfef",userData.id)

      // })
      //getDirections();
      const verileriAl = async () => {
        try {
          //console.log("dsadfsad:", lati, " ", longi);
        } catch (error) {

        }
      };
      verileriAl();
      setLng(longArray);
      setLat(latArray);
      // var logged = getLoggedInUserData();
      // console.log("loggedInUserData:",logged );
      // //console.log(late, "wasda", longe);

      const unsubscribe = navigation.addListener("focus", fetchData);
      return () => {
        unsubscribe();
      };
    }, [postlat.length]);

    var counter = 0;
    return (
      <View>
        {postlat
          .flat()
          .map((post, index) => (
            <View
              key={index}
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
                        navigation.navigate("SafariProfile", {
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

                    <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "left",
                    
                  }}
                >
                  <FontAwesome
                    name="map-marker"
                    size={20}
                    color={COLORS.primary}
                  />
                  <Text style={{ left:5 }}>{directions[index]}</Text>
                </View>


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
                  color={COLORS.primary}
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
                  onLayout={() => {
                    counter2++;
                    //console.log("COUNTERININDA MK", counter2);
                    //console.log("veriler as:", latArray);
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
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPostLocation({
                          lat: late[index],
                          lng: longe[index],
                        });
                        setIsMapModalVisible(true);
                      }}
                    >
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
                        <Text>Show on Maps</Text>
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              </View>
              <MapModal
                isVisible={isMapModalVisible}
                lat={selectedPostLocation.lat}
                lng={selectedPostLocation.lng}
                onClose={() => setIsMapModalVisible(false)}
                onSetRoutePress={(lat, lng) => navigasyonuAc(lat, lng)}
              />

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
                        latitude: late[index], // İstediğiniz enlem değeri ile değiştirin
                        longitude: longe[index], // İstediğiniz boylam değeri ile değiştirin
                        latitudeDelta: 0.01, // Yakınlaştırmayı artırmak veya azaltmak için bu değeri ayarlayın
                        longitudeDelta: 0.01, // Yakınlaştırmayı artırmak veya azaltmak için bu değeri ayarlayın
                      }}
                    >
                   
                      <Marker
                        coordinate={{
                          latitude: late[index], // İstediğiniz enlem değeri ile değiştirin
                          longitude: longe[index], // İstediğiniz boylam değeri ile değiştirin
                        }}
                        title="Gönderi Konumu"
                        description="Bu, gönderinin konumudur."
                      />
                      {/* {//console.log("latimarker:", late[index]," longi marker",longe[index])} */}
                    </MapView>

                    <View>
                      <View>
                        <Button title="Git" />
                      </View>
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
          ))
          .reverse()}
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E7E7E7" }}>
      <View style={{ flex: 1, paddingHorizontal: 22 }}>
        {/* Show loading spinner when isLoading is true */}

        <Spinner
          visible={isLoading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
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
