import racipeContext from '../../contexts/recipeContext'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { IRecipe } from '../../types';
import { useCallback, useEffect, useState } from 'react';
import { useNotification } from './NotificationProvider';
import { addRecipe, deleteRecipe, setRecipes, updateRecipe } from '../../store/RecipeSlice';


const CategoryProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const { isLoaded, recipes: items } = useSelector((state: RootState) => state.recipe);

    const { notifyError,notifySuccess } = useNotification();

    //this is to load the initial data from the api
    useEffect(() => {

        const fn = async () => {

            try {
                setIsLoading(true);
                //todo make API call
                dispatch(setRecipes([]));


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
            dispatch(addRecipe({ ...data, id: id }));
            notifySuccess("Record Saved Successfully")

        } catch (e: unknown) {

            notifyError("Something Went wrong");

        } finally {

            setIsLoading(false);

        }

        return id;


    }, [notifySuccess,notifyError]);

    const _delete = useCallback(async (id: string) => {

        try {
            setIsLoading(true);
            //todo make API call
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