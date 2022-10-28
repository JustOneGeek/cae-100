import React, {useContext} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import ThemeSwitch from './ThemeSwitch'
import {Link} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AppContext } from '../context/AppContext';
import Badge from '@mui/material/Badge';
import MUILink from '@mui/material/Link';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function NavBar({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {user, cart} = useContext(AppContext);

  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{flexGrow:1}}>
            <Link to='/'>
              <img alt="CrAvE Logo" style={{maxHeight:'60px'}} src="https://res.cloudinary.com/cae67/image/upload/v1666705391/crave2_eydr78.png"/>
            </Link>
          </Box>
           
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user?.icon?
                <Avatar alt={user.first_name} src={`https://avatars.dicebear.com/api/adventurer/${user.icon}.svg`} />
                :
                <Avatar alt="Please Login" src={`https://avatars.dicebear.com/api/adventurer/${new Date().getDay()}.svg`} />
                }
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
              {user?
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to='/logout' style={{textDecoration: 'none', color:'black'}}>
                    <Typography textAlign="center">Logout</Typography>
                  </Link>
                </MenuItem>
              :
          
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link to='/login' style={{textDecoration: 'none', color:'black'}}>
                    <Typography textAlign="center">Login</Typography>
                  </Link>
                </MenuItem>

         
              }
            
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{color:"white", backgroundColor:"#1f0745", backgroundImage:"linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://res.cloudinary.com/cae67/image/upload/v1666706283/herbcol_fpamr7.png')", flexGrow:1, }}> 
        <DrawerHeader>
          Paths to Enlightenment
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color:"white"}} /> : <ChevronLeftIcon sx={{color:"white"}} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {label:'Cart', path:'/cart', icon: <Badge badgeContent={cart.length} color="primary"><ShoppingCartTwoToneIcon sx={{color:'white'}}/></Badge> },
            {label:'Shop', path:'/shop', icon: <StorefrontTwoToneIcon sx={{color:'white'}}/>},

          ].map((navItem, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <Link to={navItem.path} style={{textDecoration: 'none', color:'white'}}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {navItem.icon}
                  </ListItemIcon>
                  <ListItemText primary={navItem.label} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>  
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display: 'block' }}>
              <MUILink href='/home' color="inherit" underline="none" sx={{display:"flex"}}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <ConnectWithoutContactIcon style={{color:"white"}}/>
                  </ListItemIcon>
                  <ListItemText primary={"Social"} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </MUILink>  
            </ListItem>
        </List>
        <Divider />
 
        
            <ListItem disablePadding sx={{ position: "absolute", bottom:"0px", alignContent:"center", justifyContent:"center" }}>
                {open ?<ThemeSwitch/> : ""}
            </ListItem>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       
                  {children}
      </Box>
    </Box>
  );
}
