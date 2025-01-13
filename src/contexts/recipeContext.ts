import { createContext } from "react";
import {  CreateEntityContext, IRecipe } from "../types";
import { defaultCrudContext } from "../utils";

interface IRecipeContext extends CreateEntityContext<IRecipe>{};
const recipeContext = createContext<IRecipeContext>(defaultCrudContext);

export default recipeContext