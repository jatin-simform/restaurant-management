import { Navigate, Route, Routes } from "react-router"
import Layout from "../Layout/Layout"
import Dashboard from "../../pages/Dashboard"
import Menu from "../../pages/Menu"
import Categories from "../../pages/Categories"
import Recipes from "../../pages/Recipes"
import PublicLayout from "../Layout/PublicLayout"
import Login from "../../pages/Login"
import Registration from "../../pages/Registration"
import useAuth from "../../hooks/useAuth"

const RoutesProvider: React.FC = () => {

    const { data } = useAuth();
    const { isLoggedIn } = data
    
    return <>
        <Routes>
            {
                isLoggedIn ? <>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/menus/*" element={<Menu />} />
                        <Route path="/recipes/*" element={<Recipes />} />
                        <Route path="/categories" element={<Categories />} />
                    </Route>
                </> : <>
                    <Route path="/" element={<PublicLayout />} >
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                    </Route>
                </>
            }
        </Routes>
    </>

}


export default RoutesProvider