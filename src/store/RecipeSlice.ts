import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRecipe, RecipeState } from "../types"; 

const initialState: RecipeState = {
  isLoaded: false,
  recipes: [],
};

const RecipeSlice = createSlice({
  name: "recipeSlice",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<IRecipe[]>) => {
      state.isLoaded = true;
      state.recipes = action.payload;
    },
    addRecipe: (state, action: PayloadAction<IRecipe>) => {
      state.recipes.push(action.payload);
    },
    deleteRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== action.payload);
    },
    updateRecipe: (state, action: PayloadAction<IRecipe>) => {
      const updatedRecipe = action.payload;
      const index = state.recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);

      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      }
    },
  },
});

export const { setRecipes, addRecipe, deleteRecipe, updateRecipe } = RecipeSlice.actions;

const RecipeReducer=RecipeSlice.reducer;
export default RecipeReducer;

