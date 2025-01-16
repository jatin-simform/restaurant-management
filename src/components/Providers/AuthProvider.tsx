import { useCallback, useEffect, useReducer, useState } from "react"
import authContext, { IAuthData, IAuthUser } from "../../contexts/authContext"
import authApi, { AuthPayload } from "../../api"
import useNotification from "../../hooks/useNotification"
import { useNavigate } from "react-router"

const AuthProvider: React.FC<{ children: React.ReactNode }> = (props) => {

    const [isLoading,setLoading]=useState(true);
    const [authUser,setAuthUser]=useState<IAuthUser|undefined>();
    const [isLoggedIn,setLoggedIn]=useState(false);
    const { notifyError } = useNotification();
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage) {

            notifyError("Something went wrong!");
            console.error(new Error("Local storage not found"));
            return
            
        }
        let authData = localStorage.getItem("AuthData");

        if (authData) {
            const parsedAuthData = JSON.parse(authData) as IAuthUser;
           
            if (parsedAuthData) {
                setLoggedIn(true);
                setAuthUser(parsedAuthData);
            }

        }else{
            throw new Error("Something went wrong")
        }

        setLoading(false);

    }, [navigate]);

    const logout = useCallback(() => {

        setLoggedIn(false)
        localStorage.setItem("AuthData", "null")
        navigate("/login")

    }, [ navigate])

    const login = useCallback((data: AuthPayload) => {
        const fn = async () => {

            setLoading(true)

            try {
                const res = await authApi.login(data);
                if (res.status !== 200) throw new Error("Login failed")

                localStorage.setItem("AuthData", JSON.stringify(res.data));
                setLoggedIn(true);
                setAuthUser(res.data);
                setLoading(false);
                navigate("/")


            } catch (e: unknown) {
                notifyError("Login Failed!")
                console.log("Error", e)
            } finally {
                setLoading(false)

            }

        }

        fn();

    }, [ notifyError, navigate])

    const content = isLoading ? <>Please wait...</> : props.children
    
    return <authContext.Provider value={{ data: {isLoading,isLoggedIn,authUser}, login, logout }}>
        {content}
    </authContext.Provider>

}

export default AuthProvider
