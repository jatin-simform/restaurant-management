import React from "react"
import { Route, Routes } from "react-router"
import MenuList from "../components/Menu/MenuList"
import MenuForm from "../components/Menu/MenuForm"

const Menu: React.FC = () => {


   return <>
      <Routes>
         <Route path="/" element={<MenuList />} />
         <Route path="/:id" element={<MenuForm />} />
      </Routes>
   </>

}

export default Menu