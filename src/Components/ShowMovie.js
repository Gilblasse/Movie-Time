import React from "react";
import Chip from "@material-ui/core/Chip";
import Context from "../Config/Context";
import { withRouter } from "react-router-dom";
import { Typography } from "@material-ui/core";
import AdBlockDetect from "react-ad-block-detect";
// import moment from 'moment'
import { CircularProgress } from '@material-ui/core'



function ShowMovie({ match }) {
  
  const getMovie = (fetchMovieByURL, title) => {
    fetchMovieByURL(title);
    return <CircularProgress size='5rem'/>;
  };



  return (
    <Context.Consumer>
      {({ state: { movie }, fetchMovieByURL }) => {
        return !movie ? (
          getMovie(fetchMovieByURL, match.params.title)
        ) : (
          <div className="show-movie">
            <div className="show-movie__movie-player-wrapper">
             
              <div className="show-movie__add-blocker-message-wrapper">
                <div>
                  <Typography variant="h4" color="textSecondary">
                    Please Enable Ad Blockers
                  </Typography>

                  <img
                    width="300"
                    src="https://img2.pngio.com/adblock-png-3-png-image-ad-blocking-png-446_446.png"
                    alt="Block Ads"
                  />
                </div>
              </div>
            

              {/* <AdBlockDetect> */}
                <div className="show-movie__movie-stream-wrapper" >
                  <iframe 
                    src={`https://streamvideo.link/getvideo?key=F4V1P3bmuHyarjPO&video_id=${movie?.imdb_id}`} 
                    allowFullScreen 
                    frameborder="0" 
                    width="100%" 
                    height="500"
                    title={`${movie?.title}`}
                  >
                  </iframe>
                </div>
              {/* </AdBlockDetect> */}
            </div>


            <div className="show-movie__details-wrapper">
              <div className="show-movie__poster-wrapper">
                <img
                  className="show-movie__poster"
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
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
                  <li className="show-movie__video-genres">
                    {movie?.genres?.map((genre) => (
                      <Chip label={genre?.name} variant="outlined" />
                    ))}
                  </li>
                </ul>
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
