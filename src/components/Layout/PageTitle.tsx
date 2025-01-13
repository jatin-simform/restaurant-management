import { Typography } from "@mui/material"

interface IPageTitleProps {
    title: string
    isMobileView: boolean
}

const PageTitle: React.FC<IPageTitleProps> = ({ title, isMobileView }) => {

    if (isMobileView) {

        return <>
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                {title}
            </Typography>
        </>
    }

    return <>

        <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            {title}
        </Typography>
    </>

}

export default PageTitle