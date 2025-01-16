/**types description for all main entities */

export interface IRecipe {
    id: string,
    name: string
    description: string
    image: string
    price: number
    qty: string
    weight: number
    categoryID: string
}

export interface ICategory {
    id: string,
    name: string
}

export interface IMenu {
    id: string,
    name: string
    categories: string[],//ids of categories
    items:string[]
}

/**type description of redux slice for each entities */
type CreateModuleState<T, ModuleName extends string> = { isLoaded: boolean; } & { [K in ModuleName]: T[]; };

export type MenuState = CreateModuleState<IMenu, "menu">
export type CategoryState = CreateModuleState<ICategory, "categories">
export type RecipeState = CreateModuleState<IRecipe, "recipes">

/** utitlity types */

export type CreateEntityContext<T> = {
    isLoaded: boolean,
    items: T[],
    add: (data: T) => Promise<string>,
    delete: (id: string) => Promise<string>,
    isLoading: boolean,
    update: (data: T) => Promise<string>
}





