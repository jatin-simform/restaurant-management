import { useContext } from "react";
import notificationContext, { INotificaitonContext } from "../contexts/notificationContext";

const useNotification=()=>useContext<INotificaitonContext>(notificationContext);

export default useNotification;
