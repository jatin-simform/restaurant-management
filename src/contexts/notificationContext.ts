import { createContext } from "react";

export interface INotificaitonContext {
    notifySuccess: (msg: string) => void,
    notifyError: (msg: string) => void,
}

const notificationContext = createContext<INotificaitonContext>({ notifyError: () => { }, notifySuccess: () => { } })

export default notificationContext;