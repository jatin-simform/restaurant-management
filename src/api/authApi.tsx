import axios from "axios"

const baseURL = 'https://dummyjson.com/user/login'

export interface AuthPayload {
    username: string,
    password: string,
    expiresInMins: number
}

const authApi = {
    login: (data: AuthPayload) => {
        return axios.post(baseURL, data)
    }

}


export default authApi;