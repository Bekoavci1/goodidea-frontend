import * as SecureStore from 'expo-secure-store'


export const storeToken = (token) => {
    if (!token) {
        console.error("Geçersiz token değeri:", token);
        throw 'No token';
    }
    try{
        SecureStore.setItemAsync('accessToken', token)
    }catch(err){
        console.log("error storeToken: ",err)
        throw err
    }

};

export const getToken = () => {
    try {
        return SecureStore.getItemAsync('accessToken')
    } catch (error) {
        console.error("Token alınırken hata:", error);
        throw error
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
