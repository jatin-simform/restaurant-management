import React, { ChangeEvent, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IMenu } from '../../types';
import { TextField, Button, Paper, Typography, Grid2, CircularProgress, LinearProgress, Tabs, Tab, Box, Divider } from '@mui/material';
import MultiSelect from '../UI/MultiSelect';
import useCategories from '../../hooks/useCategories';
import CategoryWiseItems from '../Category/CategoryWiseItems';
import useMenu from '../../hooks/useMenu';
import { useParams } from 'react-router';
import useNotification from '../../hooks/useNotification';
import BackButton from '../BackButton';

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
    const [curCategory, setCurCategory] = useState(-1)
    const { notifyError } = useNotification()
    const [edited, setEdited] = useState(false);

    useEffect(() => {

        if (id) {

            let res = menus.find(t => t.id === id);

            if (res) {

                setFormData(res);
                setCurCategory(0)
                setErrors({});
                setEdited(false)

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
        setEdited(true)
    }, [formData]);

    const handleCategoriesSelect = useCallback((categoriesNames: string[]) => {
        const categoriesIds = categoriesNames.map(t => categories.find(c => c.name === t)?.id || '');

        setFormData({
            ...formData,
            categories: categoriesIds
        });
        setEdited(true)
    }, [formData, categories]);

    const handleRecipeSelect = useCallback((items: string[]) => {

        setFormData({ ...formData, items });
        setEdited(true)
    }, [formData]);


    const handleSubmit = useCallback((e: React.FormEvent) => {

        e.preventDefault();
        setEdited(true)
        let res = validate(formData);

        if (res) {

            setErrors(res);

            if (res.items) {

                notifyError(res.items)

            }

            return;

        }

        if (formData.id) {

            update(formData);

        } else {

            add(formData);

        }



    }, [formData, add, update, notifyError]);

    const categoriesNames = useMemo(() => categories.map(t => t.name), [categories]);
    const selectedCategories = useMemo(() => formData.categories.map(t => categories.find(c => c.id === t)?.name || ''), [formData, categories]);
    const handleCategoryTabChange = useCallback((e: SyntheticEvent, newVal: number) => {

        setCurCategory(newVal)

    }, [])


    return (
        <Paper elevation={0} style={{ padding: '25px' }}>
            {isLoading && <LinearProgress color='primary' />}
            <Box marginBottom={5} >
                <BackButton />
                <Divider style={{ marginTop: 10 }} />
            </Box>
            {
                !isLoading && <>
                    <Grid2 container>
                        <Grid2 container size={12} spacing={5} justifyContent={'space-between'}>
                            <Grid2 container direction={'column'} alignItems={'center'} justifyContent={'center'}
                                size={{
                                    sm: 4,
                                    md: 4,
                                    xs: 12
                                }}>
                                <TextField size='small' label="Name" name='name' value={formData.name} onChange={handleChange} fullWidth={true}
                                    error={!!errors.name && edited} helperText={edited ? errors.name : ''}
                                />
                            </Grid2>
                            <Grid2 height={70} container direction={'column'} alignItems={'center'} justifyContent={'center'}
                                size={{
                                    sm: 6,
                                    md: 6,
                                    xs: 12
                                }}
                            >
                                <MultiSelect id="menu-categories" items={categoriesNames} label='Categories' onChange={handleCategoriesSelect}
                                    error={!!errors.category && edited} helperText={edited ? errors.category : ''}
                                    preSelected={selectedCategories}
                                />
                            </Grid2>
                            <Grid2 container direction={'column'} alignItems={'center'} justifyContent={'center'}

                                size={{
                                    sm: 2,
                                    md: 2,
                                    xs: 12
                                }}

                            >
                                <Button size='small' variant='contained' onClick={handleSubmit}>Save</Button>
                            </Grid2>
                        </Grid2>
                        <Grid2 direction={'column'} container size={12} justifyContent={'space-between'}>
                            <Grid2 size={12} container justifyContent={'start'}>
                                <Tabs
                                    variant='scrollable'
                                    allowScrollButtonsMobile
                                    value={curCategory} onChange={handleCategoryTabChange} >
                                    {categories.filter(c => formData.categories.includes(c.id)).map((item, index) => {
                                        return <Tab key={item.id + index} label={item.name} />
                                    })}
                                </Tabs>
                            </Grid2>
                            <CategoryWiseItems
                                key={curCategory}
                                selectedCategory={formData.categories[curCategory]}
                                onRecipeSelection={handleRecipeSelect} preSelectedRecipes={formData.items} selectedCategories={formData.categories} />
                        </Grid2>
                    </Grid2>
                </>
            }
        </Paper>
    );
};

export default MenuForm;
