import { Grid2, Typography } from "@mui/material"


export interface IIndicatorProps {
    text: string,
    count: number,
    icon: React.ReactElement
}

const Indicator: React.FC<IIndicatorProps> = ({ count, text ,icon}) => {

    return <Grid2 size={{ xs: 12, sm: 6 ,md:6,lg:4,xl:4}}>
        <div className="indicator-container">
            <Grid2 container justifyContent='space-around' alignItems="center">
                <Grid2 padding={2} size={6} >
                    <Typography variant="h1" align="center" color="#fff" fontSize={50} fontWeight={900} > {count}</Typography>
                    <Typography variant="h5" align='center' color="#fff" >{text}</Typography>
                </Grid2>
                <Grid2 size={6}>
                    <div className="indicator">
                        <div>
                            {icon}
                        </div>
                    </div>
                </Grid2>
            </Grid2>

        </div>
    </Grid2>
}

export default Indicator