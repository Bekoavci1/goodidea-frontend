import * as SecureStore from 'expo-secure-store'

var asd = "asd";
export const storeToken =  async (token) => {
    if (!token) {
        console.error("Geçersiz token değeri:", token);
        throw 'No token';
    }
    try{
        asd = token;
        await SecureStore.setItemAsync('accessToken', token)
    }catch(err){
        console.log("error storeToken: ",err)
        throw err
    }

};

export const getToken = async () => {
    try {
        return await SecureStore.getItemAsync('accessToken');
    } catch (error) {
        console.error("Token alınırken hata:", error);
        throw error
    }
};

export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync('accessToken');
    } catch (error) {
        console.error("Token silinirken hata:", error);
        throw error
    }
};
