import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";


export type ThemeMode = "light" | "dark" | "system";

type ThemeState = {
  mode: ThemeMode;
};

const initialState:ThemeState ={
    mode:"system"

}
const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme:(state, action:PayloadAction<ThemeMode>)=>{
            state.mode = action.payload
            AsyncStorage.setItem("themeMode", action.payload)
        },
       
    }
})

export const {setTheme} = themeSlice.actions

export default themeSlice.reducer