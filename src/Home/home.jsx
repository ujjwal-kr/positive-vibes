import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Public, Bookmark, DesktopMac, Movie, Explore } from '@material-ui/icons';
import { Switch, Route, Link } from 'react-router-dom';

import Redirect from './redirect';
import NewsItemComponent from './news';
import NewsId from './newsId';
import SettingsComponent from '../Settings/settings';
import { NavLink } from '../Components/newsItem';
import LoginComponent from '../Auth/login';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function HomeComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true, false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            +VE Vibes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to = "/" style = {NavLink}>
          <ListItem button >
              <ListItemIcon><Public /></ListItemIcon>
              <ListItemText primary="Topstories" />
            </ListItem>
          </Link>

          <Link to = "/" style = {NavLink}>
            <ListItem button>
                <ListItemIcon><Bookmark /></ListItemIcon>
                <ListItemText primary="Bookmarks" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
        <Link to="/red/technology" style = {NavLink}>
          <ListItem button>
              <ListItemIcon><DesktopMac /></ListItemIcon>
              <ListItemText primary="Technology" />
          </ListItem>
        </Link>
        <Link to = "/red/entertainment" style = {NavLink}>
        <ListItem button>
              <ListItemIcon><Movie /></ListItemIcon>
              <ListItemText primary="Entertainment" />
        </ListItem>
        </Link>
        <Link to = "/red/science" style = {NavLink}>
        <ListItem button>
              <ListItemIcon><Explore /></ListItemIcon>
              <ListItemText primary="Science" />
        </ListItem> 
        </Link> 
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar className={classes.toolbar}  />
        <Switch>
          <Route path = "/" component = { NewsItemComponent } exact />
          <Route path = "/red/:id" component = { Redirect } />
          <Route path = "/news/:id" component = { NewsId } />
          <Route path = "/settings" component = { SettingsComponent } />
          <Route path = "/login" component = { LoginComponent } />
        </Switch>
      </main>
    </div>
  );
}
