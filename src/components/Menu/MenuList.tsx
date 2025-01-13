import { Button, Chip, Grid2, LinearProgress, Paper, Typography } from "@mui/material";
import useMenu from "../../hooks/useMenu";
import { useCallback, useMemo } from "react";
import {  IMenu } from "../../types";
import { useNavigate } from "react-router";



const MenuList: React.FC = () => {

    const { delete: _remove, isLoaded, isLoading, items: rows, update } = useMenu();
    const navigate = useNavigate();

    const handleAddClick = useCallback(() => {

        navigate("/menus/0");

    }, [])

    const renderCell = useCallback((params: { row: { id: string } }) => {

        const onClickEdit = () => {

            navigate("/menus/" + params.row.id);

        }

        const onClickDelete = () => {

            _remove(params.row.id)

        }

        return <>
            <Button onClick={onClickEdit} >Edit</Button>
            <Button onClick={onClickDelete}>Delete</Button>
        </>

    }, [navigate])

    const columns = useMemo(() => {

        return [
            { field: 'id', headerName: 'ID', width: 150 },
            { field: 'name', headerName: 'Name', width: 300 },
            {
                field: 'categoryCount', headerName: 'Category Count', width: 780, renderCell: (params: { row: IMenu }) => {
                    return params.row.categories.map((category) => {
                        return <Chip key={category.id} label={category.name} />
                    })

                }
            },
            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                width: 180,
                renderCell
            }
        ]

    }, [renderCell])


    return <>
        {
            isLoading && <LinearProgress color="secondary" />
        }
        <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
            <Grid2 container spacing={5} padding={5}>
                <Grid2 size={10}>
                    <Typography variant="h4" fontSize={24} >Manage Menu</Typography>
                </Grid2>
                <Grid2 size={2}>
                    <Button variant='contained' color="primary" onClick={handleAddClick}>Add</Button>
                </Grid2>
            </Grid2>
        </Paper>
    </>

}

export default MenuList;
