import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenu, MenuState } from "../types";

const initialState: MenuState = {
    isLoaded: false,
    menu: [
        {
            id: "1",
            name: "Italian Classics",
            categories: [
                {
                    id: "1",
                    name: "Pasta",
                },
                {
                    id: "2",
                    name: "Pizza",
                },
            ],
        },
        {
            id: "2",
            name: "American Comforts",
            categories: [
                {
                    id: "3",
                    name: "Burgers",
                },
                {
                    id: "4",
                    name: "Salads",
                },
            ],
        },
        {
            id: "3",
            name: "Asian Delights",
            categories: [
                {
                    id: "5",
                    name: "Sushi",
                },
                {
                    id: "6",
                    name: "Noodles",
                },
            ],
        },
        {
            id: "4",
            name: "Vegetarian Feast",
            categories: [
                {
                    id: "7",
                    name: "Vegetarian Mains",
                },
                {
                    id: "8",
                    name: "Salads",
                },
            ],
        },
        {
            id: "5",
            name: "Desserts Galore",
            categories: [
                {
                    id: "9",
                    name: "Cakes",
                },
                {
                    id: "10",
                    name: "Ice Creams",
                },
            ],
        },
    ]
};

const MenuSlice = createSlice({
    name: "menuSlice",
    initialState,
    reducers: {
        setMenu: (state, action: PayloadAction<IMenu[]>) => {
            state.isLoaded = true;
            state.menu = action.payload;
        },

        addMenu: (state, action: PayloadAction<IMenu>) => {
            state.menu.push(action.payload);
        },
        deleteMenu: (state, action: PayloadAction<string>) => {

            state.menu = state.menu.filter((item) => item.id !== action.payload);

        },
        updateMenu: (state, action: PayloadAction<IMenu>) => {

            const updatedMenuItem = action.payload;
            const index = state.menu.findIndex((item) => item.id === updatedMenuItem.id);

            if (index !== -1) {
                state.menu[index] = updatedMenuItem;
            }
        },
    },
});

export const { setMenu, addMenu, deleteMenu, updateMenu } = MenuSlice.actions;
const MenuReducers = MenuSlice.reducer;

export default MenuReducers
