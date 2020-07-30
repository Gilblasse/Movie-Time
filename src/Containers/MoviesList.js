import React from 'react'
import MovieCard from '../Components/MovieCard'
import Context from '../Config/Context';





function MoviesList(props) {

    return (
        <Context.Consumer>

            {
                ({state: { movies } }) => {
                    return (
                        
                        <section className="row">
                            {
                                movies.length !== 0 ?( 
                                    movies.map((movie,i) => {

                                        return (
                                            <div className="mt-5 m-auto" key={i}>
                                                <MovieCard movie={movie}/>
                                            </div>
                                        )

                                    })
                                ): <div>SEARCH NOT FOUND</div>
                                
                            }
                        </section>
                        
                    )
                }
            }
            
        </Context.Consumer>
    )
}

export default MoviesList
