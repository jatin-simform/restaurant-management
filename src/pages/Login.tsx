import React from "react"
import LoginForm from "../components/Login/LoginForm"
import { Box, Grid2, Paper, Typography } from "@mui/material"
import MainTheme from "../Theme/MainTheme"

const Login: React.FC = () => {
   return <>
      <Grid2 container

         justifyContent={
            {
               xs: 'center',
               md: 'center',
               sm: 'center',
               xl: 'space-between',
               lg: 'space-between'
            }
         }

         spacing={0}
         height={'100vh'}>
         <Grid2 size={{
            md: 6,
            xs: 12
         }}>
            <Typography variant="h3" fontSize={48} color="secondary" padding={5} fontWeight={900} >Sego</Typography>
            <LoginForm />
         </Grid2>
         <Grid2 size={5}

            display={{
               xs: 'none',
               md: 'none',
               sm: 'none',
               lg: 'block',
               xl: 'block'
            }}
            padding={3}
         >
            <Paper
               elevation={0}
               style={{
                  background: MainTheme.palette.primary.main,
                  borderRadius: 0,
                  padding: 50,
                  height: '84vh'
               }}
            >
               <Box padding={5} >
                  <img src="https://overpay-admin-panel-host.onrender.com/assets/SendMoney-CcIgYfXc.png" style={{ width: '100%' }} />
               </Box>

               <Typography variant="h4" color="white" fontWeight={900} textAlign={'center'} >Get better with Sego</Typography>
               <Typography textAlign={'center'} color="white">
                  Sign in to access your personalized dining experience. Manage your reservations, view the menu, and enjoy exclusive offers. Let us bring the best of culinary delights to your table.
               </Typography>
            </Paper>
         </Grid2>
      </Grid2>
   </>
}

export default Login