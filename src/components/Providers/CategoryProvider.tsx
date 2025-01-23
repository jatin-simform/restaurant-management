import categoryContext from '../../contexts/categoryContext'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { ICategory } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { addCategory, deleteCategory, setCategories, updateCategory } from '../../store/CategorySlice';
import API from '../../api';
import useNotification from '../../hooks/useNotification';


const CategoryProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { isLoaded, categories: items } = useSelector((state: RootState) => state.category);

    const { notifyError ,notifySuccess} = useNotification();
    
    //this is to load the initial data from the api
    useEffect(() => {

        const fn = async () => {

            try {
                setIsLoading(true);
                const res = await API.categories();
                if (res.status !== 200) {
                    throw new Error("Failed to load categories")
                }

                dispatch(setCategories(res.data || []));

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
        let newCategory = { ...data, id: Math.random() + "" }

        try {
            setIsLoading(true);
            const res = await API.addCategory(newCategory);
            if (res.status !== 201) throw new Error("Failed to create category")
            dispatch(addCategory(newCategory));
            notifySuccess("Date is saved successfully!")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return newCategory.id;

    }, [notifyError,notifySuccess]);

    const _delete = useCallback(async (id: string) => {

        try {
            setIsLoading(true);
            const res = await API.deleteCategory(id);
            if (res.status !== 200) throw new Error("Failed to delete category")
            dispatch(deleteCategory(id));
            notifySuccess("Record is deleted successfully")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return id;


    }, [notifyError,notifySuccess]);

    const update = useCallback(async (data: ICategory) => {

        try {
            setIsLoading(true);
            const res = await API.updateCategory(data);
            if (res.status !== 200) throw new Error("Failed to update category!")
            dispatch(updateCategory(data))
            notifySuccess("Data is updated successfully")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return data.id;

    }, [dispatch,notifyError,notifySuccess]);



    return <categoryContext.Provider value={{ isLoaded, items, add, delete: _delete, update, isLoading }}>
        {children}
    </categoryContext.Provider>

}


export default CategoryProvider;