import React from "react"
import MenuProvider from "../components/Providers/MenuProvider"
import { Route, Routes } from "react-router"
import MenuList from "../components/Menu/MenuList"
import MenuForm from "../components/Menu/MenuForm"

const Menu: React.FC = () => {


   return <> <MenuProvider>
      <>
      <Routes>
         <Route path="/" element={<MenuList />} />
         <Route path="/:id" element={<MenuForm />} />
      </Routes>
      </>
   </MenuProvider>
   </>

}

export default Menu