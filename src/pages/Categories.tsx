import { Button, Grid2, Paper, TextField, Typography } from "@mui/material"
import React, { ChangeEvent, MouseEvent, useCallback, useMemo, useState } from "react"
import { ICategory } from "../types"
import useCategories from "../hooks/useCategories";
import CategoryList from "../components/Category/CategoryList";
import CategoryForm from "../components/Category/CategoryForm";

const defaultRecord = { id: '', name: '', items: [] }

const Categories: React.FC = () => {

   const [curCategory, setCurCategory] = useState<ICategory>({ ...defaultRecord });
   const { add, delete: remove, update, items } = useCategories();
   const [show, setShow] = useState(false);
   const [search, setSearch] = useState('');
   
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

   }, [Categories]);

   const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

      const { value } = e.target
      setSearch(value);

   }, [])

   const data = useMemo(() => {

      if (!search) return items

      return items.filter(d => d.name.includes(search));

   }, [search, items])

   return <>
      {show && <CategoryForm onSave={onSave} onClose={onClose} category={curCategory} />}
      <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
         <Grid2 container spacing={5} padding={5}>
            <Grid2 size={6}>
               <Typography variant="h4" fontSize={24} >Manage Categories</Typography>
            </Grid2>
            <Grid2 size={4}>
               <TextField size="small" fullWidth onChange={handleSearchChange} label="Search" />
            </Grid2>
            <Grid2 size={2}>
               <Button variant='contained' color="primary" onClick={onClickAdd}>Add</Button>
            </Grid2>
         </Grid2>
         <CategoryList items={[...data].reverse()} onEdit={onEdit} onDelete={remove} />
      </Paper>
   </>

}

export default Categories