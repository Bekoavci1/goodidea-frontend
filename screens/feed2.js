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
  
  const users = [images.user1, images.user2, images.user3, images.user4];
  
  const Feed = () => {
    const [directions, setDirections] = useState([]);
    const [lati, setLatitude] = useState("");
    const [longi, setLongtitude] = useState("");
    async function getLocationAsync() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Konum izni reddedildi");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongtitude(location.coords.longitude);
  
      console.log("lati: ", location.coords.latitude);
      console.log("longti: ", location.coords.longitude);
    }
    const [isLiked, setIsLiked] = useState(true);
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [likeCount, setLikeCount] = useState(22);
    const [refreshing, setRefreshing] = useState(false);
    const [isMapModalVisible, setMapModalVisible] = useState(false);
    const API_KEY = "AIzaSyDU_pWP66-BTzvW7AnEcQRSaBPutMzWxU4";
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
    const [address, setAddress] = useState();
    const getCoordinate = async () => {
      try {
        //yukarıyurtçu Turkuaz Toki Konutları no:4, yenimahalle/ankara/turkey montain cafe
        // const addresss =
        //   address.address.streetName +
        //   " " +
        //   address.address.streetNumber +
        //   " no:" +
        //   address.address.buildingNumber +
        //   ", " +
        //   address.address.district +
        //   "/" +
        //   address.address.city +
        //   "/" +
        //   address.address.country +
        //   " " +
        //   address.address.postCode +
        //   " "+
        //   address.name;
  
        const addressParts = [];
  
        if (address.address.streetName !== null) {
          addressParts.push(address.address.streetName);
        }
  
        if (address.address.streetNumber !== null) {
          addressParts.push(address.address.streetNumber);
        }
  
        if (address.address.buildingNumber !== null) {
          addressParts.push("no:" + address.address.buildingNumber);
        }
  
        if (address.address.district !== null) {
          addressParts.push(address.address.district);
        }
  
        if (address.address.city !== null) {
          addressParts.push("/" + address.address.city);
        }
  
        if (address.address.country !== null) {
          addressParts.push("/" + address.address.country);
        }
  
        if (address.address.postCode !== null) {
          addressParts.push(address.address.postCode);
        }
        if (address.name !== null) {
          addressParts.push(address.name);
        }
  
        const formattedAddress = addressParts.join(" ");
        console.log("formattedaddress:", formattedAddress);
        // const addresss = adress.country+adress.city;
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            formattedAddress
          )}&key=${API_KEY}`
        );
        // let Coordinate = await Promise.all(response);
  
        if (response.data.results.length > 0) {
          setLat(response.data.results[0].geometry.location.lat);
          setLng(response.data.results[0].geometry.location.lng);
          console.log("aq senin:", lat, " ", lng);
        } else {
          throw new Error("Adres bulunamadı.");
        }
      } catch (error) {
        console.error("Geocode hatası:", error);
        throw error;
      }
    };
    const getDirections = async () => {
      try {
        // Google Maps Directions API'yi çağırın ve başlangıç ve varış adreslerini belirtin
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=İşçi Blokları, 1495. Sk. No:11, 06530 Çankaya/Ankara&destination=İşçi Blokları, Mahallesi, Öğretmenler Cd. No:14, 06530 Çankaya/Ankara&key=AIzaSyDU_pWP66-BTzvW7AnEcQRSaBPutMzWxU4`
        );
  
        // API yanıtındaki rota bilgilerini alın
        const routes = response.data.routes;
  
        // Rota bilgilerini durumda saklayın
        setDirections(routes);
      } catch (error) {
        console.error("Rota alınamadı:", error);
      }
    };
  
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
  
    //   const selectedImageUri = route.params?.selectedImageUri;
  
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
  
    function renderFeedPost() {
      const [postlat, setPostlar] = useState([]);
      const [lati, setLatitude] = useState("");
      const [longi, setLongtitude] = useState("");
      const [photoDataa, setphotoDataa] = useState(null);
      const [items, setItems] = useState([]);
      const navigation = useNavigation();
  
      // const selectedImageUri = route.params?.selectedImageUri;
      const [userData, setUserData] = useState(null);
      async function getLocationAsync() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Konum izni reddedildi");
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongtitude(location.coords.longitude);
  
        console.log("lati: ", location.coords.latitude);
        console.log("longti: ", location.coords.longitude);
      }
     
  
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://goodidea.azurewebsites.net/api/posts/getposts?lati=" +
              lati +
              "&longi=" +
              longi
          );
          setPostlar(response.data);
  
          let businessRequests = response.data.flat().map((post) => {
            return axios.get(
              "https://goodidea.azurewebsites.net/api/Businesses/" +
                post.businessId
            );
          });
  
          let businessResults = await Promise.all(businessRequests);
          let businessesData = businessResults.map((response) => response.data);
          setItems((prevItems) => [...prevItems, ...businessesData]);
  
          if (businessesData) {
            businessesData.forEach((item) => {
              console.log("Received business data:", item);
              setAddress(item);
            });
            await Promise.all(businessesData);
            console.log("adresi set ettim kankr", address);
            await getCoordinate();
          } else {
            console.log("Buraya giremediğim için olmadı beler");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
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
  