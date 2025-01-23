import menuContext from '../../contexts/menuContext'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { IMenu } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { addMenu, deleteMenu, setMenu, updateMenu } from '../../store/MenuSlice';
import { useNavigate } from 'react-router';
import API from '../../api';
import useNotification from '../../hooks/useNotification';


const MenuProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { isLoaded, menu: items } = useSelector((state: RootState) => state.menu);
    const { notifyError,notifySuccess } = useNotification();
    //this is to load the initial data from the api
    useEffect(() => {

        const fn = async () => {

            try {
                setIsLoading(true);
                const res = await API.menus();
                if (res.status !== 200) throw new Error("Failed to load menus")
                //todo make API call
                dispatch(setMenu(res.data || []));

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
        const id = Math.random().toString(36);
        const newMenu = { ...data, id }
        try {
            setIsLoading(true);
            const res = await API.addMenu(newMenu);

            if (res.status !== 201) throw new Error("Failed to add new menu");

            dispatch(addMenu(newMenu));
            navigate(`/menus`);
            notifySuccess("Data is saved successfully")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return id;

    }, [navigate,notifySuccess]);

    const _delete = useCallback(async (id: string) => {

        try {
            setIsLoading(true);
            const res = await API.deleteMenu(id);
            if (res.status !== 200) {
                throw new Error("Failed to delete menu");
            }
            //todo make API call
            dispatch(deleteMenu(id));
            notifySuccess("Record is Deleted")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return id;


    }, [notifySuccess,notifyError]);

    const update = useCallback(async (data: IMenu) => {

        try {
            setIsLoading(true);
            const res=await API.updateMenu(data);
            if(res.status!==200)throw new Error("Failed to update menu");
            dispatch(updateMenu(data))
            navigate(`/menus/`);
            notifySuccess("Data is updated successfully")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return data.id;

    }, [dispatch,navigate,notifySuccess,notifyError]);


    return <menuContext.Provider value={{ isLoaded, items, add, delete: _delete, update, isLoading }}>
        {children}
    </menuContext.Provider>

}


export default MenuProvider;