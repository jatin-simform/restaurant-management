import categoryContext from '../../contexts/categoryContext'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { ICategory } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { useNotification } from './NotificationProvider';
import { addCategory, deleteCategory, setCategories, updateCategory } from '../../store/CategorySlice';


const CategoryProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { isLoaded, categories: items } = useSelector((state: RootState) => state.category);

    const { notifyError } = useNotification();
    //this is to load the initial data from the api
    useEffect(() => {

        const fn = async () => {

            try {
                setIsLoading(true);
                //todo make API call
                dispatch(setCategories([]));

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

    const add = useCallback(async (data: ICategory) => {

        try {
            setIsLoading(true);
            //todo make API call
            dispatch(addCategory({ ...data, id: Math.random() + "" }));

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
            dispatch(deleteCategory(id));

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }


    }, []);

    const update = useCallback(async (data: ICategory) => {

        try {
            setIsLoading(true);
            //todo make API call
            dispatch(updateCategory(data))

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

    }, [dispatch]);



    return <categoryContext.Provider value={{ isLoaded, items, add, delete: _delete, update, isLoading }}>
        {children}
    </categoryContext.Provider>

}


export default CategoryProvider;