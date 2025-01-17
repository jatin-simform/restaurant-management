import { Outlet, useNavigate } from "react-router"
import Header from "./Header"
import useAuth from "../../hooks/useAuth"
import { useCallback, useMemo } from "react";

const Layout: React.FC = () => {

    const { data } = useAuth();
    const navigate=useNavigate()

    const handleNavigation=useCallback((path:string)=>{
        return ()=>{
            navigate(path)
        }
    },[navigate])

    const links=useMemo(()=>{

        return [
            { action: handleNavigation("/"), name: "Dashboard" },
            { action:handleNavigation("/categories"), name: "Categories" },
            { action: handleNavigation("/menus"), name: "Menus" },
            { action:handleNavigation("/recipes"), name: "Recipes" },
            { action:handleNavigation("/search"), name: "Search" },
        ]
    },[handleNavigation])

    return <>
        <Header links={links} title="Take It Cheesy" user={data.authUser} />
        <Outlet />
    </>

}

export default Layout