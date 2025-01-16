import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IMenu } from '../../types';
import { TextField, Button, Paper, Typography, Grid2, CircularProgress } from '@mui/material';
import MultiSelect from '../UI/MultiSelect';
import useCategories from '../../hooks/useCategories';
import CategoryWiseItems from '../Category/CategoryWiseItems';
import useMenu from '../../hooks/useMenu';
import { useParams } from 'react-router';

const validate = (formData: IMenu) => {

    let tempErrors: { [key: string]: string } = {};
    let count = 0;

    if (!formData.name) tempErrors.name = 'Name is required';
    if (formData.categories.length <= 0) tempErrors.category = 'At lest one category is required';
    if (formData.items.length <= 0) tempErrors.items = 'At least one recipe is required';

    count = Object.keys(tempErrors).length

    if (count > 0) {
        return tempErrors
    }

    return false;

};
const MenuForm: React.FC = () => {

    const { items: categories } = useCategories();
    const { add, update, items: menus } = useMenu()
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    console.log('id', id);

    useEffect(() => {

        if (id) {

            let res = menus.find(t => t.id === id);

            if (res) {

                setFormData(res);
                setErrors({});

            }

        }
        setIsLoading(false);
    }, [id, menus]);


    const [formData, setFormData] = useState<IMenu>({ id: "", name: '', categories: [], items: [] });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {

        setErrors({});
        let res = validate(formData)
        if (res) {
            setErrors(res)
        }

    }, [formData])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }, [formData]);

    const handleCategoriesSelect = useCallback((categoriesNames: string[]) => {
        const categoriesIds = categoriesNames.map(t => categories.find(c => c.name === t)?.id || '');

        setFormData({
            ...formData,
            categories: categoriesIds
        });
    }, [formData, categories]);

    const handleRecipeSelect = useCallback((items: string[]) => {
        console.log('items', items);
        setFormData({ ...formData, items });

    }, [formData]);

    const handleSubmit = useCallback((e: React.FormEvent) => {

        e.preventDefault();

        console.log('form data', formData);

        let res = validate(formData);

        if (res) {

            setErrors(res);

            return;

        }

        if (formData.id) {

            update(formData);

        } else {

            add(formData);

        }



    }, [formData, add, update]);

    const categoriesNames = useMemo(() => categories.map(t => t.name), [categories]);
    const selectedCategories = useMemo(() => formData.categories.map(t => categories.find(c => c.id === t)?.name || ''), [formData, categories]);


    return (
        <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
            <Typography variant="h4" fontSize={24} >{!formData.id ? "Add" : "Edit"} Menu</Typography>
            {
                isLoading && <CircularProgress color='primary' />}
            {
                !isLoading && <>
                    <Grid2 container>
                        <Grid2 container size={12} justifyContent={'space-between'}>
                            <Grid2 container direction={'column'} alignItems={'center'} justifyContent={'center'} size={4}>
                                <TextField size='small' label="Name" name='name' value={formData.name} onChange={handleChange} fullWidth={true}
                                    error={!!errors.name} helperText={errors.name}
                                />
                            </Grid2>
                            <Grid2 container direction={'column'} alignItems={'center'} justifyContent={'center'} size={4}>
                                <MultiSelect id="menu-categories" items={categoriesNames} label='Categories' onChange={handleCategoriesSelect}
                                    error={!!errors.category} helperText={errors.category}
                                    preSelected={selectedCategories}
                                />
                            </Grid2>
                            <Grid2 container direction={'column'} alignItems={'center'} justifyContent={'center'} size={4}>
                                <Button size='small' variant='contained' onClick={handleSubmit}>Save</Button>
                            </Grid2>
                        </Grid2>
                        <Typography variant='caption' color='error'>{errors.items}</Typography>
                        <Grid2 container size={12} justifyContent={'space-between'}>
                            <CategoryWiseItems onRecipeSelection={handleRecipeSelect} preSelectedRecipes={formData.items} selectedCategories={formData.categories} />
                        </Grid2>
                    </Grid2>
                </>
            }
        </Paper>
    );
};

export default MenuForm;
