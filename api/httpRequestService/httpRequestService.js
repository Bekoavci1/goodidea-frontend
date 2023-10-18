import { getLoggedInUserData } from "../../auth/Auth";
import HTTPClient from "../httpClient/httpClient";
import * as SecureStore from "expo-secure-store";
const mainPath = "https://goodidea.azurewebsites.net/api";
//  'https://goodidea.azurewebsites.net/api/register-user'
async function getBusinessId() {
  let userDataa = await SecureStore.getItemAsync("userData");
  const parsedData = JSON.parse(userDataa);
  console.log("user data id", parsedData.id);
  return parsedData.id;
}
export const HTTP_REQUESTS = {
  USER_SERVICE: {
    LOGIN: (loginCredentials, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath = mainPath + "/Login/login-user";
      client.requestType = HTTPClient.REQUEST_TYPE.POST;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 20000; // 5 seconds
      client.addParameters(loginCredentials);
      client.send();
    },
    LOGIN_BUSINESS: (loginCredentials, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath = mainPath + "/Login/login-business";
      client.requestType = HTTPClient.REQUEST_TYPE.POST;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 20000; // 5 seconds
      client.addParameters(loginCredentials);
      client.send();
    },
    REGISTER: (registerCredentials, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath = mainPath + "/register-user";
      client.requestType = HTTPClient.REQUEST_TYPE.POST;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      
      client.addParameters(registerCredentials);
      client.send();
    },
    USER_EDIT_PROFILE_GET: (successCallback, errorCallback) => {
        let client = new HTTPClient();
        client.requestPath = mainPath + "/users/userprofile";
        client.requestType = HTTPClient.REQUEST_TYPE.GET;
        client.successCallback = successCallback;
        client.failCallback = errorCallback;
        
        client.send();
      },
    USER_EDIT_PROFILE_PUT: async (formData,successCallback, errorCallback) => {
        let client = new HTTPClient();
        let userId = await getBusinessId();
        client.requestPath = mainPath + "/users/"+ userId;
        client.requestType = HTTPClient.REQUEST_TYPE.PUT;
        client.successCallback = successCallback;
        client.failCallback = errorCallback;
        
        client.addParameters(formData);
        client.send();
    },
    BUSINESS_EDIT_PROFILE_GET: (successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath = mainPath + "/Users/businessprofile";
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      
      client.send();
    },
    // PROFILE_PHOTO_GET: (successCallback,errorCallback)=>{
    //     let client              = new HTTPClient();
    //     client.requestPath      = mainPath+'/Posts/1'
    //     client.requestType      = HTTPClient.REQUEST_TYPE.GET;
    //     client.successCallback  = successCallback;
    //     client.failCallback     = errorCallback;
    //     client.timeout          = 20000; // 5 seconds
    //     client.send();
    // },
    BUSINESS_EDIT_PROFILE_PUT: async (
      registerCredentials,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      let userId = await getBusinessId();
      client.requestPath = mainPath + "/Businesses/" + userId;
      client.requestType = HTTPClient.REQUEST_TYPE.PUT;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
     
      client.addParameters(registerCredentials);
      client.send();
    },
    USERS: (loginCredentials, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath = mainPath + "/Users";
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      
      client.addParameters(loginCredentials);
      client.send();
    },
    PHOTO_POST: (postCredentials, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath = mainPath + "/Posts";
      client.requestType = HTTPClient.REQUEST_TYPE.POST;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      
      client.addParameters(postCredentials);
      client.send();
    },
    POST: (lati, longi, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath =
        mainPath + "/Posts/getposts?lati=" + lati + "&longi=" + longi;
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      
      client.send();
    },
    // POST_CREATE: (successCallback, errorCallback, formData) => {
    //     let client = new HTTPClient();
    //     client.requestPath = mainPath + '/posts';
    //     client.requestType = HTTPClient.REQUEST_TYPE.POST;
    //     client.successCallback = successCallback;
    //     client.failCallback = errorCallback;
    //     client.timeout = 20000; // 5 seconds
    //     client.contentType = "multipart/form-data",
    //     client.acceptType = "multipart/form-data",
    //     client.formData = formData;
    //     client.send();
    // },
    GET_ALL: (calendarId, search, successCallback, errorCallback) => {
      let searchParams = new URLSearchParams();
      if (search) {
        searchParams.append("search", search);
      }
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.GET_ALL(calendarId);
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 10000; //For example 10 sec
      client.setAuthTokenAccess();
      client._params = searchParams;
      client.send();
    },
    GET_ALL_BY_ACCOUNT_ID: (accountId, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.GET_ALL_BY_ACCOUNT_ID(accountId);
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 10000; //For example 10 sec
      client.setAuthTokenAccess();
      client.send();
    },
    GET_ALL_BOOKINGS_ALL_CALENDARS: (
      tenantId,
      filter,
      search,
      successCallback,
      errorCallback
    ) => {
      let searchParams = generateSearchParams(filter, search);
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.GET_ALL_BOOKINGS_ALL_CALENDARS(
          tenantId
        );
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 10000; //For example 10 sec
      client.setAuthTokenAccess();
      client._params = searchParams;
      client.send();
    },
    GET_A_EVENT: (bookingId, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.GET_A_EVENT(bookingId);
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.setAuthTokenAccess();
      client.timeout = 10000; //For example 10 sec
      client.send();
    },
    UPDATE_A_BOOKING: (
      bookingId,
      bookingObj,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.UPDATE_A_BOOKING(bookingId);
      client.requestType = HTTPClient.REQUEST_TYPE.PUT;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.addParameters(bookingObj);
      client.setAuthTokenAccess();
      client.send();
    },
    DELETE_A_BOOKING: (
      bookingId,
      deleteObj,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.DELETE_A_BOOKING(bookingId);
      client.requestType = HTTPClient.REQUEST_TYPE.DELETE;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.addParameters(deleteObj);
      client.setAuthTokenAccess();
      client.send();
    },
    UPDATE_BOOKINGS_FOR_MULTIPLE_ROOMS: (
      eventGroupID,
      bookingObj,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.UPDATE_BOOKINGS_FOR_MULTIPLE_ROOMS(
          eventGroupID
        );
      client.requestType = HTTPClient.REQUEST_TYPE.PUT;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.addParameters(bookingObj);
      client.setAuthTokenAccess();
      client.send();
    },
    DELETE_BOOKINGS_FOR_MULTIPLE_ROOMS: (
      eventGroupID,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.DELETE_BOOKINGS_FOR_MULTIPLE_ROOMS(
          eventGroupID
        );
      client.requestType = HTTPClient.REQUEST_TYPE.DELETE;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.setAuthTokenAccess();
      client.send();
    },
    CREATE_A_BOOKING: (dummy, eventObj, successCallback, errorCallback) => {
      if (dummy) {
        successCallback();
      } else {
        let client = new HTTPClient();
        client.requestPath =
          REQUEST_PATHS_FOR.BOOKING_SERVICE.CREATE_A_BOOKING();
        client.requestType = HTTPClient.REQUEST_TYPE.POST;
        client.successCallback = successCallback;
        client.failCallback = errorCallback;
        client.addParameters(eventObj);
        client.setAuthTokenAccess();
        client.send();
      }
    },
    GET_ALL_BOOKINGS_FOR_PUBLIC_USER: (
      filter,
      search,
      successCallback,
      errorCallback
    ) => {
      let searchParams = generateSearchParams(filter, search);
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.GET_ALL_BOOKINGS_FOR_PUBLIC_USER();
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 10000; //For example 10 sec
      client.setAuthTokenAccess();
      client._params = searchParams;
      client.send();
    },
    GET_ALL_ENTITIES: (tenantId, successCallback, errorCallback) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.GET_ALL_ENTITIES(tenantId);
      client.requestType = HTTPClient.REQUEST_TYPE.GET;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 10000; //For example 10 sec
      client.setAuthTokenAccess();
      client.send();
    },
    CALCULATE_PRICE_OF_BOOKING: (
      calculateObj,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.CALCULATE_PRICE_OF_BOOKING();
      client.requestType = HTTPClient.REQUEST_TYPE.POST;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 10000; //For example 10 sec
      client.addParameters(calculateObj);
      client.setAuthTokenAccess();
      client.send();
    },
    CALCULATE_PRICE_OF_BOOKING_PUBLIC: (
      roomID,
      calculateObj,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.CALCULATE_PRICE_OF_BOOKING_PUBLIC(
          roomID
        );
      client.requestType = HTTPClient.REQUEST_TYPE.POST;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.timeout = 10000; //For example 10 sec
      client.addParameters(calculateObj);
      client.send();
    },
    UPDATE_A_BOOKING_PAYMENT_STATUS: (
      tenantId,
      bookingId,
      statusObj,
      successCallback,
      errorCallback
    ) => {
      let client = new HTTPClient();
      client.requestPath =
        REQUEST_PATHS_FOR.BOOKING_SERVICE.UPDATE_A_BOOKING_PAYMENT_STATUS(
          tenantId,
          bookingId
        );
      client.requestType = HTTPClient.REQUEST_TYPE.PUT;
      client.successCallback = successCallback;
      client.failCallback = errorCallback;
      client.addParameters(statusObj);
      client.setAuthTokenAccess();
      client.send();
    },
  },
};

function generateSearchParams(filter, search) {
  let searchParams = new URLSearchParams();
  const unusedParameters = ["locations", "entities"];
  for (const [key, value] of Object.entries(filter)) {
    if (!unusedParameters.includes(key) && searchParamsObject[key]) {
      searchParams.append(searchParamsObject[key], value);
    }
  }
  if (search) {
    searchParams.append("search", search);
  }
  return searchParams;
}

//const [userData, setUserData] = useState(null);

const searchParamsObject = {
  roomIds: "rooms",
  locationIds: "locations",
  deleted: "deleted",
  cancelled: "cancelled",
  paymentStatus: "paymentStatus",
};
