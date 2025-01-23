import { Grid2, Typography } from "@mui/material";

const EmptyState = () => {
    return (
        <Grid2 container justifyContent="center" alignItems="center">
            <Grid2 size={12} >
                <Typography variant="h4" color="secondary" textAlign={'center'} fontSize={24} >
                    No results found
                </Typography>
            </Grid2>
            <Grid2 container justifyItems={'center'} alignContent={'center'} alignItems={'center'} size={8} >
                <img src="/no-data.png" alt="No data found" width='250px' />
            </Grid2>
        </Grid2>

    );
};

export default EmptyState;