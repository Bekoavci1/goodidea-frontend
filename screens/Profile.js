import { View, Text, Image, useWindowDimensions, FlatList,Button,TouchableOpacity, Modal, TextInput, } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS, SIZES, images } from '../constants'
import { Feather, AntDesign, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import { useBusinessId } from './BusinessIdContext'
import HTTPClient from "../api/httpClient/httpClient";

const HighLightsRoute = () => (
    <View style={{ flex: 1, backfaceColor: 'blue' }}></View>
)

const TaggedRoute = () => (
    <View style={{ flex: 1, backfaceColor: 'blue' }}></View>
)

const Profile = ({ businessData, route }) => {
    const [userData, setUserData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState("");
    const [postProfıle, setpostProfıle] = useState([]);

    function renderProfileCard() {   
        const [photoDataa, setphotoDataa] = useState(null);
        const selectedImageUri = route.params?.selectedImageUri;
        const businessId = route.params?.businessId; 
        const { setBusinessId } = useBusinessId();
        const navigation = useNavigation();
        useEffect(() => {
            const fetchData = async () => {
                try {
                    var responsee = "asd";
                    if(businessId){
                        responsee = await axios.get('https://goodidea.azurewebsites.net/api/Businesses/'+businessId); // {id} kısmını gerçek bir ID ile değiştirmeniz gerekiyor.
                        setUserData(responsee.data);
                    }
                    else{ 
                        responsee = await axios.get('https://goodidea.azurewebsites.net/api/Businesses/'+businessData); // {id} kısmını gerçek bir ID ile değiştirmeniz gerekiyor.
                        setUserData(responsee.data);
                    }
                  an;
                    setBusinessId(responsee.data.id);
                    const photoId = responsee.data.photoId;
                    const response = await axios.get('https://goodidea.azurewebsites.net/api/Photos/photos/'+photoId); 
                    setphotoDataa(response.data);
                } catch (error) {
                    console.error("Veri çekerken bir hata oluştu", error);
                }
            };
            fetchData();
            const unsubscribe = navigation.addListener('focus', fetchData); 

            return () => {
                unsubscribe();
            };
        }, [navigation]);

        if (!userData) {
            return <Text>Loading...</Text>;
        }

        return (
            <View
                style={{
                    width: SIZES.width - 44,
                    height: 260,
                    marginHorizontal: 22,
                    paddingHorizontal: 6,
                    paddingVertical: 18,
                    borderColor: '#F7F7F7',
                    borderWidth: 1,
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#18274B',
                    shadowOffset: {
                        width: 0,
                        height: 4.5,
                    },
                    shadowOpacity: 0.12,
                    shadowRadius: 0.65,
                    elevation: 2,
                    borderRadius: 35,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>   
                    <TouchableOpacity onPress={() => navigation.navigate('LogoUpdate')}>
                        <Image
                            // source={{ uri: photoDataa?.photoUrl }}
                            source={{ uri: selectedImageUri || photoDataa?.photoUrl }}
                            resizeMode="contain"
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 55,
                                borderWidth: 4,
                                borderColor: '#ffffff',
                            }}
                        />
                    </TouchableOpacity>  
                    </View>

                    <View
                        style={{
                            flexDirection: 'column',
                            flex: 1,
                            marginLeft: 6,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ ...FONTS.body2, fontWeight: 'bold', }}>
                                {userData.name}
                                </Text>
                            </View>

                            <Feather
                                name="edit"
                                size={24}
                                color={COLORS.black}
                                onPress={() => navigation.navigate('BusinessEdit')}

                            />
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#FFF9E8',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    padding: 8,
                                }}
                            >
                                <Text style={{ ...FONTS.body4 }}>7</Text>
                                <Text style={{ ...FONTS.body4 }}>Posts</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginVertical: 12,
                                }}
                            >
                            </View>
                            <View
                                style={{
                                    backgroundColor: '#FFF9E8',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    padding: 8,
                                }}
                            >
                                <Text style={{ ...FONTS.body4 }}>24</Text>
                                <Text style={{ ...FONTS.body4 }}>
                                    Followers
                                </Text>
                            </View>

                            <View
                                style={{
                                    backgroundColor: '#FFF9E8',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    padding: 8,
                                }}
                            >
                                <Text style={{ ...FONTS.body4 }}>7</Text>
                                <Text style={{ ...FONTS.body4 }}>
                                    Followings
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'column',
                        marginVertical: 12,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'column',
                            marginVertical: 12,
                        }}
                    >
                        { userData.email && <Text style={{ ...FONTS.body4 }}>{userData.email}</Text> }
                        { userData.address && <Text style={{ ...FONTS.body4 }}>{userData.address.city}</Text> }
                        { userData.address && userData.address.country && <Text style={{ ...FONTS.body4 }}>{userData.address.country}</Text> }
                    </View>
                </View>
            </View>
        )
    }

    const PostsRoute = () => {
        const [postProfıle, setpostProfıle] = useState([]);
        const [photo, setPhoto] = useState("");
        const { businessId } = useBusinessId();
  
        useEffect(() => {
            const fetchData = async () => {
                try {
                    
                    const response = await axios.get('https://goodidea.azurewebsites.net/api/Posts/business/'+businessId); 
                    setpostProfıle(response.data);

                    if (response.data && response.data.photo) {
                        setPhoto(postProfıle.photo); 
                    }
                } catch (error) {
                    // console.log("asd",route);
                    console.error("Veri çekerken hata oluştu:", error);
                }
            };

            fetchData();
        }, []); 

        const openModalWithPost = (post) => {
            setSelectedPost(post);
            setModalVisible(true);
        }
        
        return (
        <View
            style={{
                flex: 1,
            }}
        >
            <FlatList
                data={postProfıle}
                numColumns={3}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            aspectRatio: 1,
                            margin: 3,
                        }}
                    >
                        <TouchableOpacity onPress={() => openModalWithPost(item)}>
                            <Image
                                key={index}
                                source={{ uri: item.photo && item.photo.photoUrl ? item.photo.photoUrl : 'defaultImageURL' }}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: 12,
                                }} 
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                position: 'absolute',
                                bottom: 4,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: 6,
                                }}
                            >
                                <Ionicons
                                    name="eye"
                                    size={14}
                                    color={COLORS.white}
                                />
                                <Text style={{ color: COLORS.white }}>
                                    {item.numOfViews}
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Ionicons
                                    name="heart-outline"
                                    size={14}
                                    color={COLORS.white}
                                />
                                <Text style={{ color: COLORS.white }}>
                                    {item.numOfViews}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
        );
    }

    const renderProfileScene = ({ route, jumpTo }) => {
        switch(route.key) {
            case 'first':
                return <PostsRoute />;
            case 'second':
                return <HighLightsRoute />;
            default:
                return null;
        }
    };

    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Posts', icon: 'square-outline' },
        { key: 'second', title: 'Highlights', icon: 'heart-outline' },
    ])
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: COLORS.secondary,
            }}
            renderIcon={({ route, focused, color }) => (
                <Ionicons
                    name={route.icon}
                    size={20}
                    color={focused ? COLORS.black : 'gray'}
                />
            )}
            style={{
                backgroundColor: '#fff',
                height: 64,
            }}
            renderLabel={({ focused, route }) => (
                <Text style={[{ color: focused ? COLORS.black : 'gray' }]}>
                    {route.title}
                </Text>
            )}
        />
    )

    function renderButtions() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 22,
                    marginVertical: 12,
                }}
            >
                <LinearGradient
                    colors={['#007260', '#007260']}
                    style={{
                        height: 40,
                        width: 150,
                        borderRadius: SIZES.padding * 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AntDesign name="adduser" size={24} color={COLORS.white} />
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginLeft: 12,
                            color: COLORS.white,
                        }}
                    >
                        Follow
                    </Text>
                </LinearGradient>

                <LinearGradient
                    // colors={['#F68464', '#EEA849']} full turuncu yapıyor
                    colors={['#007260', '#007260']}
                    style={{
                        height: 40,
                        width: 150,
                        borderRadius: SIZES.padding * 3,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <AntDesign name="message1" size={24} color={COLORS.white} />
                    <Text
                        style={{
                            ...FONTS.body4,
                            marginLeft: 12,
                            color: COLORS.white,
                        }}
                    >
                        Message
                    </Text>
                </LinearGradient>
            </View>
        )
    }
    
    const deletePost = async (postId) => {
        let client = new HTTPClient();
        const token = await client.setAuthTokenAccess2();
        try {
            const response = await axios.delete('https://goodidea.azurewebsites.net/api/Posts/'+postId, {
            headers: {
                "Authorization": token
            }
        });
            const updatedPosts = postProfıle.filter(post => post.id !== postId);
            setpostProfıle(updatedPosts);
            setModalVisible(false);
        } catch (error) {
            console.error("delete error:", error);
        }
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}
        >
            <View style={{ flex: 1 }}>
                {/* {renderPhotos()} */}
                {renderProfileCard()}
                {renderButtions()}
                <TabView
                    navigationState={{ index, routes }}
                    // renderScene={renderScene}
                    renderScene={renderProfileScene}
                    renderTabBar={renderTabBar}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
                {isModalVisible && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            activeOpacity={1}
                            onPressOut={() => setModalVisible(false)}
                        >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 1)' }}>
                                {/* Image */}
                                <Image source={{ uri: selectedPost.photo.photoUrl }} style={{ width: '80%', height: '50%', marginBottom: 20 }} />

                                {/* Comment Section - Placeholder */}
                                <View style={{ width: '80%', padding: 10, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 10, marginBottom: 20 }}>
                                    <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                                    onChangeText={text => setComment(text)}
                                    value={comment}
                                    placeholder="Write a comment..."
                                />
                                </View>

                                {/* Delete Button */}
                                <Button title="Delete" onPress={() => deletePost(selectedPost.id)} />
                            </View>
                        </TouchableOpacity>
                    </Modal>
                )}
            </View>
        </SafeAreaView>
    )
}
export default Profile