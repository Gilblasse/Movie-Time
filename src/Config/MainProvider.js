import React, {
    Component
} from 'react';
import axios from 'axios';
import Context from '../Config/Context';
// import { createBrowserHistory } from 'history';
import {
    withRouter
} from "react-router-dom";




const trendingMoviesApi = `${process.env.REACT_APP_MOVIE_LIBRARY_ORIGIN}/trending/movie/week?api_key=${process.env.REACT_APP_LIBRARY_KEY}`
// const moviesByYear = '${process.env.REACT_APP_MOVIE_LIBRARY_ORIGIN}/discover/movie?api_key=${process.env.REACT_APP_LIBRARY_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&'
const findMovieByTitleApi = `${process.env.REACT_APP_IMDB_API_END_POINT}/?apikey=${process.env.REACT_APP_IMDB_API_KEY}&t=`
const searchMovieByTitle = `${process.env.REACT_APP_MOVIE_LIBRARY_ORIGIN}/search/movie?api_key=${process.env.REACT_APP_LIBRARY_KEY}&language=en-US&page=1&include_adult=false&query=`
const findMovieTrailers = movID => `${process.env.REACT_APP_MOVIE_LIBRARY_ORIGIN}/movie/${movID}/videos?api_key=${process.env.REACT_APP_LIBRARY_KEY}&language=en-US`
const menuItems = {
    'Movies': 0,
    'Action': 28,
    'Comedy': 35,
    'Romance': 10749,
    'Family': 10751,
    'Mystery': 9648,
    'Animation': 16
}

class MainProvider extends Component {
    state = {
        searchTitle: '',
        allMovies: [],
        movies: [],
        featured: null,
        movie: null,
        page: 1,
        activeFilter: 'Movies',
    }


    async componentDidMount() {
        const movies = await this.fetchMovies()
        this.setState({
            allMovies: movies,
            movies
        }, this.fetchFeatured)

        const handleScroll = this.handleScroll.bind(this)
        window.addEventListener('scroll', handleScroll);
        // window.addEventListener('beforeunload', this.popUpBlocker);
    }


    updateMoviePage() {
        this.setState(prevState => ({
            page: prevState.page + 1
        }), async () => {
            const movies = await this.fetchMovies()

            this.setState(prev => ({
                allMovies: this.uniqMovies([...prev.allMovies, ...movies])
            }), () => {

                const activeGenreId = menuItems[this.state.activeFilter]
                const mixedMovies = this.uniqMovies([...this.state.allMovies, ...movies])
                const movis = activeGenreId !== 0 ? mixedMovies.filter(movie => movie.genre_ids.includes(activeGenreId)) : this.state.allMovies
                const featureGenersIds = this.state.featured?.genres ? this.state.featured.genres.map(g => g.id) : this.state.featured.genre_ids
                const featuredGenersIdsWithMoviesID = [...featureGenersIds ,0]
                const featuredPick = featuredGenersIdsWithMoviesID.includes(activeGenreId) ? this.state.featured : this.pickRandom(movis)
                
                this.fetchFeatured(featuredPick)

                this.setState({movies: movis})
            })
        })
    }

    uniqMovies(movies){
        const uniqListOfMovies = {}
        return movies.filter(d => {
            if(!uniqListOfMovies[d.id]){
                uniqListOfMovies[d.id] = d
                return true
            }
            return false
        })
    }


    handleScroll(e) {
        if (this.props.history.location.pathname === '/') {
            const percentage = document.body.offsetHeight * .18
            if ((window.innerHeight + window.scrollY) > document.body.offsetHeight - percentage) {
                this.state.searchTitle.length <= 2 && this.updateMoviePage()
            }
        }
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }


    openYouTubeInNewTab(key) {
        const newWindow = window.open(`https://www.youtube.com/watch?v=${key}`, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }



    showMovie(movieID) {
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=e47ec9ad25c216b1a5113b00fac67272&language=en-US`)
            .then(res => res.json())
            .then(movie => this.setState({
                movie
            }, async ()=>{
                const [trailer, teaser] = await this.getMovieTrailerTeasers(movieID)
                
                this.setState({movie: {...this.state.movie, teaser, trailer}})
            }))
    }

    async getMovieTrailerTeasers(movieID){
        const movieTrailerVidsRes = await fetch(findMovieTrailers(movieID))
        const vids = await movieTrailerVidsRes.json()
        const teasersTrailers = vids.results.reduce((obj, v) => {
            if(obj[v.type] && v.official && v.site === "YouTube"){
                obj[v.type] = [...obj[v.type],v]
            }
            return obj
        } ,{Teaser: [], Trailer: []})
        
        return [this.pickRandom(teasersTrailers.Trailer), this.pickRandom(teasersTrailers.Teaser)]
    }


    handleInputChange(e) {
        this.setState({
            searchTitle: e.target.value
        }, this.fetchMoviesBySearch)
    }

    pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)] || arr
    }


    fetchFeatured = async (featurdMovie) => {
        const selectedMovie = featurdMovie || this.pickRandom(this.state.allMovies)
        const { data: movie } = await axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=e47ec9ad25c216b1a5113b00fac67272&language=en-US`)
        const { data:{Actors, Director, Poster, Rated} } = await axios.get(`${findMovieByTitleApi}${movie.title}`)
        
        this.setState({featured: {...movie, Actors, Director, Poster, Rated }})
    }


    async fetchMovies() {
        try {
            const movies = await axios(`${trendingMoviesApi}&page=${this.state.page}`)
            return movies.data.results
        } catch (error) {
            console.log(error)
        }
    }


    async fetchMoviesBySearch() {
        if (this.state.searchTitle.length > 2) {
            const data = await axios(`${searchMovieByTitle}${this.state.searchTitle}`)
            this.setState({
                movies: data.data.results
            })
        } else {
            const movies = await this.fetchMovies()
            this.setState({
                movies
            })
        }
    }

    async fetchMovieByURL(movieTitle) {
        const data = await axios(`${searchMovieByTitle}${movieTitle}`)
        const movies = data.data.results
        const movie = movies.filter(movie => movie.title === movieTitle)
        const movieData = await axios(`https://api.themoviedb.org/3/movie/${movie[0].id}?api_key=e47ec9ad25c216b1a5113b00fac67272&language=en-US`)
        const [trailer, teaser] = await this.getMovieTrailerTeasers(movie[0].id)
        
        this.setState({movie: {...movieData.data, teaser, trailer}})
    }


    async fetchMovieByGenre() {
        // await this.resetMovies()
        this.updateMoviePage()

    }

    async resetMovies() {
        this.setState({
            page: 1
        })
        const movies = await this.fetchMovies()
        this.setState({
            movies
        })
    }


    setactiveFilter(activeGenre) {
        this.setState({
            activeFilter: activeGenre
        })
    }



    render() {
        return ( 
            <Context.Provider value = {
                {
                    state: this.state,
                    setMovie: this.setMovie,
                    handleInputChange: this.handleInputChange.bind(this),
                    fetchMovieByGenre: this.fetchMovieByGenre.bind(this),
                    items: Object.keys(menuItems),
                    showMovie: this.showMovie.bind(this),
                    fetchMovieByURL: this.fetchMovieByURL.bind(this),
                    setactiveFilter: this.setactiveFilter.bind(this),
                    activeFilter: this.state.activeFilter,
                    openYouTubeInNewTab: this.openYouTubeInNewTab.bind(this)
                }
            } > {
                this.props.children
            } 
            </Context.Provider>
        )
    }

}

export default withRouter(MainProvider)