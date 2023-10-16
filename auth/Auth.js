import * as SecureStore from 'expo-secure-store'
import axios from 'axios';
import { useState } from 'react';

// authClient = async (token) => {
//     console.log("authClient : ",token)
//     if(role==='Business'){
//        try {
//         const response = await axios.get("https://goodidea.azurewebsites.net/api/Users/businessprofile", {
//             headers: {
//                 "Authorization": "bearer " + token,
//             },
//         });
//         console.log("authClient response.data :",response.data)
//         storeLoggedInUserData(response.data)
//     } catch (error) {
//         console.log("Error:", error);
//     } 
//     }
//     else if (role==='Users'){
//         try {
//             const response = await axios.get("https://goodidea.azurewebsites.net/api/Users/userprofile", {
//                 headers: {
//                     "Authorization": "bearer " + token,
//                 },
//             });
//             console.log("authClient response.data :",response.data)
//             storeLoggedInUserData(response.data)
//         } catch (error) {
//             console.log("Error:", error);
//         } 
//     }
    
// };
authClient = async (token, role) => {
    console.log("authClient : ",token)
    let endpoint = "https://goodidea.azurewebsites.net/api/users/";

    if(role==='Business'){
        endpoint += "businessprofile";
    }
    else if (role==='User'){
        endpoint += "userprofile";
    } else {
        console.error("Geçersiz role değeri:", role);
        throw 'Invalid role';
    }
    
    try {
        const response = await axios.get(endpoint , {
            headers: {
                "Authorization": "bearer " + token,
            },
        });
        console.log("authClient response.data :",response.data)
        storeLoggedInUserData(response.data)
    } catch (error) {
        console.log("Error:as", error);
    } 
};

export const storeToken = async (token,role) => {
    if (!token) {
        console.error("Geçersiz token değeri:", token);
        throw 'No token';
    }
    try{
        await SecureStore.setItemAsync('accessToken', token)
        console.log("storeToken çağırıldı")
        await authClient(token,role)
    }catch(err){
        console.log("error storeToken: ",err)
        throw err
    }

};

const storeLoggedInUserData = (userData) => {
    console.log("storeLoggedInUserData :",userData)
    if (!userData) {
        console.error("Geçersiz userData :", userData);
        throw 'No token';
    }
    try{
        SecureStore.setItemAsync('userData', JSON.stringify(userData))
        console.log("calısmıyorum")
    }catch(err){
        console.log("error storeLoggedInUserData: ",err)
        throw err
    }

};

export const getLoggedInUserData = () => {
    try {
        return SecureStore.getItemAsync('userData')
    } catch (error) {
        console.error("userData alınırken hata:", error);
        throw error
    }
};

export const getToken = async () => {
    try {
      const userDataa = await SecureStore.getItemAsync('accessToken');
      console.log('accessTokenas :', userDataa);
      return userDataa;
    } catch (error) {
      console.error('Token alınırken hata:', error);
      throw error;
    }
  };

export const removeToken = () => {
    try {
        SecureStore.deleteItemAsync('accessToken');
    } catch (error) {
        console.error("Token silinirken hata:", error);
        throw error
    }
};
