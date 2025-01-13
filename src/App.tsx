import { Provider } from "react-redux"
import AuthProvider from "./components/Providers/AuthProvider"
import NotificationProvider from "./components/Providers/NotificationProvider"
import RoutesProvider from "./components/Providers/RoutesProvider"
import { store } from "./store"
import CategoryProvider from "./components/Providers/CategoryProvider"
import RecipeProvider from "./components/Providers/RecipeProvider"

const App: React.FC = () => {

  return (
    <>
      <AuthProvider>
        <Provider store={store}>
          <NotificationProvider>
            <CategoryProvider>
              <RecipeProvider>
                <RoutesProvider />
              </RecipeProvider>
            </CategoryProvider>
          </NotificationProvider>
        </Provider>
      </AuthProvider>
    </>
  )
}

export default App
