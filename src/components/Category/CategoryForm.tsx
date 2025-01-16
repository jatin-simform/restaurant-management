import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { ICategory } from "../../types"
import { ChangeEvent, useCallback, useState } from "react";

const CategoryForm: React.FC<{ category: ICategory, onSave: (data: ICategory) => void, onClose: () => void }> = ({ category, onSave, onClose }) => {

    const [curCategory, setCurCategory] = useState(category);
    const [isEdited, setEdited] = useState(false)

    const handleNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        setEdited(true)
        setCurCategory((data) => { return { ...data, name: e.target.value } });

    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        
        if (e.key === 'Enter') {
            e.preventDefault();

            onSave(curCategory);

        }

    }, [onSave, curCategory]);

    const handleSaveClick = useCallback(() => {

        onSave(curCategory);

    }, [curCategory, onSave])

    return <>
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Category</DialogTitle>
            <DialogContent>
                <TextField margin="dense" label={"Category Name"} value={curCategory.name}
                    onKeyDown={handleKeyDown} onChange={handleNameChange} size="small"
                    fullWidth
                    error={isEdited && curCategory?.name.length === 0}
                    helperText={isEdited && curCategory?.name.length === 0 ? "Name is required" : ""}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='contained' size="small" color="primary" onClick={handleSaveClick}>{curCategory.id ? "Edit" : "Add"}</Button>
            </DialogActions>
        </Dialog>
    </>
}

export default CategoryForm