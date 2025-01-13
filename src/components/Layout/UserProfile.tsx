import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material"
import { MouseEvent, useCallback, useState } from "react";


interface IUserProfile {
    userProfilePic: string,
}

const UserProfile: React.FC<IUserProfile> = ({ userProfilePic }) => {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = useCallback((event: MouseEvent<HTMLElement>) => {

        setAnchorElUser(event.currentTarget);

    }, []);


    const handleCloseUserMenu = useCallback(() => {
        //todo logout from here when clicked
        setAnchorElUser(null);
    }, []);

    return <>
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="user profile" src={userProfilePic} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center' }}>Logout </Typography>
                </MenuItem>

            </Menu>
        </Box>

    </>

}


export default UserProfile
