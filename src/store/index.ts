import { configureStore } from "@reduxjs/toolkit";
import MenuReducers from "./MenuSlice";
import RecipeReducer from "./RecipeSlice";
import CategoryReducer from "./CategorySlice";

export const store = configureStore({
    reducer: {
        menu: MenuReducers,
        recipe: RecipeReducer,
        category: CategoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
