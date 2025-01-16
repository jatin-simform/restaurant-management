import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import notificaitonContext from '../../contexts/notificationContext'

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {


    const { enqueueSnackbar } = useSnackbar();


    const notifySuccess = useCallback((message: string) => {

        enqueueSnackbar(message, { variant: 'success' });

    }, [enqueueSnackbar])

    const notifyError = useCallback((message: string) => {

        console.log("its called", message)

        enqueueSnackbar(message, { variant: 'error' });

    }, [enqueueSnackbar])

    return <>
        <notificaitonContext.Provider value={{ notifyError, notifySuccess }}>
            {children}
        </notificaitonContext.Provider>
    </>

}

export default NotificationProvider