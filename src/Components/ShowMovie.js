import React from "react";
import Chip from "@material-ui/core/Chip";
import Context from "../Config/Context";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { CircularProgress } from '@material-ui/core'
import YouTubeIcon from '@material-ui/icons/YouTube';
import moment from "moment";

const commonLinkStyles = {textDecoration:'underline', padding: 0, border:"transparent solid 0", background:'transparent', color: 'black'}
const links = {
  '1': `${process.env.REACT_APP_MOVIE_SITE_2_ORIGIN}?id`,
  '2': `${process.env.REACT_APP_MOVIE_SITE_ORIGIN}?imdb`
}


function ShowMovie({ match }) {
  const [movieLink, setMovieLink] = React.useState(links[1])
  const [isDisabledMirrorLink, setIsDisabledMirrorLink] = React.useState({'1': true ,'2': false})
  
  const disabled = k => k ? {} : {disabled: true}
  const disabledColor = k => k ? "secondary" : "disabled"
  const linkStyles = t => ({opacity: isDisabledMirrorLink[t] ? 1 : .3, ...commonLinkStyles})

  const handleLink = type => {
    let isDisabledObj = Object.entries(isDisabledMirrorLink)
    isDisabledObj = isDisabledObj.reduce((o,[k,v])=> {
      o[k] = false
      return o
    },{})

    setMovieLink(links[type])
    setIsDisabledMirrorLink(() => ({...isDisabledObj, [type]: true}))
  }

  const getMovie = (fetchMovieByURL, title) => {
    fetchMovieByURL(title);
    return <CircularProgress size='5rem'/>;
  };


  return (
    <Context.Consumer>
      {({ state: { movie }, openYouTubeInNewTab, fetchMovieByURL }) => {
        return !movie ? (
          getMovie(fetchMovieByURL, match.params.title)
        ) : (
          <div className="show-movie">
            <div className="show-movie__movie-player-wrapper">
                <div className="show-movie__movie-stream-wrapper" style={{height: 500}}>
                  <iframe 
                    src={`${movieLink}=${movie?.imdb_id}`}
                    allowFullScreen 
                    frameBorder="0" 
                    width="100%" 
                    height="500"
                    title={`${movie?.title}`}
                  >
                  </iframe>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', width: 112, marginLeft: 10}}>
                  <button style={linkStyles(1)} onClick={()=> handleLink(1)} disabled={isDisabledMirrorLink[1]}>mirror 1</button>
                  <button style={linkStyles(2)} onClick={()=> handleLink(2)} disabled={isDisabledMirrorLink[2]}>mirror 2</button>
                </div>
            </div>


            <div className="show-movie__details-wrapper">
              <div className="show-movie__poster-wrapper">
                <img
                  className="show-movie__poster"
                  src={`${process.env.REACT_APP_MOVIE_POSTER_ORIGIN}/w500${movie?.poster_path}`}
                  alt={`${movie?.title}`}
                  id="featured"
                />
              </div>

              <div className="show-movie__info">
                <div>
                  <Typography variant="h5">{movie?.title}</Typography>

                  <Typography variant="body2" color="textSecondary">
                    {movie?.overview}
                  </Typography>
                </div>

                <ul className="show-movie__video-info">
                  <li><strong>Runtime: </strong> {movie?.runtime} min</li>
                  <li><strong>Votes: </strong> {movie?.vote_average} / 10</li>
                  <li><strong>Release Date: </strong> {moment(movie?.release_date)?.format('MMMM d, YYYY') || "N/A"}</li>
                  <li className="show-movie__video-genres">
                    {movie?.genres?.map((genre) => (
                      <Chip key={genre?.name} label={genre?.name} variant="outlined" />
                    ))}
                  </li>
                </ul>

                <div style={{marginTop: 15, marginBottom: 5}}>
                  <Chip 
                    color="secondary" 
                    size="small" 
                    label="Trailer"
                    icon={<YouTubeIcon color={disabledColor(movie?.trailer?.key)} />} 
                    onClick={()=> openYouTubeInNewTab(movie?.trailer?.key)}
                    {...disabled(movie?.trailer?.key)}
                  />

                  <Chip 
                    color="secondary" 
                    size="small" 
                    label="Teaser"
                    icon={<YouTubeIcon color={disabledColor(movie?.trailer?.key)}  />} 
                    onClick={()=> openYouTubeInNewTab(movie?.teaser?.key)}
                    style={{marginLeft: 5}}
                    {...disabled(movie?.teaser?.key)}
                  />
                </div>
              </div>
            </div>

            

            <div className="show-movie__recommended">
              {/* <Typography variant="h5">Recommended</Typography> */}
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
}

export default withRouter(ShowMovie);
