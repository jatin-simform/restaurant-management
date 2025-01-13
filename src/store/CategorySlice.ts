import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory, CategoryState } from "../types";

const initialState: CategoryState = {
    isLoaded: false,
    categories: [
        {
            id: "1",
            name: "Appetizers",
            items: ["Spring Rolls", "Garlic Bread", "Stuffed Mushrooms"]
        },
        {
            id: "2",
            name: "Main Course",
            items: ["Grilled Chicken", "Pasta Carbonara", "Beef Steak"]
        },
        {
            id: "3",
            name: "Desserts",
            items: ["Cheesecake", "Brownie", "Ice Cream"]
        }

    ],
};

const CategorySlice = createSlice({
    name: "categorySlice",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.isLoaded = true;
            state.categories = action.payload;
        },

        addCategory: (state, action: PayloadAction<ICategory>) => {
            state.categories.push(action.payload);
        },

        deleteCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter((category) => category.id !== action.payload);
        },
        updateCategory: (state, action: PayloadAction<ICategory>) => {
            const updatedCategory = action.payload;
            const index = state.categories.findIndex((category) => category.id === updatedCategory.id);

            if (index !== -1) {
                state.categories[index] = updatedCategory;
            }
        },
    },
});

export const { setCategories, addCategory, deleteCategory, updateCategory } = CategorySlice.actions;

const CategoryReducer = CategorySlice.reducer;

export default CategoryReducer;
