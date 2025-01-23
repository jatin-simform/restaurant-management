import { useContext } from 'react';
import recipeContext from '../contexts/recipeContext';

const useRecipes = () => {
    const context = useContext(recipeContext);
    if (!context) {
        throw new Error('useRecipes must be used within a RecipeProvider');
    }
    return context;
};

export default useRecipes;