import { createContext, useCallback, useContext } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

interface INotificaitonContext {
    notifySuccess: (msg: string) => void,
    notifyError: (msg: string) => void,
}

const notificationContext = createContext<INotificaitonContext>({
    notifyError: () => { },
    notifySuccess: () => { }
})

export const useNotification=()=>useContext(notificationContext)

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const { enqueueSnackbar } = useSnackbar();


    const notifySuccess = useCallback((message: String) => {

        enqueueSnackbar(message, { variant: 'success' });

    }, [])

    const notifyError = useCallback((message: String) => {

        enqueueSnackbar(message, { variant: 'error' });

    }, [])

    return <>
        <SnackbarProvider maxSnack={50}>
            <notificationContext.Provider value={{ notifyError, notifySuccess }}>
                {children}
            </notificationContext.Provider>
        </SnackbarProvider>
    </>

}

export default NotificationProvider