import React from "react"
import { AuthPayload } from "../api/authApi"

export interface IAuthUser{
    firstName:string,
    lastName:string,
}

export interface IAuthData{
    isLoggedIn:boolean,
    isLoading:boolean,
    authUser?:IAuthUser,
}

export interface IAuthContext<T>{
    data:T,
    login:(data: AuthPayload)=>void,
    logout:()=>void
}

const authContext=React.createContext<IAuthContext<IAuthData>>({
    data:{
        isLoggedIn:false,
        isLoading:false
    },
    login:()=>{},
    logout:()=>{}
})

export default authContext