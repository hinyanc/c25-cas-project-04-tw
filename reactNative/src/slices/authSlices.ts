import {createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage";


interface AuthState{
    isAuthenticated:boolean
    email:string|null
}

const initialState:AuthState =
{
    isAuthenticated: AsyncStorage.getItem('token' )!==null,
    email:null
}


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action:PayloadAction<string>)=>{
            state.email = action.payload
            state.isAuthenticated = true
        },
        logout:(state)=>{
            state.email=null
            AsyncStorage.removeItem('token')
            state.isAuthenticated = false
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer