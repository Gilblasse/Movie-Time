import React, { Component } from 'react';
import MoviesList from './MoviesList';
import FeaturedMovie from '../Components/FeaturedMovie';
import Context from '../Config/Context';
import {Typography} from '@material-ui/core';
import {Switch, Route} from "react-router-dom";
import ShowMovie from '../Components/ShowMovie';





class Main extends Component {
    
    render() {
        return (
                <Switch>

                    <Route exact path="/">
                        <Context.Consumer>
                            {
                                ({state}) =>{
                                    return (
                                        
                                        <div>
                                            
                                            {
                                                state.movies && state.featured
                                                ?   <>
                                                        <div>
                                                            <FeaturedMovie />
                                                        </div>
                                                        

                                                        <div className='movie-list-wrapper'>
                                                            
                                                            <Typography variant="h4">
                                                                TRENDING
                                                            </Typography>

                                                            <MoviesList />
                                                        </div>
                                                    </>
                                                : null
                                            }
                                    
                                        </div>
                                    )
                                }
                            }
                            
                        </Context.Consumer>
                    </Route>
                    

                    <Route exact path="/movies/:title" component={ShowMovie} />
                </Switch>
        );
    }
}

export default Main;
