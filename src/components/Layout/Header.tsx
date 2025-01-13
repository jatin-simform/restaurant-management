import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import { IAuthUser } from '../../contexts/authContext';
import HeaderMenu, { IUrl } from './HeaderMenu';
import PageTitle from './PageTitle';
import useScreenRatio from '../../hooks/useScreenRatio';
import UserProfile from './UserProfile';

interface IHeaderProps {
  title: string,
  icon?: React.ReactElement,
  links: IUrl[],
  user?: IAuthUser
}

const Header: React.FC<IHeaderProps> = ({ icon, links, title, user }) => {

  const isMobileView = useScreenRatio();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {icon || <DinnerDiningIcon width={50} height={50} sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />}
          {!isMobileView && <PageTitle title={title} isMobileView={isMobileView} />}
          {!isMobileView && <HeaderMenu links={links} isMobileView={isMobileView} />}
          {icon || <DinnerDiningIcon width={50} height={50} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />}
          {isMobileView && <PageTitle title={title} isMobileView={isMobileView} />}
          {
            isMobileView && <HeaderMenu links={links} isMobileView={isMobileView} />
          }
          <UserProfile userProfilePic='/profilepic.webp'/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;