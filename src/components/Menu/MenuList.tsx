import {   Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid2, IconButton, LinearProgress, Paper, Typography } from "@mui/material";
import useMenu from "../../hooks/useMenu";
import React, {  useCallback, useEffect, useMemo, useState } from "react";
import { ICategory, IMenu } from "../../types";
import { useNavigate, useSearchParams } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import useCategories from "../../hooks/useCategories";
import { Delete, Edit,  RemoveRedEye } from "@mui/icons-material";
import EmptyState from "../EmptyState";
import BackButton from "../BackButton";
import MenuView from "./MenuView";



const MenuList: React.FC = () => {

    const { delete: _remove, isLoading, items: rows } = useMenu();
    const [search, setSearch] = useState('');
    const [searchParams] = useSearchParams();
    const [curMenu, setMenu] = useState<IMenu | null>(null)

    useEffect(() => {
        let value = searchParams.get('search') || ''
        setSearch(value.toLocaleLowerCase())
    }, [searchParams])

    const { items: categories } = useCategories();

    const navigate = useNavigate();

    const handleAddClick = useCallback(() => {

        navigate("/menus/0");

    }, [])

    const renderCell = useCallback((params: { row: IMenu }) => {

        const onClickEdit = () => {

            navigate("/menus/" + params.row.id);

        }

        const onClickDelete = () => {

            _remove(params.row.id)

        }
        const onClickShow = () => {

            setMenu(params.row)

        }

        return <>
            <IconButton onClick={onClickEdit} color="primary"><Edit /></IconButton>
            <IconButton onClick={onClickDelete} color="secondary"><Delete /></IconButton>
            <IconButton onClick={onClickShow}><RemoveRedEye /> </IconButton>
        </>

    }, [navigate]);

    const columns = useMemo(() => {

        return [
            { field: 'name', headerName: 'Name', width: 250 },
            {
                field: 'categories', headerName: 'Categories', width: 300, renderCell: (params: { row: IMenu }) => {

                    const chipsItems = categories.filter((cat) => {

                        return params.row.categories.includes(cat.id);

                    })

                    return chipsItems.map((category: ICategory) => {
                        return <Chip key={category.id} label={category.name} />
                    })

                }
            },
            {
                field: 'actions',
                headerName: 'Actions',
                sortable: false,
                width: 200,
                renderCell
            }
        ]

    }, [renderCell, categories])

    const data = useMemo(() => {

        if (!search) return rows

        return rows.filter(d => d.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

    }, [search, rows])

    const menuContent = useMemo(() => {

        if (!curMenu) return null;

        return <>
            <Dialog open={true} onClose={() => { setMenu(null) }}
                sx={{
                    '& .MuiDialogContent-root': {
                        padding: '16px',
                    },
                    '& .MuiDialog-paper': {
                        width: '100%',       // Adjust the width to 80% of the viewport
                        maxHeight: '90vh',  // Adjust the height to 90% of the viewport
                        height: 'auto',     // Ensure the height adjusts with content
                    }
                }}
            >
                <DialogTitle>
                    <Typography variant="h3" color="secondary" fontSize={30}  fontWeight={900} align="center">{curMenu.name}</Typography>
                </DialogTitle>
                <DialogContent>
                    <MenuView selectedCategories={curMenu.categories} selectedItems={curMenu.items} />
                </DialogContent>
                <DialogActions>
                    {/* Close Button */}
                    <Button variant="contained" onClick={() => { setMenu(null) }} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>


    }, [curMenu])

    return <>
        {
            isLoading && <LinearProgress color="secondary" />
        }
        {menuContent}
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

export default MenuList;
