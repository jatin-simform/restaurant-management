import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IMenu } from '../../types';
import { TextField, Button, Paper, Typography, Grid2 } from '@mui/material';
import MultiSelect from '../UI/MultiSelect';
import { FoodBankOutlined } from '@mui/icons-material';
import useCategories from '../../hooks/useCategories';
import CategoryWiseItems from '../Category/CategoryWiseItems';

const validate = (formData: IMenu) => {

    let tempErrors: { [key: string]: string } = {};
    let count = 0;

    if (!formData.name) tempErrors.name = 'Name is required';
    if (formData.categories.length <= 0) tempErrors.category = 'At lest one category is required';

    count = Object.keys(tempErrors).length

    if (count > 0) {
        return tempErrors
    }

    return false;

};
const MenuForm: React.FC = () => {

    const {items:categories,isLoading:categoryLoading}=useCategories();

    const [formData, setFormData] = useState<IMenu>({ id: Math.random() + "", name: '', categories: [] });

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
    }, []);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            // Submit form data
            console.log(formData);
        }
    };
    const categoriesName=useMemo(()=>{return categories.map(t=>t.name)},[categories])

    return (
        <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
            <Grid2 container>
                <Grid2>
                    <TextField size='small' label="Name" name='name' onChange={handleChange} />
                    <MultiSelect id="menu-categories" items={categoriesName} label='Categories' />
                </Grid2>

                <Grid2>
                    <Typography variant='h4' ><FoodBankOutlined fontSize={'large'}/>{formData.name}</Typography>

                </Grid2>
                <Grid2 size={12}>
                        <CategoryWiseItems/>
                </Grid2>
            </Grid2>
        </Paper>

    );
};

export default MenuForm;
