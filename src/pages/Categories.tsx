import { Button, Divider, Grid2, IconButton, LinearProgress, Paper } from "@mui/material"
import React, { MouseEvent, useCallback, useEffect, useMemo, useState } from "react"
import { ICategory } from "../types"
import useCategories from "../hooks/useCategories";
import CategoryForm from "../components/Category/CategoryForm";
import { useSearchParams } from "react-router";
import { Edit, Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyState from "../components/EmptyState";
import BackButton from "../components/BackButton";

const defaultRecord = { id: '', name: '', items: [] }

const Categories: React.FC = () => {

   const [curCategory, setCurCategory] = useState<ICategory>({ ...defaultRecord });
   const { add, delete: remove, update, items, isLoading } = useCategories();
   const [show, setShow] = useState(false);
   const [search, setSearch] = useState('');

   const [searchParams] = useSearchParams();
   useEffect(() => {
      let value = searchParams.get('search') || ''
      setSearch(value.toLocaleLowerCase())
   }, [searchParams])

   const onClickAdd = useCallback((e: MouseEvent) => {

      e.preventDefault();
      setShow(true)

   }, [])

   const onClose = useCallback(() => {

      setShow(false)

   }, [])

   const onSave = useCallback((data: ICategory) => {

      setShow(true);
      if (data?.id) {

         update({ ...data })

      } else {

         add({ ...data })

      }

      setCurCategory({ ...defaultRecord });
      setShow(false)

   }, [curCategory, add, update])

   const onEdit = useCallback((data: ICategory) => {

      setCurCategory(data);
      setShow(true)

   }, [Categories]);

   const renderCell = useCallback((params: { row: ICategory }) => {

      const onClickEdit = () => {
         onEdit(params.row)
      }

      const onClickDelete = () => {
         remove(params.row.id)
      }

      return <>
         <IconButton onClick={onClickEdit} color="primary"><Edit /></IconButton>
         <IconButton onClick={onClickDelete} color="secondary"><Delete /></IconButton>
      </>

   }, [onEdit, remove]);

   const columns = [
      { field: 'id', headerName: '#', width: 250 },
      { field: 'name', headerName: 'Name', width: 250 },
      {
         field: 'actions',
         headerName: 'Actions',
         sortable: false,
         width: 200,
         renderCell
      }

   ]

   const data = useMemo(() => {
      if (!search) return items

      return items.filter(d => d.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

   }, [search, items])

   return <>
      {isLoading && <LinearProgress color="secondary" />}
      {show && <CategoryForm onSave={onSave} onClose={onClose} category={curCategory} />}
      <Paper elevation={0} style={{ padding: '25px' }}>
         <Grid2 container justifyContent="space-between" alignItems="center" size={12} padding={1} justifyItems={'end'}>
            <BackButton />
            <Button style={{ float: 'right' }} variant='contained' color="primary" onClick={onClickAdd}>Add</Button>
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
                  : <DataGrid rows={[...data].reverse()} initialState={{ pagination: { paginationModel: { pageSize: 10, }, }, }}
                     columns={columns} disableRowSelectionOnClick />
            }

         </div>
      </Paper>
   </>

}

export default Categories