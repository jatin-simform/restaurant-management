import { createContext } from "react";
import { IMenu, CreateEntityContext } from "../types";
import { defaultCrudContext } from "../utils";

interface IMenuContext extends CreateEntityContext<IMenu>{};
const menuContext = createContext<IMenuContext>(defaultCrudContext);

export default menuContext