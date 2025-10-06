import {API_URL} from "./env"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const customBaseQuery =(basePath: string)=> 
  fetchBaseQuery({
  baseUrl: `${API_URL}/${basePath}`,
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem("access-token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default customBaseQuery;
