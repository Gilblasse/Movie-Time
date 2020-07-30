import React from 'react'
import {Typography} from '@material-ui/core';
import Context from '../Config/Context';
import { withRouter } from "react-router-dom";







function FeaturedMovie(props) {    

    const handleClick = (show,movie)=>{
        show(movie)
        props.history.push(`/movies/${movie.title}`)
    }   


    return (
        <Context.Consumer>
            
            {
                ({ state:{ featured  }, showMovie }) => {
                    const {backdrop_path, title, release_date, runtime, vote_average, overview} = featured
                    
                    return (
                        <div className="parent">
                            <div id="featured-wrapper">
                                <div>   
                                    <img src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} 
                                        alt={`${title} Poster`} 
                                        id="featured" 
                                        onClick={() => handleClick(showMovie, featured)}
                                    />
                                </div>

                                <div className="jumbotron">
                                    <Typography variant="h4" align="right">
                                        {title}
                                    </Typography>

                                    <Typography variant="subtitle1" align="right">
                                        {` ${release_date} | ${runtime} min | ${vote_average} votes`}
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" align="right">
                                        {overview}
                                    </Typography>
                                </div>

                            </div>
                        </div>
                    )
                }

            }
            
        </Context.Consumer>
    )

}

export default withRouter(FeaturedMovie)








