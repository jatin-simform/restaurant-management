import racipeContext from '../../contexts/recipeContext'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { IRecipe } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { addRecipe, deleteRecipe, setRecipes, updateRecipe } from '../../store/RecipeSlice';
import API from '../../api';
import useNotification from '../../hooks/useNotification';


const CategoryProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { isLoaded, recipes: items } = useSelector((state: RootState) => state.recipe);

    const { notifyError, notifySuccess } = useNotification();

    //this is to load the initial data from the api
    useEffect(() => {

        const fn = async () => {

            try {
                setIsLoading(true);
                const res = await API.recipes();

                if (res.status !== 200) throw new Error("Failed to load recipes")

                dispatch(setRecipes(res.data));

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

    const add = useCallback(async (data: IRecipe) => {
        let id = Math.random() + "";
        try {

            setIsLoading(true);
            const newData = { ...data, id: id }
            const res = await API.addRecipe(newData);
            if (res.status !== 201) throw new Error("Failed to add new Recipe")
            dispatch(addRecipe(newData));
            notifySuccess("Record Saved Successfully")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return id;


    }, [notifySuccess, notifyError]);

    const _delete = useCallback(async (id: string) => {

        try {
            setIsLoading(true);
            const res = await API.deleteRecipe(id);

            if (res.status !== 200) {
                throw new Error("Failed to delete Recipe!")
            }

            dispatch(deleteRecipe(id));

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return id;

    }, []);

    const update = useCallback(async (data: IRecipe) => {

        try {

            setIsLoading(true);
            const res = await API.updateRecipe(data);
            if (res.status !== 200) throw new Error("Failed to update Recipe!")

            dispatch(updateRecipe(data));

            notifySuccess("Record updated sccessfully");

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return data.id;

    }, [dispatch]);


    return <racipeContext.Provider value={{ isLoaded, items, add, delete: _delete, update, isLoading }}>
        {children}
    </racipeContext.Provider>

}


export default CategoryProvider;