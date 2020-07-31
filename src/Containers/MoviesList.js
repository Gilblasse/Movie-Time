import React from 'react'
import MovieCard from '../Components/MovieCard'
import Context from '../Config/Context';
import Grid from '@material-ui/core/Grid';





function MoviesList(props) {

    return (
        <Context.Consumer>

            {
                ({state: { movies } }) => {
                    return (
                        
                        <Grid container spacing={2}>
                            {
                                movies.length !== 0 ?( 
                                    movies.map((movie,i) => {

                                        return (
                                            <Grid item xs={6} md={5} lg={3} key={i}>
                                                <MovieCard movie={movie}/>
                                            </Grid>
                                        )

                                    })
                                ): <div>SEARCH NOT FOUND</div>
                                
                            }
                        </Grid>
                        
                    )
                }
            }
            
        </Context.Consumer>
    )
}

export default MoviesList
