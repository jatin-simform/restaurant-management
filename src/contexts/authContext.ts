import React from "react"
import { AuthPayload } from "../api"

export interface IAuthUser {
    accessToken: string,
    refreshToken: string,
    id: number,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    gender: string,
    image: string
}

export interface IAuthData {
    isLoggedIn: boolean,
    isLoading: boolean,
    authUser?: IAuthUser,
}

export interface IAuthContext<T> {
    data: T,
    login: (data: AuthPayload) => void,
    logout: () => void
}

const authContext = React.createContext<IAuthContext<IAuthData>>({
    data: {
        isLoggedIn: false,
        isLoading: false
    },
    login: async () => {  },
    logout: () => { }
})

export default authContext