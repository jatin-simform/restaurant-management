import { LinearProgress, Paper, Grid2,  Button,  IconButton,  Divider } from "@mui/material";
import {  useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import useRecipes from "../../hooks/useRecipes";
import { IRecipe } from "../../types";
import useCategories from "../../hooks/useCategories";
import { useSearchParams } from "react-router";
import EmptyState from "../EmptyState";
import { Edit, Delete } from "@mui/icons-material";
import BackButton from "../BackButton";


const RecipeList: React.FC = () => {
    const navigate = useNavigate();
    const { items: recipes, isLoading, delete: remove } = useRecipes();
    const { items: categories } = useCategories();
    const [search, setSearch] = useState('');

    const [searchParams] = useSearchParams();
    useEffect(() => {
        let value = searchParams.get('search') || ''
        setSearch(value.toLocaleLowerCase())
    }, [searchParams])

    const columns = [
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params: GridRenderCellParams<IRecipe>) => (
                <img src={params.value} alt={params.row.name} style={{ width: 50, height: 50 }} />
            ),
        },
        { field: 'name', headerName: 'Name', width: 180 },
        { field: 'description', headerName: 'Description', width: 250 },
        { field: 'price', headerName: 'Price ($)', width: 120 },
        { field: 'qty', headerName: 'Quantity', width: 120 },
        {
            field: 'categoryID', headerName: 'Category', width: 150, renderCell: (params: GridRenderCellParams<IRecipe>) => {
                const res = categories.find(t => t.id === params.row.categoryID);
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
                    <IconButton onClick={onEdit} color="primary"><Edit /></IconButton>
                    <IconButton onClick={onDelete} color="secondary"><Delete /></IconButton>
                </>

            }
        },
    ];

    const handleAddClick = useCallback(() => {

        navigate("/recipes/0");

    }, [])

    const data = useMemo(() => {

        if (!search) return recipes

        return recipes.filter(d => {

            return (d.name + d.description + d.price + d.weight).toLocaleLowerCase().includes(search);
        });

    }, [search, recipes])

    return <>
        {isLoading && <LinearProgress color="secondary" />}
        <Paper elevation={0} style={{ padding: '25px' }}>
            <Grid2 container justifyContent="space-between" alignItems="center" size={12} padding={1} justifyItems={'end'}>
                <BackButton />
                <Button style={{ float: 'right' }} variant='contained' color="primary" onClick={handleAddClick}>Add</Button>
            </Grid2>
            <Divider style={{ marginBottom: 10 }} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 700,
                    minHeight: 200,
                }}
            >
                {
                    data.length === 0 ?
                        <Grid2 size={12} marginTop={2} container justifyContent="center">
                            <EmptyState />
                        </Grid2>
                        : <DataGrid
                            rows={[...data].reverse()}
                            initialState={{ pagination: { paginationModel: { pageSize: 10, }, }, }}
                            columns={columns}
                            disableRowSelectionOnClick
                        />
                }
            </div>
        </Paper>
    </>

}

export default RecipeList;
