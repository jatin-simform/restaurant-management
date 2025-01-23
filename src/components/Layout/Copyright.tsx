import { Favorite } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const Copyright = ({ mini }: { mini: boolean }) => {

    if (mini) {

        return null

    }

    return (
        <Box
            sx={{
                textAlign: 'center',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                mt: 4,
                color: '#555',
            }}
        >
            <Typography variant="body2" color="textSecondary">
                <strong>Sego Restaurant Admin Dashboard</strong> <br />© {new Date().getFullYear()} All Rights Reserved
            </Typography>
            <Typography variant="body2" color="textSecondary">
                Made with <Favorite sx={{ color: 'red', fontSize: 14 }} /> by <strong>Jatin Parmar </strong>
            </Typography>
        </Box>
    );
}

export default Copyright