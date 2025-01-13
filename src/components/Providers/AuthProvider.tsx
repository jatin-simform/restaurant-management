import { useCallback, useReducer } from "react"
import authContext, { IAuthData } from "../../contexts/authContext"
import authApi, { AuthPayload } from "../../api/authApi"

const authData: IAuthData = {
    isLoggedIn: false,
    isLoading: false
}

type AuthActionType = "LOGIN" | "LOGOUT" | "SETLOADING"

type AuthAction = {
    type: AuthActionType,
    payload: Partial<IAuthData>
}


const authReducers = (state: IAuthData, action: AuthAction) => {

    switch (action.type) {
        case "LOGIN":
            state.isLoggedIn = true;
            break
        case "LOGOUT":
            state.isLoggedIn = false;
            break
        case "SETLOADING":
            state.isLoading = Boolean(action.payload.isLoading);
            break
    }
    return state;

}

const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const [state, dispatch] = useReducer(authReducers, authData)


    const logout = useCallback(() => {

        dispatch({ type: 'LOGOUT', payload: { isLoggedIn: false } });

    }, [dispatch])


    const login = useCallback((data: AuthPayload) => {


        const fn = async () => {

            dispatch({ type: 'SETLOADING', payload: { isLoading: true } });

            try {
                const res = await authApi.login(data);

                console.log("res", res);

                if (res.status === 200) {

                    dispatch({ type: 'LOGIN', payload: { isLoggedIn: true } });
                    //todo set auth user if 
                }

            } catch (e: unknown) {
                //todo notifiy the user for login fail
                console.log("Error", e)
            } finally {

                dispatch({ type: 'SETLOADING', payload: { isLoading: false } });

            }


        }

        fn();


    }, [dispatch])

    return <authContext.Provider value={{ data: state, login, logout }}>{props.children}</authContext.Provider>

}

export default AuthProvider
