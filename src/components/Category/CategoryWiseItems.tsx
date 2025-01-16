import { Avatar, Button, Checkbox, Grid2, List, ListItem, ListItemAvatar, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import useCategories from "../../hooks/useCategories";
import { ChangeEvent, Fragment, useCallback, useState } from "react";
import useRecipes from "../../hooks/useRecipes";
import { useNavigate } from "react-router";
import { IRecipe } from "../../types";

interface ICategoryWiseItemsProps {
    selectedCategories: string[];
    onRecipeSelection: (ids: string[]) => void;
    preSelectedRecipes: string[];
}

const getCategoryItems = (categoryID: string, recipes: IRecipe[]) => {

    return recipes.filter(t => categoryID===t.categoryID);

}

const CategoryWiseItems: React.FC<ICategoryWiseItemsProps> = ({ selectedCategories,onRecipeSelection,preSelectedRecipes }) => {

    const { items: categories } = useCategories();
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedRecipes, setSelectedRecipes] = useState<string[]>(preSelectedRecipes);
    const { items: recipes } = useRecipes();
    const navigate = useNavigate();

    const handleRecipeEdit = useCallback((id: string) => {

        navigate(`/recipes/${id}`);

    }, [navigate]);

    const handleSelectCategory = useCallback((id: string) => {

        setSelectedCategory(id);

    }, []);

    const handleSelectAllRecipes = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        const { checked } = e.target;
        if (!checked) {
            setSelectedRecipes([]);
            onRecipeSelection([])
            return;
        }

        let ids = recipes.filter(t => t.categoryID === selectedCategory).map(t => t.id);
        setSelectedRecipes(ids);
        onRecipeSelection(ids)


    }, [selectedCategory, recipes, categories,onRecipeSelection]);

    const handleRecipeSelection = useCallback((id: string) => {

        if (selectedRecipes.includes(id)) {
            let selectedIds=selectedRecipes.filter(t => t !== id);

            setSelectedRecipes(selectedIds);

            onRecipeSelection(selectedIds);
            return;
        }

        setSelectedRecipes([...selectedRecipes, id]);
        onRecipeSelection([...selectedRecipes, id]);


    }, [selectedRecipes, onRecipeSelection]);

    return <>
        <Grid2 size={6} >
            <Paper style={{ width: "100%", height: '60vh', overflowY: 'auto' }}>
                {
                    <List>
                        {
                            categories.filter(t => selectedCategories.includes(t.id)).map((t) => {
                                return <>
                                    <ListItem component={Button}
                                        color={selectedCategory === t.id ? 'primary' : 'secondary'}
                                        onClick={() => handleSelectCategory(t.id)}
                                        key={t.id}>
                                        <Typography fontWeight={selectedCategory === t.id ? '900' : '500'} >{t.name} ( {getCategoryItems(t.id,recipes).length} )</Typography>
                                    </ListItem>
                                </>
                            })
                        }
                    </List>
                }
            </Paper>
        </Grid2>
        <Grid2 size={6} >
            <Paper style={{ width: "100%", height: '60vh', overflowY: 'auto' }}>
                {
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox onChange={handleSelectAllRecipes} />
                                </TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                getCategoryItems(selectedCategory,recipes).map((t) => {
                                    return <Fragment key={t.id}>
                                        <TableRow>
                                            <TableCell>
                                                <Checkbox checked={selectedRecipes.includes(t.id)} onChange={() => handleRecipeSelection(t.id)} />
                                            </TableCell>
                                            <TableCell><Avatar src={t.image} /></TableCell>
                                            <TableCell>{t.name}</TableCell>
                                            <TableCell>{t.price}</TableCell>
                                            <TableCell>{t.qty}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => { handleRecipeEdit(t.id) }}>Edit</Button>
                                            </TableCell>
                                        </TableRow>
                                    </Fragment>
                                })
                            }
                        </TableBody>
                    </Table>
                }
            </Paper>
        </Grid2>

    </>

}

export default CategoryWiseItems;