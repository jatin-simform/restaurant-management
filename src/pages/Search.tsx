import { Box, Button, Divider, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { ChangeEvent, useCallback, useMemo, useState } from "react"
import useMenu from "../hooks/useMenu";
import useRecipes from "../hooks/useRecipes";
import useCategories from "../hooks/useCategories";
import RecipeCard from "../components/Recipe/RecipeCard";

const Search = () => {
    const [search, setSearch] = useState('');
    const { items: menu } = useMenu();
    const { items: recipes } = useRecipes();
    const { items: categories } = useCategories();
    const [selectedMenu, setSelectedMenu] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState(-1)

    const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {

        const { value } = e.target;
        setSearch(value);

    }, []);

    const items = useMemo(() => {
        let res = recipes;

        if (selectedMenu >= 0) {

            res = res.filter((t) => menu[selectedMenu].items.includes(t.id));

        }

        if (selectedCategory >= 0) {

            res = res.filter((t) => categories[selectedCategory].id === t.categoryID);

        }

        if (search) {
            res = res.filter(t => t.name.includes(search));
        }

        return res;

    }, [recipes, categories, menu, selectedMenu, selectedCategory, search])

    const handleMenuSelect = useCallback((e: SelectChangeEvent<number>) => {

        setSelectedCategory(-1);
        setSelectedMenu(+e.target.value)

    }, [])

    const handleCategorySelect = useCallback((e: SelectChangeEvent<number>) => {

        setSelectedCategory(+e.target.value)

    }, [])

    const filteredCategories = useMemo(() => {

        if (selectedMenu >= 0) {

            const curMenu = menu[selectedMenu];
           return categories.filter(c => curMenu.categories.includes(c.id));

        }

        return [];

    }, [categories, selectedMenu, menu]);

    const onClickClear=useCallback(()=>{

        setSelectedCategory(-1);
        setSelectedMenu(-1)

    },[])


    return <>
        <Paper elevation={12} style={{ marginTop: "5%", marginLeft: '5%', padding: '25px', width: "90%", height: '70vh' }}>
            <Grid2 container spacing={5} padding={5}>
                <Grid2 size={4}>
                    <Typography variant="h4" fontSize={24} >Search Recipes</Typography>
                </Grid2>
                <Grid2 size={8}>
                    <TextField size="small" fullWidth onChange={handleSearchChange} label="Search" />
                </Grid2>

                <Grid2 container size={12} >
                    <Grid2 size={3} >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                maxHeight: 700,
                                minHeight: 500,
                                borderRight: '1px solid lightgray',
                                width: '100%',
                                paddingRight: '10px'
                            }}
                        >
                            <Typography fontWeight={900}>Filters</Typography>
                            <Divider />
                            <Box marginBottom={1} marginTop={1} width={'100%'}>
                                <Typography fontWeight={900}>Filter by menu</Typography>
                                <FormControl margin="dense" fullWidth >
                                    <InputLabel id="menu-lable">Menu</InputLabel>
                                    <Select margin="dense" size="small" id="menu" label={"Menu"} labelId="menu-lable"
                                        MenuProps={{
                                            style: {
                                                height: 300
                                            }
                                        }}
                                        onChange={handleMenuSelect}
                                    >
                                        {
                                            menu.map((m, index) => {

                                                return <MenuItem key={index} value={index}>{m.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Divider />
                            <Box marginBottom={1} marginTop={1} width={'100%'}>
                                <Typography fontWeight={900}>Filter by category</Typography>
                                <FormControl margin="dense" fullWidth >
                                    <InputLabel id="menu-lable">Category</InputLabel>
                                    <Select margin="dense" size="small" id="menu" label={"Category"} labelId="menu-lable"

                                        MenuProps={{
                                            style: {
                                                height: 300
                                            }
                                        }}
                                        onChange={handleCategorySelect}
                                    >
                                        {
                                            filteredCategories.map((c, index) => {
                                                return <MenuItem key={index} value={index}>{c.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box marginBottom={1} width={'100%'} >
                                <Grid2 container justifyContent={'end'}>
                                    <Button onClick={onClickClear} variant="contained" disabled={(selectedMenu === -1 && selectedCategory === -1)} color="primary" size="small"  >Clear filter</Button>
                                </Grid2>
                            </Box>
                        </div>
                    </Grid2>
                    <Grid2 size={9} >
                        <div style={{ overflowY: 'auto', width: '100%', height: '500px' }}>
                            <Grid2 container justifyContent={'space-arount'}  >
                                {items.map((item, index) => {
                                    return <>
                                        <Grid2 margin={2} container size={3} >
                                            <RecipeCard recipe={item} key={index} />
                                        </Grid2>
                                    </>
                                })}
                            </Grid2>
                        </div>
                    </Grid2>
                </Grid2>
            </Grid2>
        </Paper>
    </>

}


export default Search

