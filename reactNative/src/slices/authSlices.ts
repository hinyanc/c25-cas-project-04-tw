import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nullable } from "zod";

interface AuthState{
    isAuthenticated:boolean
    username:string|null
}

const initialState:AuthState =
{
    isAuthenticated: AsyncStorage.getItem('token' )!==null,
    username:null
}


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<string>)=>{
            state.username = action.payload
            state.isAuthenticated = true
        },
        logout:(state)=>{
            state.username=null
            AsyncStorage.removeItem('token')
            state.isAuthenticated = false
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer