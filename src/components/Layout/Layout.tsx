import { Outlet, useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import { useMemo, useState } from "react";
import { AppProvider, DashboardLayout, Navigation } from "@toolpad/core";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Category, Menu, Restaurant, Search } from '@mui/icons-material';
import useAppRouter from "../../hooks/useAppRouter";
import MainTheme from "../../Theme/MainTheme";
import { type Session } from '@toolpad/core/AppProvider';
import { Box } from "@mui/material";
import AppTitle from "./AppTitle";
import ToolbarActionsSearch from "./ToolbarActionsSearch";
import Copyright from "./Copyright";

const links: Navigation = [
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'menus',
        title: 'Menus',
        icon: <Menu />,
    },
    {
        segment: 'categories',
        title: 'Categories',
        icon: <Category />,
    },
    {
        segment: 'recipes',
        title: 'Recipes',
        icon: <Restaurant />,
    },
    {
        segment: 'search',
        title: 'Search',
        icon: <Search />,
    }

];

const Layout: React.FC = () => {

    const router = useAppRouter(window.location.pathname);
    const auth = useAuth()
    const navigate=useNavigate();
    const [session, setSession] = useState<Session | null>({
        user: {
            name: auth.data.authUser?.firstName + ' ' + auth.data.authUser?.lastName,
            email: auth.data.authUser?.email,
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                navigate("/login")
            },
            signOut: () => {
                auth.logout();
                setSession(null);
            },
        };
    }, [auth,navigate]);


    return <>
        <AppProvider

            session={session}
            navigation={links}
            authentication={authentication}
            router={router}
            theme={MainTheme}
            branding={{ logo: <img src='https://sego.dexignzone.com/php/demo/assets/images/logo.png' />, title: 'Sego' }}
        >
            <DashboardLayout
                slots={{
                    toolbarActions: ToolbarActionsSearch,
                    appTitle: AppTitle,
                    sidebarFooter: Copyright,
                }}
            >
                <Box padding={2}>
                    <Outlet />
                </Box>
            </DashboardLayout>
        </AppProvider >

    </>

}

export default Layout