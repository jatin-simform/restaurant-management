import { Box, Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, Chip } from "@mui/material";
import React from "react";
import { Fragment } from "react/jsx-runtime";
import useCategories from "../../hooks/useCategories";
import useRecipes from "../../hooks/useRecipes";

interface IMenuViewProps {
    selectedCategories: string[],
    selectedItems: string[]
}

const MenuView: React.FC<IMenuViewProps> = ({ selectedCategories, selectedItems }) => {

    const { items: categories } = useCategories();
    const { items: recipes } = useRecipes();

    return <>
        <Box>
            {
                categories.filter(c => selectedCategories.includes(c.id)).map((cat, index) => {
                    let cRecipes = recipes.filter(r => r.categoryID === cat.id).filter(r => selectedItems.includes(r.id));
                    if (cRecipes.length === 0) return null
                    return <React.Fragment key={index}>
                        <Box>
                            <Typography variant="h5" fontWeight={900}>{cat.name} </Typography>
                            <Divider />
                            <List>
                                {
                                    cRecipes.map((r, index) => {
                                        return <Fragment key={index}>
                                            <ListItem >
                                                <ListItemAvatar >
                                                    <img src={r.image} alt={r.name} width={75} height={75} />
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={'100%'}>
                                                        <Typography textAlign={'center'} padding={2} ><strong>{r.name}</strong></Typography>
                                                        <Chip label={`${r.qty}+/$${r.price}`} color="info" />
                                                    </Box>
                                                </ListItemText>
                                            </ListItem>
                                        </Fragment>
                                    })
                                }
                            </List>
                        </Box>
                    </React.Fragment>
                })

            }
        </Box>
    </>
}

export default MenuView