import { Button, Chip, Grid2, LinearProgress, Paper, TextField, Typography } from "@mui/material";
import useMenu from "../../hooks/useMenu";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { ICategory, IMenu } from "../../types";
import { useNavigate } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import useCategories from "../../hooks/useCategories";



const MenuList: React.FC = () => {

    const { delete: _remove, isLoading, items: rows } = useMenu();
    const [search, setSearch] = useState('');
    const { items: categories } = useCategories();

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
            <Button onClick={onClickEdit} color="primary" >Edit</Button>
            <Button onClick={onClickDelete} color="error">Delete</Button>
        </>

    }, [navigate]);

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target
        setSearch(value);

    }, [])

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

        return rows.filter(d => d.name.includes(search));

    }, [search, rows])

    return <>
        {
            isLoading && <LinearProgress color="secondary" />
        }
        <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
            <Grid2 container spacing={5} padding={5}>
                <Grid2 size={6}>
                    <Typography variant="h4" fontSize={24} >Manage Menu</Typography>
                </Grid2>
                <Grid2 size={4}>
                    <TextField size="small" fullWidth onChange={handleSearchChange} label="Search" />
                </Grid2>
                <Grid2 size={2}>
                    <Button variant='contained' color="primary" onClick={handleAddClick}>Add</Button>
                </Grid2>
            </Grid2>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 700,
                    minHeight: 200,
                }}
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20]}
                />
            </div>
        </Paper>
    </>

}

export default MenuList;
