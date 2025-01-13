import { Grid2, Paper } from "@mui/material"
import React from "react"
import Indicator, { IIndicatorProps } from "../components/Dashboard/Indicator"
import WelcomeBoard from "../components/Dashboard/WelcomBoard"

interface IDashboardProps {
   indicators: IIndicatorProps[],
}

const Dashboard: React.FC<IDashboardProps> = ({ indicators }) => {

   return <>
      <Paper elevation={24} style={{ padding: "5px", margin: "0px auto", marginTop: 25, width: '90%', height: "80vh" }}>
         <WelcomeBoard />
         {
            indicators.length > 0 && <Grid2 container spacing={4} padding={10} justifyContent={'center'} alignItems={'center'} >
               {indicators.map((t, index) => <Indicator key={index} {...t} />)}
            </Grid2>
         }
      </Paper>

   </>

}

export default Dashboard