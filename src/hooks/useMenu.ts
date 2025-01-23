import { useContext } from "react"
import menuContext from "../contexts/menuContext"

const useMenu = () => useContext(menuContext)

export default useMenu