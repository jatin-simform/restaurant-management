import React from 'react';
import { Typography, Button, Paper } from '@mui/material';
import { IRecipe } from '../../types';

interface IRecipeCardProps {
    recipe: IRecipe
}

const RecipeCard: React.FC<IRecipeCardProps> = ({ recipe }) => {

    return <Paper elevation={12} style={{ width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center' }} >
        <div style={{ width: '250px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <img style={{ width: '100%' }} src={recipe.image} alt={recipe.name} />
        </div>
        <Typography variant="h6" gutterBottom>
            {recipe.name.length > 10 ? recipe.name.substring(0, 10) + "..." : recipe.name}
        </Typography>
        <Typography component={'p'} textAlign={'center'} padding={1} style={{ wordBreak: 'break-word' }} variant="body2" color="textSecondary" >
            {recipe.description.length>60?recipe.description.substring(0,57)+"...":recipe.description}
        </Typography>
        <Button size="small" color="primary">
            View Recipe
        </Button>
    </Paper>
};

export default RecipeCard;
