import { Checkbox, Grid2 } from "@mui/material";
import useCategories from "../../hooks/useCategories";
import { ChangeEvent, useCallback, useState } from "react";
import useRecipes from "../../hooks/useRecipes";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import EmptyState from "../EmptyState";

interface ICategoryWiseItemsProps {
    selectedCategories: string[];
    onRecipeSelection: (ids: string[]) => void;
    preSelectedRecipes: string[];
    selectedCategory: string;
}

const CategoryWiseItems: React.FC<ICategoryWiseItemsProps> = ({ selectedCategory, onRecipeSelection, preSelectedRecipes }) => {

    const { items: categories } = useCategories();
    const { items: recipes } = useRecipes();
    const [selectionModel, setSelectionModel] = useState<string[]>(preSelectedRecipes);
    const tableItems = recipes.filter((r) => selectedCategory === r.categoryID);

    const handleSelectRow = useCallback((e: ChangeEvent<HTMLInputElement>, rowId: string) => {
        let updatedSelection: string[];
        if (e.target.checked) {
            updatedSelection = [...selectionModel, rowId];
        } else {
            updatedSelection = selectionModel.filter((id) => id !== rowId);
        }
        onRecipeSelection(updatedSelection);
        setSelectionModel(updatedSelection);
    }, [selectionModel,onRecipeSelection]);

    const columns = [
        {
            field: "id",
            renderHeader: () => (null),
            renderCell: (params: GridRenderCellParams) => (
                <Checkbox
                    checked={selectionModel.includes(params.row.id)}
                    onChange={(e) => handleSelectRow(e, params.row.id)}
                />
            ),
            width: 50,
            sortable: false,
        },
        {
            field: "image",
            headerName: "Image",
            width: 150,
            renderCell: (params: GridRenderCellParams) => (
                <img src={params.value} alt={params.row.name} style={{ width: 50, height: 50 }} />
            ),
            sortable: false,
        },
        { field: "name", headerName: "Name", width: 180 },
        { field: "description", headerName: "Description", width: 250 },
        { field: "price", headerName: "Price ($)", width: 120 },
        { field: "qty", headerName: "Quantity", width: 120 },
        {
            field: "categoryID",
            headerName: "Category",
            width: 150,
            renderCell: (params: GridRenderCellParams) => {
                const res = categories.find((t) => t.id === params.row.categoryID);
                return res ? <>{res.name}</> : <></>;
            },
            sortable: false,
        },
    ];

    if (tableItems.length === 0) {
        return (
            <Grid2 size={12} marginTop={2} container justifyContent="center">
                <EmptyState />
            </Grid2>
        );
    }

    return (
        <>
            <Grid2 size={12}>
                <DataGrid
                    rows={tableItems}
                    columns={columns}
                    disableColumnMenu
                    disableRowSelectionOnClick
                />
            </Grid2>
        </>
    );
};

export default CategoryWiseItems;
