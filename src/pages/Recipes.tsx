import React from "react"
import { Routes, Route } from "react-router"
import RecipeList from "../components/Recipe/RecipeList"
import RecipeForm from "../components/Recipe/RecipeForm"

const  Recipes:React.FC=()=>{


   return <>
         <Routes>
         <Route path="/" element={<RecipeList />} />
         <Route path="/:id" element={<RecipeForm />} />
      </Routes>
    </>

}

export default Recipes