import React from "react"
import RegistrationForm from "../components/Registration/RegistrationForm"
import { Grid2, Typography } from "@mui/material"

const Registration: React.FC = () => {

   return <>
      <div style={{ height: '100vh' ,overflow:'hidden' }}>
         <Grid2 container padding={3}>
            <Grid2 size={5} >
               <div style={{
                  background: '#194bfb',
                  padding: '25px',
                  height: '90vh',
                  width: '600px'

               }}>
                  <Typography variant="h3" color="white" fontWeight={900} > Take It Cheezy</Typography>
                  <div style={{ padding: '10px' }}>
                     <img src="/dish.jpeg" style={{ width: '100%' }} />
                  </div>
                  <Typography variant="h4" color="white" fontWeight={900}  >Welcome Back to Cheezy!</Typography>
                  <Typography color="white" >
                     We’re so glad to see you again! Please log in to enjoy all the cheesy goodness—whether it’s placing an order, checking your past favorites, or getting exclusive offers!
                  </Typography>
                  <Typography variant="h4" color="white" fontWeight={900}  >Don’t have an account yet?</Typography>
                  <Typography color="white" >
                     Sign up today and get ready to indulge in the cheesiest meals and deals!
                  </Typography>
               </div>
            </Grid2>
            <Grid2 size={6}>
               <RegistrationForm />
            </Grid2>
         </Grid2>
      </div>

   </>

}

export default Registration