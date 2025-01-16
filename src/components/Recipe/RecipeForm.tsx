
import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button, Grid2, FormControl, InputLabel, MenuItem, Select, Paper, Typography, SelectChangeEvent } from '@mui/material';
import useCategories from '../../hooks/useCategories';
import InputFileUpload from '../UI/FileUpload';
import { IRecipe } from '../../types';
import useRecipes from '../../hooks/useRecipes';
import { useNavigate, useParams } from 'react-router';


const validateRecipe = (recipe: IRecipe) => {

    const errors: { [key: string]: string } = {};

    if (!recipe.name) {
        errors.name = 'Name is required';
    }

    if (!recipe.description) {
        errors.description = 'Description is required';
    }

    if (!recipe.id)
        if (!recipe.image) {
            errors.image = 'Image is required';
        }

    if (recipe.price <= 0) {
        errors.price = 'Price must be greater than zero';
    }

    if (recipe.qty === '') {
        errors.qty = 'Quantity is required';
    }

    if (!recipe.categoryID) {
        errors.categoryID = 'Category is required';
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    return false;

};

const defultState: IRecipe = {
    id: '',
    name: '',
    description: '',
    image: '',
    price: 0,
    qty: '',
    weight: 0,
    categoryID: ''
}


const RecipeForm: React.FC = ({ }) => {

    const { items: categories } = useCategories();
    const [formData, setFormData] = useState<IRecipe>({ ...defultState });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const { add, update, items } = useRecipes();
    const navigate = useNavigate();


    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            let res = items.find(t => t.id === id);
            if (res) {
                setFormData(res);
                setErrors({})
            }
        }
    }, [id, items]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {


        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }, [formData]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {

            setFormData({
                ...formData,
                image: reader.result as string
            });

        };

        reader.readAsDataURL(file);

    }, [formData]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const fn = async () => {

            const res = validateRecipe(formData);

            if (res) {

                setErrors(res)
                return

            }

            if (formData.id) {

                await update({ ...formData })
                navigate("/recipes")
            } else {

                let newId = await add({ ...formData });
                navigate("/recipes/" + newId)
            }

        }

        fn();

    }, [formData, navigate]);
    const handleCategoryChange = useCallback((e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }, [formData])

    return (
        <Paper elevation={12} style={{ display: 'flex', flexDirection: 'row', marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
            <Grid2 container spacing={2} padding={5} width={"50%"}>
                <Grid2 size={10}>
                    <Typography variant="h4" fontSize={24} >{formData.id === '' ? "Add " : "Edit "} Recipes</Typography>
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        size='small'
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <FormControl fullWidth>
                        <InputLabel id="category">Cateogry</InputLabel>
                        <Select
                            size='small'
                            labelId="category"
                            name="categoryID"
                            id="category-select"
                            label="Cateogry"
                            error={Boolean(errors.categoryID)}
                            value={formData.categoryID}
                            onChange={handleCategoryChange}
                        >
                            {
                                categories.map((item, index) => {
                                    return <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
                                })
                            }
                        </Select>
                        <Typography color='error' variant='caption'>{errors.categoryID !== '' ? errors.categoryID : ''}</Typography>
                    </FormControl>
                </Grid2>

                <Grid2 size={12}>
                    <TextField
                        multiline
                        rows={4}
                        size='small'
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        fullWidth
                        error={Boolean(errors.description)}
                        helperText={errors.description !== '' ? errors.description : ''}
                    />
                </Grid2>
                <Grid2 size={12}>
                    <InputFileUpload onChange={handleFileChange}
                        error={Boolean(errors.image)}
                        helperText={errors.image || ""}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        size='small'
                        label="Price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        fullWidth
                        error={Boolean(errors.price)}
                        helperText={errors.price || ""}
                    />
                </Grid2>
                <Grid2 size={6}>
                    <TextField
                        size='small'
                        label="Quantity"
                        name="qty"
                        value={formData.qty}
                        onChange={handleChange}
                        fullWidth
                        error={Boolean(errors.qty)}
                        helperText={errors.qty || ""}
                    />
                </Grid2>

                <Grid2 size={12}>
                    <Button type="submit" variant="contained" onClick={handleSubmit} color="primary" fullWidth>
                        Submit
                    </Button>
                </Grid2>
            </Grid2>
            <Grid2 container width={'50%'}>
                <Grid2 size={12} >
                    {
                        formData.image && <img style={{ width: '100%' }} src={formData.image} />
                    }
                </Grid2>
            </Grid2>
        </Paper>
    );
};

export default RecipeForm;

