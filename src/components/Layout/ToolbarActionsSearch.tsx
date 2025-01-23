import { Search } from "@mui/icons-material";
import { Stack, TextField, IconButton } from "@mui/material";
import { ThemeSwitcher } from "@toolpad/core";
import { useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import useScreenRatio from "../../hooks/useScreenRatio";

const ToolbarActionsSearch: React.FC = () => {

    const isMobileView = useScreenRatio()
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {

        if (searchRef.current) {

            searchRef.current.value = ''

        }

    }, [pathname, searchRef])

    const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>) => {

        const target = searchRef.current;

        if (!target) return;

        if (e.key === 'Enter') {

            const [, path, id] = window.location.pathname.split("/")
            if (id || path == 'dashboard' || path === 'search') {

                navigate('/search?search=' + target.value);

            } else {

                setSearchParams({ search: target.value })
            }

        }

    }, [pathname, navigate, searchRef])

    return (
        <Stack direction="row">
            <div>
                <TextField
                    onKeyDown={handleKeyDown}
                    inputRef={searchRef}
                    variant="standard"
                    label="Search"
                    size="small"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton type="button" aria-label="search" size="small" color="primary" >
                                    <Search color="primary" />
                                </IconButton>
                            ),
                            sx: { pr: 0.5 },
                        },
                    }}
                    sx={{
                        display: { xs: isMobileView ? 'none' : 'none', md: 'inline-block' }, mr: 1,
                        width: { xs: '200px', md: 'auto' },

                    }}
                />
            </div>
            <ThemeSwitcher />
        </Stack>
    );
}

export default ToolbarActionsSearch