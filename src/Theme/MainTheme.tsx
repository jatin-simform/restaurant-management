import { createTheme } from "@mui/material";

const MainTheme = createTheme({
    components: {
        MuiListItem: {
            styleOverrides: {
                root: {

                    '&.Mui-selected': {
                        backgroundColor: '#EA7A9A', // Custom background color when selected
                        color: '#fff' // Custom text color when selected
                    },
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#ed8ea9', // Primary color
        },
        secondary: {
            main: '#3e3f7a', // Secondary color
        },
    },
    typography: {
        // Customize typography if needed
    },
});

export default MainTheme;
