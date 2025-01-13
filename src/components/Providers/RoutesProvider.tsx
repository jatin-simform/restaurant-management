import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "../Layout/Layout"
import Dashboard from "../../pages/Dashboard"
import Menu from "../../pages/Menu"
import Categories from "../../pages/Categories"
import Recipes from "../../pages/Recipes"

const RoutesProvider: React.FC = () => {


    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Dashboard
                        indicators={new Array(3).fill({ count: 10, text: 'ABS' })}
                    />} />
                    <Route path="/menus/*" element={<Menu />} />
                    <Route path="/recipes/*" element={<Recipes />} />
                    <Route path="/categories" element={<Categories />} />
                </Route>
                <Route path="/login" />
                <Route path="/register" />
                <Route path="/" />
                <Route path="/" />
                <Route path="/" />
            </Routes>
        </BrowserRouter>
    </>

}


export default RoutesProvider