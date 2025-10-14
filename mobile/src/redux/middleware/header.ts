import {API_URL} from "./env"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const customBaseQuery =(basePath: string)=> 
  fetchBaseQuery({
  baseUrl: `${ "http:172.29.230.250:4000/api/v1"}/${basePath}`,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default customBaseQuery;
