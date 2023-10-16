import React,{useState, useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { HTTP_REQUESTS } from "../api/httpRequestService/httpRequestService";

const ProfileUser = () => {
  const [userData, setUserData] = useState(null);
  const [userDat, setUserDat] = useState("");
  const [businessId,setBusinessId] = useState('');

  const [formData, setFormData] = useState({
    id: "",
    username: "",
    name: "",
    surname:"",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNumber: "",
    role: "",
    photoId: "",
    addressId: "",
    address: {
      id:"",
      country: "",
      city: "",
      buildingNumber: "",
      district: "",
      postCode: 0,
      streetName: "",
      streetNumber: "",
    },
    createdTime: "",
    updatedTime: "",
    deletedTime: "",
  });  
  useEffect(() => {
    HTTP_REQUESTS.USER_SERVICE.USER_EDIT_PROFILE_GET(
      (response)=> {
        
        if(response){
          console.log("beko",response);
          setFormData({
            ...formData,
            id:response.id,
            username:response.username,
            name: response.name,
            surname: response.surname,
            email: response.email,
            password: response.password,
            passwordConfirmation: response.password,
            phoneNumber: response.phoneNumber,
            role: response.role,
            photoId : response.photoId,
            addressId: response.addressId ? String(response.addressId) : "",
            address: {
              id:response.address.id || "",
              country: response.address.country || "",
              city: response.address.city || "",
              // buildingNumber: response.address.buildingNumber || "",
              // district: response.address.district || "",
              // postCode: response.address.postCode || "",
              // streetName: response.address.streetName || "",
              // streetNumber: response.address.streetNumber || "",
            },
            createdTime : response.createdTime,
            updatedTime : new Date().toISOString(),
            deletedTime : new Date().toISOString(),
          });
          console.log("aSA",response)
        }
      },
      (error) => {
        console.error("bilgileri çekemedik:", error);
      }
    );
    // fetchData();
  }, []);


  const navigation = useNavigation();
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToSecurity = () => {
    console.log("Security function");
  };

  const navigateToNotifications = () => {
    console.log("Notifications function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };

  const navigateToSubscription = () => {
    console.log("Subscription function");
  };

  const navigateToSupport = () => {
    console.log("Support function");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Terms and Policies function");
  };

  const navigateToFreeSpace = () => {
    console.log("Free Space function");
  };

  const navigateToDateSaver = () => {
    console.log("Date saver");
  };

  const navigateToReportProblem = () => {
    console.log("Report a problem");
  };

  const addAccount = () => {
    console.log("Aadd account ");
  };

  const logout = () => {
    console.log("Logout");
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Edit Profile",
      action: navigateToEditProfile,
    },
    { icon: "security", text: "Security", action: navigateToSecurity },
    {
      icon: "notifications-none",
      text: "Notifications",
      action: navigateToNotifications,
    },
    { icon: "lock-outline", text: "Privacy", action: navigateToPrivacy },
  ];

  const supportItems = [
    {
      icon: "credit-card",
      text: "My Subscription",
      action: navigateToSubscription,
    },
    { icon: "help-outline", text: "Help & Support", action: navigateToSupport },
    {
      icon: "info-outline",
      text: "Terms and Policies",
      action: navigateToTermsAndPolicies,
    },
  ];

  const cacheAndCellularItems = [
    {
      icon: "delete-outline",
      text: "Free up space",
      action: navigateToFreeSpace,
    },
    { icon: "save-alt", text: "Date Saver", action: navigateToDateSaver },
  ];

  const actionsItems = [
    {
      icon: "outlined-flag",
      text: "Report a problem",
      action: navigateToReportProblem,
    },
    { icon: "people-outline", text: "Add Account", action: addAccount },
    { icon: "logout", text: "Log out", action: logout },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        backgroundColor: COLORS.gray,
      }}
    >
      <MaterialIcons name={icon} size={20} color="black" />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3, marginBottom: 20  }}>Profile</Text>
      </View>
      <View style={{ flex: 30, alignItems: "center" }}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            marginVertical: 8,
          }}
        >
          {`${formData?.name || "Loading..."} ${formData?.surname || "Loading..."}`}
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
          }}
        >
          {formData?.email || "Loading..."}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            {`${formData.address?.city || "Loading..."} ${formData.address?.country || "Loading..."}`}
          </Text>
        </View>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 1 }}>Account</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {accountItems.map((item, index, navigate) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            Support & About{" "}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {supportItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Cache & Cellular */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            Cache & Cellular{" "}
          </Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Actions</Text>
          <View
            style={{
              borderRadius: 12,
              backgrounColor: COLORS.gray,
            }}
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUser;
