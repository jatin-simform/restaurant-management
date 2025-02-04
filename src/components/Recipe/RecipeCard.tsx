import React, { useCallback } from 'react';
import { Typography, Button, Chip, Grid2, Rating, Stack, Box } from '@mui/material';
import { IRecipe } from '../../types';
import { BarChart } from '@mui/icons-material';
import { useNavigate } from 'react-router';

interface IRecipeCardProps {
    recipe: IRecipe
}

const RecipeCard: React.FC<IRecipeCardProps> = ({ recipe }) => {

    const navigate = useNavigate();

    const onClick = useCallback(() => {

        navigate("/recipes/" + recipe.id);

    }, [navigate, recipe.id])

    return <>
        <Grid2 size={{ sm: 4, md: 6, xs: 12 }} container justifyContent="center" padding={{ xs: 3, sm: 0, md: 0 }}>
            <Box width={{
                xs: 280,
                sm: 200,
                md: 200,
            }}

                height={{
                    xs: 200,
                    sm: 150,
                    md: 200,
                }}
                style={{ borderRadius: 15, overflow: 'hidden' }}
                component={'img'} src={recipe.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLi8423a2GdO2yi0Ig5N2iRQ8gkCd-F4KTFQ&s"} alt={recipe.name}
            />
        </Grid2>
        <Grid2 size={{ sm: 6, md: 6, xs: 12 }} container justifyContent={'center'} alignItems={'center'}>
            <Grid2 size={12} container justifyContent={'center'} >
                <Typography variant="h6"> {recipe.name.length > 25 ? recipe.name.substring(0, 20) + "..." : recipe.name}</Typography>
            </Grid2>
            <Grid2 size={12} container justifyContent={'center'} >
                <Stack direction="row" spacing={1} alignItems="center">
                    <BarChart color="secondary" />
                    <Typography variant='body1' color="secondary" fontWeight={900}>
                        <strong> ${recipe.price}/{recipe.qty}</strong>
                    </Typography>
                </Stack>
            </Grid2>
            <Grid2 size={12} container justifyContent={'center'} >
                <Stack direction="row" spacing={1} alignItems="center">
                    <Rating name="read-only" color='primary' size="small" value={3} readOnly style={{
                        border: '1px solid lightgray', borderRadius: 10, padding: 1
                    }} />
                    <Chip label="445 reviews" size="small" color="primary" />
                </Stack>
            </Grid2>
            <Grid2 size={12} container justifyContent={'center'} >
                <Button variant="text" color="secondary" onClick={onClick} > View Details</Button>
            </Grid2>
        </Grid2>
    </>

};

export default RecipeCard;
