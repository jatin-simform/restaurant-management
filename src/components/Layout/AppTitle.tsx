import { Stack, Typography, Box } from "@mui/material";
import { useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router";

const pageNames: { [key: string]: { [ikey: string]: string } } = {
    "dashboard": {
        list: "Dashboard"
    },
    "menus": {
        list: "Menus",
        add: "Add new menu",
        edit: "Edit menu"
    },
    "recipes": {
        list: "Recipes",
        add: "Add new recipe",
        edit: "Edit recipe"
    },
    "categories": {
        list: "Categories",
        add: "Add new category",
        edit: "Edit category"
    },
    "search": {
        list: "Search"
    }
}

const AppTitle: React.FC = () => {

    const { pathname } = useLocation();

    const title = useMemo(() => {
        const [, pageName,id] = pathname.split("/")
        const pages = pageNames[pageName];
        if (!pages) return ""
        if (id === "0") {
            return pages.add
        }
        if (id === undefined) {
            return pages.list;
        }
        return pages.edit;


    }, [pathname])


    return (
        <>
            <Stack direction="row" alignItems="center" spacing={2}>
                <img src="https://sego.dexignzone.com/php/demo/assets/images/logo.png" width={52} height={52} />
                <Typography variant="h6" style={{
                    color: '#3b427a',
                    fontSize: '40px',
                    fontWeight: 'bolder'
                }} >Sego</Typography>
                <Box display={{ xs: 'none', sm: 'block' }} >
                    <Typography marginLeft={12} variant="h4" color="primary" fontWeight={'bold'} align="center" textTransform={'capitalize'} >{title}</Typography>
                </Box>
            </Stack >
        </>
    );
}

export default AppTitle