import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import useScreenRatio from "../../hooks/useScreenRatio"
import { MouseEvent, useCallback, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';

export interface IUrl {
    name: string,
    action: () => void
}

interface IHeaderMenuProps {
    links: IUrl[],
    isMobileView:boolean
}

const HeaderMenu: React.FC<IHeaderMenuProps> = ({ links ,isMobileView}) => {

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = useCallback((e: React.MouseEvent<HTMLElement>) => {

        setAnchorElNav(e.currentTarget);

    }, [])


    const handleCloseNavMenu = useCallback(() => {
        setAnchorElNav(null);
    }, []);


    if (!isMobileView) return <>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {links.map((page, index) => (
                <Button
                    key={index}
                    onClick={page.action}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page.name}
                </Button>
            ))}


        </Box>

    </>


    return <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
        >
            <MenuIcon />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: 'block', md: 'none' } }}
        >
            {links.map((page, index) => (
                <MenuItem key={index} onClick={page.action}>
                    <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
            ))}
        </Menu>
    </Box>
}


export default HeaderMenu