import { LinearProgress, Paper, Grid2, Typography, Button } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { DataGrid, GridRenderCellParams, renderActionsCell } from '@mui/x-data-grid';
import useRecipes from "../../hooks/useRecipes";
import { IRecipe } from "../../types";
import useCategories from "../../hooks/useCategories";


const RecipeList: React.FC = () => {
    const navigate = useNavigate();
    const { items: recipes, isLoading, delete: remove } = useRecipes();
    const { items: categories } = useCategories();
    const columns = [
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'description', headerName: 'Description', width: 250 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params: GridRenderCellParams<IRecipe>) => (
                <img src={params.value} alt={params.row.name} style={{ width: 50, height: 50 }} />
            ),
        },
        { field: 'price', headerName: 'Price ($)', width: 120 },
        { field: 'qty', headerName: 'Quantity', width: 120 },
        { field: 'weight', headerName: 'Weight (g)', width: 120 },
        {
            field: 'categoryID', headerName: 'Category', width: 150, renderCell: (params: GridRenderCellParams<IRecipe>) => {
                const res = categories.find(t => t.id === params.row.categoryID);
                console.log("params", params.row, res)
                if (res) {
                    return <>{res.name}</>;
                }
                return <></>

            }
        },
        {
            field: 'actions', headerName: 'Actions', width: 240, renderCell: ({ row }: GridRenderCellParams<IRecipe>) => {
                const onEdit = () => {
                    navigate("/recipes/" + row.id)
                }
                const onDelete = () => {
                    remove(row.id)
                }

                return <>
                    <Button variant="text" onClick={onEdit} color="primary">Edit</Button>
                    <Button variant='text' onClick={onDelete} color="error">Delete</Button>
                </>

            }
        },
    ];

    const handleAddClick = useCallback(() => {

        navigate("/recipes/0");

    }, [])

    return <>
        {
            isLoading && <LinearProgress color="secondary" />
        }
        <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
            <Grid2 container spacing={5} padding={5}>
                <Grid2 size={10}>
                    <Typography variant="h4" fontSize={24} >Manage Recipes</Typography>
                </Grid2>
                <Grid2 size={2}>
                    <Button variant='contained' color="primary" onClick={handleAddClick}>Add</Button>
                </Grid2>
                <Grid2 size={12} >
                    <DataGrid
                        rows={recipes}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]} // Define page size options
                    />
                </Grid2>
            </Grid2>
        </Paper>
    </>

}

export default RecipeList;
