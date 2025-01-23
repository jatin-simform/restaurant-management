import { useContext } from 'react';
import categoryContext from '../contexts/categoryContext';

const useCategories = () => {
    const context = useContext(categoryContext);

    if (!context) {
        throw new Error('useCategories must be used within a CategoriesProvider');
    }

    return context;
};

export default useCategories;