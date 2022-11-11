import React from 'react'
import {List,ListItem,ListItemText} from '@material-ui/core'
import {Drawer,Hidden } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import logo from '../imgs/logo.png'
import SearchBar from './SearchBar'
import Context from '../Config/Context'
import { withRouter } from "react-router-dom";





function SideBar(props) {
    const { window, drawerWidth } = props;    
    
    const useStyles = makeStyles((theme) => ({
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        }
    }));
    

    const container = window !== undefined ? () => window().document.body : undefined;
    const classes = useStyles()
    
    const handleClick = (fetch,genre,setactiveFilter)=>{
        setactiveFilter(genre)
        props.history.push('/')
        fetch()
    }

    const menu = ()=> {
        return (
            <div>
                {/* <div className={classes.toolbar} /> */}
                <Context.Consumer>
                    {
                        ({fetchMovieByGenre, items,setactiveFilter,activeFilter}) =>{
                            return (
                                <List>
                                    {items.map((item, i) => (
                                        <ListItem button selected={activeFilter === item} key={i} onClick={() => handleClick(fetchMovieByGenre, item, setactiveFilter)}>
                                            <ListItemText primary={item} />
                                        </ListItem>
                                    ))}
                                </List>
                            )
                        }
                    }
                   
                </Context.Consumer>
            </div>
        )
    }
    

    return (
        <>
            
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={props.mobileOpen}
                    onClose={props.handleDrawerToggle}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <div className={classes.toolbar} />
                    <img src={logo} className="img-fluid logo" alt="logo" onClick={()=>props.history.push('/')}/>
                    <div className="container">
                        <SearchBar />
                    </div>
                    {menu()}
                </Drawer>
            </Hidden>
        
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    
                    <img src={logo} className="img-fluid logo" alt="logo" onClick={()=>props.history.push('/')}/>

                    <div className="container">
                        <SearchBar />
                    </div>
                    {menu()}
                    
                </Drawer>
            </Hidden>

        </>
    )
}


export default withRouter(SideBar)