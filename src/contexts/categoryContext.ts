import { createContext } from "react";
import {  CreateEntityContext, ICategory } from "../types";
import { defaultCrudContext } from "../utils";

interface ICategoryContext extends CreateEntityContext<ICategory>{};

const categoryContext = createContext<ICategoryContext>(defaultCrudContext);

export default categoryContext