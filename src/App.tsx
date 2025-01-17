import { Provider } from "react-redux"
import AuthProvider from "./components/Providers/AuthProvider"
import NotificationProvider from "./components/Providers/NotificationProvider"
import RoutesProvider from "./components/Providers/RoutesProvider"
import { store } from "./store"
import CategoryProvider from "./components/Providers/CategoryProvider"
import RecipeProvider from "./components/Providers/RecipeProvider"
import { SnackbarProvider } from "notistack"
import { BrowserRouter, Route, Routes } from "react-router"
import MenuProvider from "./components/Providers/MenuProvider"

const App: React.FC = () => {

  return (
    <>
      <Provider store={store}>
        <SnackbarProvider maxSnack={50}>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                <Route path="*" element={<>
                  <AuthProvider>
                    <CategoryProvider>
                      <RecipeProvider>
                        <MenuProvider>
                        <RoutesProvider />
                        </MenuProvider>
                      </RecipeProvider>
                    </CategoryProvider>
                  </AuthProvider>
                </>} />
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </SnackbarProvider>
      </Provider>
    </>
  )
}

export default App
