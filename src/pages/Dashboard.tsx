import { Grid2 } from "@mui/material"
import React from "react"
import Indicator from "../components/Dashboard/Indicator"
import useCategories from "../hooks/useCategories"
import useRecipes from "../hooks/useRecipes"
import useMenu from "../hooks/useMenu"
import { Category, Menu, Restaurant } from "@mui/icons-material"


const Dashboard: React.FC = () => {
   const { items: categories } = useCategories();
   const { items: recipes } = useRecipes();
   const { items: menus } = useMenu();

   return <>
      <Grid2 container spacing={4} padding={{
         md:10,
         xs:2,
         sm:2
      }} justifyContent={'center'} alignItems={'center'} >
         <Indicator count={menus.length} text="Menus" icon={<Menu color="primary" fontSize="large" />} />
         <Indicator count={categories.length} text="Categories" icon={<Category color="primary" fontSize="large" />} />
         <Indicator count={recipes.length} text="Recipes" icon={<Restaurant color="primary" fontSize="large" />} />
      </Grid2>
   </>
}

export default Dashboard