import { Paper, Typography } from "@mui/material"

const WelcomeBoard: React.FC = () => {

        return <>
                <Paper elevation={12} style={{ width: "90%", height: '150px', marginTop: 50, marginLeft: "5%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h1" align="center" color="info" fontSize={70}>
                                Welcome to Admin Panel
                        </Typography>
                </Paper>
        </>

}

export default WelcomeBoard