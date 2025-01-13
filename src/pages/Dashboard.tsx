import { Grid2, Paper } from "@mui/material"
import React from "react"
import Indicator, { IIndicatorProps } from "../components/Dashboard/Indicator"
import WelcomeBoard from "../components/Dashboard/WelcomBoard"
import useCategories from "../hooks/useCategories"
import useRecipes from "../hooks/useRecipes"
import useMenu from "../hooks/useMenu"


const Dashboard: React.FC = () => {
   const { items: categories } = useCategories();
   const { items: recipes } = useRecipes();
   const { items: menus } = useMenu();



   return <>
      <Paper elevation={24} style={{ padding: "5px", margin: "0px auto", marginTop: 25, width: '90%', height: "80vh" }}>
         <WelcomeBoard />
         <Grid2 container spacing={4} padding={10} justifyContent={'center'} alignItems={'center'} >
            <Indicator count={menus.length} text="Menus" />
            <Indicator count={categories.length} text="Categories" />
            <Indicator count={recipes.length} text="Recipes" />
         </Grid2>

      </Paper>
   </>

}

export default Dashboard