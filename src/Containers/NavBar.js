import React from 'react';
import {IconButton,Toolbar,AppBar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import {Hidden } from '@material-ui/core'





function NavBar(props) {

  const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${props.drawerWidth}px)`,
          marginLeft: props.drawerWidth,
        },
      },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
  }));

  const classes = useStyles()



  return (
    <Hidden smUp implementation="css">
      <AppBar position="fixed" className={classes.appBar}>
          
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

      </AppBar>
    </Hidden>
  );

}

export default NavBar;
