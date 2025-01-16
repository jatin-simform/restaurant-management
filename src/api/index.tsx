import axios from "axios"
import { ICategory, IMenu, IRecipe } from "../types"

const baseURL = 'http://localhost:3000'

export interface AuthPayload {
    username: string,
    password: string,
}



const API = {
    login: (data: AuthPayload) => {
        const url='https://dummyjson.com/user/login';
        return axios.post(url, data)
    },
    register: (data: any) => {
        return axios.post(baseURL + "/register", data)
    },
    menus: () => {
        return axios.get(baseURL + "/menus")
    },
    categories: () => {
        return axios.get(baseURL + "/categories")
    },
    recipes: () => {
        return axios.get(baseURL + "/recipes")
    },

    deleteMenu: (id: string) => {
        return axios.delete(baseURL + "/menus/" + id)
    },
    deleteCategory: (id: string) => {
        return axios.delete(baseURL + "/categories/" + id)
    },
    deleteRecipe: (id: string) => {
        return axios.delete(baseURL + "/recipes/" + id)
    },


    updateMenu: (data: IMenu) => {
        return axios.put(baseURL + "/menus/" + data.id, data)
    },
    updateCategory: (data: ICategory) => {
        return axios.put(baseURL + "/categories/" + data.id, data)
    },
    updateRecipe: (data: IRecipe) => {
        return axios.put(baseURL + "/recipes/" + data.id, data)
    },

    addMenu: (data: IMenu) => {
        return axios.post(baseURL + "/menus", data)
    },
    addCategory: (data: ICategory) => {
        return axios.post(baseURL + "/categories", data)
    },
    addRecipe: (data: IRecipe) => {
        return axios.post(baseURL + "/recipes", data)
    },

}


export default API;