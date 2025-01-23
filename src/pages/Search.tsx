import { Box, Button, Divider, FormControl, Grid2, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import { useCallback, useEffect, useMemo, useState } from "react"
import useMenu from "../hooks/useMenu";
import useRecipes from "../hooks/useRecipes";
import useCategories from "../hooks/useCategories";
import RecipeCard from "../components/Recipe/RecipeCard";
import { useSearchParams } from "react-router";
import EmptyState from "../components/EmptyState";
import BackButton from "../components/BackButton";

const Search = () => {
    const [search, setSearch] = useState('');
    const { items: menu } = useMenu();
    const { items: recipes } = useRecipes();
    const { items: categories } = useCategories();
    const [selectedMenu, setSelectedMenu] = useState(-1);
    const [selectedCategory, setSelectedCategory] = useState(-1)
    const [searchParams] = useSearchParams();
    const [perPage] = useState(9);
    const [curPage, setCurPage] = useState(1);;

    useEffect(() => {
        const search = searchParams.get('search');
        setSearch(search || '');
    }, [searchParams])

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

    }, [recipes, categories, menu, selectedMenu, selectedCategory, search, perPage, curPage])

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

    const onClickClear = useCallback(() => {

        setSelectedCategory(-1);
        setSelectedMenu(-1)
        setSearch("")

    }, [])
    let startIdx = (curPage - 1) * perPage;
    let endIdx = startIdx + perPage;
    const displayItems = items.slice(startIdx, endIdx);

    return <>
        <Box marginBottom={5} >
            <BackButton />
            <Divider style={{ marginTop: 10 }} />
        </Box>
        <Grid2 padding={2} marginTop={1} container  >
            <Grid2 size={{
                sm: 12,
                md: 8,
                xs: 12,
            }}>
                <Typography variant="h4" textAlign={{
                    sm: 'left',
                    md: 'left',
                    xs: 'center',
                }} fontSize={24} >
                    {items.length > 0 ? `Found ${items.length} Results for ${search}` : ''}
                </Typography>
            </Grid2>
            <Grid2 size={{
                sm: 12,
                md: 8,
                xs: 12,
            }} container justifyContent="ceter" alignItems="center" spacing={1} >
                <Grid2 size={{
                    md: 4,
                    sm: 12,
                    xs: 12
                }}>
                    <TextField variant="standard"  fullWidth value={search} label="Search" placeholder="Search" onChange={(e) => {
                        setSearch(e.target.value)
                    }} />
                </Grid2>
                <Grid2 container size={{
                    md: 3,
                    sm: 12,
                    xs: 12
                }} padding={1}>
                    <FormControl variant="standard" size="small" fullWidth>
                        <InputLabel id="menu">Filter By Menu</InputLabel>
                        <Select
                            fullWidth
                            labelId="menu"
                            value={selectedMenu}
                            onChange={handleMenuSelect}
                            label="Filter By Menu"
                        >
                            {menu.map((m, index) => {
                                return <MenuItem value={index} key={index} >{m.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 container size={{
                    md: 3,
                    sm: 12,
                    xs: 12
                }} padding={1}>
                    <FormControl variant="standard" size="small" fullWidth >
                        <InputLabel id="category">Filter By Category</InputLabel>
                        <Select
                            fullWidth
                            labelId="category"
                            value={selectedCategory}
                            onChange={handleCategorySelect}
                            label="Filter By Category"
                        >
                            {filteredCategories.map((m, index) => {
                                return <MenuItem value={index} key={index} >{m.name}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2 container size={2} padding={1} >
                    <Button size="medium" onClick={onClickClear} color="secondary"> Clear</Button>
                </Grid2>
            </Grid2>

            <Grid2 container
                size={12} marginTop={5}
                columnSpacing={{
                    md: 2,
                    xs: 4,
                }}
                rowSpacing={{
                    md: 2,
                    xs: 4,

                }}
            >
                {displayItems.map((item, index) => {
                    return <>
                        <Grid2 container size={{
                            sm: 15, md: 4,
                            xs: 12,
                        }} border={1}
                            borderColor={'lightgrey'}
                            borderRadius={6} justifyContent={'space-around'}
                            alignItems={'center'}
                            height={{ sm: 200, md: 250, }}
                            rowSpacing={1}
                        >
                            <RecipeCard recipe={item} key={index} />
                        </Grid2>
                    </>
                })}
                <Grid2 size={12} marginTop={2} container justifyContent="center">
                    {
                        items.length === 0 && <EmptyState />
                    }
                    {
                        items.length > 0 && <Pagination variant={'outlined'} size="large"

                            count={Math.ceil(items.length / perPage)}
                            page={curPage}

                            onChange={(e, p) => setCurPage(p)}
                            style={{
                                borderRadius: 50,
                                border: '1px solid lightgray',
                                padding: 5,
                            }}
                            shape={'circular'} color="primary" />
                    }
                </Grid2>
            </Grid2>
        </Grid2>
    </>

}


export default Search

