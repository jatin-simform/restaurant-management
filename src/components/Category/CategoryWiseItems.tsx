import { List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from "@mui/material";
import useCategories from "../../hooks/useCategories";
import useRecipes from "../../hooks/useRecipes";
import { IRecipe } from "../../types"; // Adjust the import path as necessary

const getCategoryWiseItems = (categoryId: string, items: IRecipe[]) => {

    return items.filter((t) => t.categoryID === categoryId)

}

const CategoryWiseItems: React.FC = () => {

    const { items: categories } = useCategories();
    const { items: recipes } = useRecipes();

    return <>
        <Paper style={{ width: "50%", height: '60vh' }}>
            {
                categories.map((t) => {
                    const _data = getCategoryWiseItems(t.id, recipes);
                    return <>
                        <Typography variant="h4" padding={1} >{t.name}</Typography>
                        <List>
                            {
                                _data.map((r) => {
                                    return <>
                                        <ListItem>
                                            <ListItemAvatar />
                                            <ListItemText>{r.name}</ListItemText>
                                        </ListItem>
                                    </>
                                })
                            }
                        </List>
                    </>
                })
            }
        </Paper>
    </>

}

export default CategoryWiseItems;