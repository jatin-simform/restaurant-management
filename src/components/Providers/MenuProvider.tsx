import menuContext from '../../contexts/menuContext'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { IMenu } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { useNotification } from './NotificationProvider';
import { addMenu, deleteMenu, setMenu, updateMenu } from '../../store/MenuSlice';


const MenuProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);


    const dispatch = useDispatch();

    const { isLoaded, menu: items } = useSelector((state: RootState) => state.menu);
    const { notifyError } = useNotification();
    //this is to load the initial data from the api
    useEffect(() => {

        const fn = async () => {

            try {
                setIsLoading(true);
                //todo make API call
                dispatch(setMenu([]));

            } catch (e: unknown) {

                notifyError("Something Went wrong");

            } finally {

                setIsLoading(false);

            }
        }

        if (!isLoaded) {
            fn();
        }

    }, [isLoaded, dispatch])

    const add = useCallback(async (data: IMenu) => {
        try {
            setIsLoading(true);
            //todo make API call
            dispatch(addMenu(data));

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

    }, []);

    const _delete = useCallback(async (id: string) => {

        try {
            setIsLoading(true);
            //todo make API call
            dispatch(deleteMenu(id));

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }


    }, []);

    const update = useCallback(async (data: IMenu) => {

        try {
            setIsLoading(true);
            //todo make API call
            dispatch(updateMenu(data))

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

    }, [dispatch]);


    return <menuContext.Provider value={{ isLoaded, items, add, delete: _delete, update, isLoading }}>
        {children}
    </menuContext.Provider>

}


export default MenuProvider;