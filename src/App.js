import React, { useState } from 'react'
import {CssBaseline} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SideBar from './Components/SideBar';
import NavBar from './Containers/NavBar';
import Main from './Containers/MainContainer';
// import Context from './Config/Context';




const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



function App(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
  
    <div className={classes.root}>
      <CssBaseline />
      <NavBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      
      
      <nav className={classes.drawer} aria-label="mailbox folders">
        <SideBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
      
      </nav>
     
     
      <main className={classes.content}>
        {/* <Context.Consumer>
          {
            ({ state:{ featured  }, showMovie }) => {
              console.log('Featured: ', featured)
              return (
              <div style={{display: 'flex'}}>
                <img width='55px' src={`${featured?.Poster}`} alt={`${featured?.title}`}/>
                <div>
                  {featured?.title}
                </div>
              </div>
              )
            }
          }           
        </Context.Consumer> */}
        <div className={classes.toolbar} />
        <Main/>
      </main>

    </div>
    
  );
}

export default App