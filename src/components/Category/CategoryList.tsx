import React, { useCallback } from 'react';
import { ICategory } from '../../types';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useCategories from '../../hooks/useCategories';

interface ICategoryListProps {
    items: ICategory[],
    onEdit: (data: ICategory) => void
    onDelete: (id: string) => void
}

interface ICategoryListItemProps {
    item: ICategory,
    onDelete: (id: string) => void,
    onEdit: (data: ICategory) => void
}

const CategoryListItem: React.FC<ICategoryListItemProps> = ({ item, onDelete, onEdit }) => {

    const handleDelete = useCallback(() => {

        onDelete(item.id)

    }, [onDelete]);

    const handleEdit = useCallback(() => {

        onEdit(item)

    }, [onEdit]);

    return <>
        <TableRow key={item.id}>
            <TableCell component="th" scope="row">
                {item.name}
            </TableCell>
            <TableCell component="th" scope="row">
                {item.items.length}
            </TableCell>
            <TableCell align="right">
                <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleDelete} color='error'>Delete</Button>
            </TableCell>
        </TableRow>
    </>

}

const CategoryList: React.FC<ICategoryListProps> = ({ items, onEdit,onDelete }) => {


    return <>
        <TableContainer component={Paper} style={{ overflowY: 'scroll', height: 400 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Recipe Count</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((category) => (
                        <CategoryListItem onDelete={onDelete} onEdit={onEdit} key={category.id} item={category} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>

}

export default CategoryList;
