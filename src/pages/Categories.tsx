import { Button, Grid2, Paper, TextField, Typography } from "@mui/material"
import React, { ChangeEvent, useCallback, useState } from "react"
import { ICategory } from "../types"
import useCategories from "../hooks/useCategories";
import CategoryList from "../components/Category/CategoryList";

const defaultRecord={id:'',name:'',items:[]}
const Categories: React.FC = () => {

   const [curCategory, setCurCategory] = useState<ICategory>({...defaultRecord});
   const { add, delete: remove, update,items } = useCategories();

   const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

      setCurCategory((data) => {

         if (!data) {

            return {
               id: "",
               name: e.target.value,
            }

         }

         return { ...data, name: e.target.value }

      })
   }, [])



   const handleAddClick = useCallback(() => {

      if (curCategory) {

         if (curCategory?.id) {
            update({ ...curCategory })
         } else {
            add({ ...curCategory })
         }
         setCurCategory({...defaultRecord})
      }



   }, [curCategory, add, update])

   const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {

      if (e.key === 'Enter') {

         handleAddClick();
         
      }

   }, [handleAddClick]);

   const onEdit=useCallback((data:ICategory)=>{

      setCurCategory(data)

   },[Categories])

   return <>
      <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
         <Typography variant="h4" fontSize={24} >Manage Categories</Typography>
         <Grid2 container spacing={5} padding={5}>
            <Grid2 size={10}>
               <TextField label={"Category Name"} value={curCategory.name} onKeyDown={handleKeyDown} onChange={handleNameChange} size="small" fullWidth
                  error={curCategory?.name.length === 0}
                  helperText={curCategory?.name.length === 0 ? "Name is required" : ""}
               />
            </Grid2>
            <Grid2 size={2}>
               <Button variant='contained' color="primary" onClick={handleAddClick}>{curCategory.id?"Edit":"Add"}</Button>
            </Grid2>
         </Grid2>
         <Typography variant="h4" fontSize={24} >Categories</Typography>
         <CategoryList items={[...items].reverse()} onEdit={onEdit} onDelete={remove}/>
      </Paper>
   </>

}

export default Categories