import { Grid2, Paper, Typography } from "@mui/material"


export interface IIndicatorProps {
    text: string,
    count: number
}

const Indicator: React.FC<IIndicatorProps> = ({ count, text }) => {

    return <Grid2 size={{ xs: 12, sm: 4 }}>
        <Paper style={{ width: '100%', height: 150 }} elevation={12} >
            <Typography variant="h1" align="center" fontSize={50} fontWeight={900} > {text}</Typography>
            <Typography variant="h2" align='center' fontSize={40}>{count}</Typography>
        </Paper>
    </Grid2>
}

export default Indicator