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
    
    let endpoint = "https://goodidea.azurewebsites.net/api/users/";

    if(role==='Business'){
        endpoint += "businessprofile";
    }
    else if (role==='User'){
        endpoint += "userprofile";
    } else {

        throw 'Invalid role';
    }
    
    try {
        const response = await axios.get(endpoint , {
            headers: {
                "Authorization": "bearer " + token,
            },
        });
       
        storeLoggedInUserData(response.data)
    } catch (error) {
       
    } 
};

export const storeToken = async (token,role) => {
    if (!token) {
    
        throw 'No token';
    }
    try{
        await SecureStore.setItemAsync('accessToken', token)
       
        await authClient(token,role)
    }catch(err){
      
        throw err
    }

};

const storeLoggedInUserData = (userData) => {
    
    if (!userData) {
       
        throw 'No token';
    }
    try{
        SecureStore.setItemAsync('userData', JSON.stringify(userData))
       
    }catch(err){
      
        throw err
    }

};

export const getLoggedInUserData = () => {
    try {
        return SecureStore.getItemAsync('userData')
    } catch (error) {
       
        throw error
    }
};

export const getToken = async () => {
    try {
      const userDataa = await SecureStore.getItemAsync('accessToken');
     
      return userDataa;
    } catch (error) {
     
      throw error;
    }
  };

export const removeToken = () => {
    try {
        SecureStore.deleteItemAsync('accessToken');
    } catch (error) {

        throw error
    }
};
