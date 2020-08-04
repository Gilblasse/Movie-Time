import React from 'react'
import {Typography} from '@material-ui/core';
import Context from '../Config/Context';
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import AccessAlarmTwoToneIcon from '@material-ui/icons/AccessAlarmTwoTone';
import StarTwoToneIcon from '@material-ui/icons/StarTwoTone';
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
// import { IconButton } from '@material-ui/core';
import moment from 'moment';
import FeaturedInfo from './FeaturedInfo';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';





function FeaturedMovie(props) {    

    const handleClick = (show,movie)=>{
        show(movie)
        props.history.push(`/movies/${movie.title}`)
    }   


    return (
        <Context.Consumer>
            
            {
                ({ state:{ featured  }, showMovie }) => {
                    const {backdrop_path, release_date, runtime, vote_average} = featured

                    return (
                        <div>
                            <FeaturedInfo featured={featured}/>

                            <Grid container direction="column" >
                                <Grid 
                                    item 
                                    style={{
                                        background: `url(https://image.tmdb.org/t/p/original${backdrop_path}) no-repeat`,
                                        height: '500px',
                                        borderRadius: '25px 25px 0 0',
                                        backgroundSize: 'cover',
                                        cursor: 'pointer',
                                        position: 'relative'
                                        }}
                                    onClick={() => handleClick(showMovie, featured)}
                                    >   
                                    <PlayCircleFilledWhiteIcon className='featuredMovie__play-button'/>
                                </Grid>

                                <Grid item style={{backgroundColor: '#193231', color:'#fff', borderRadius: '0px 0px 25px 25px', padding: '25px 15px'}} >
                                    <Grid container spacing={3}>
                                        <Grid item >
                                            <span style={{background: '#3d5a58', padding: '13px',borderRadius: '10px',marginRight: '10px'}}>
                                                 <AccessAlarmTwoToneIcon />
                                            </span>
                                            <span>
                                                {`${runtime} min `}
                                            </span>
                                        </Grid>

                                        <Grid item >
                                            <span style={{background: '#3d5a58', padding: '13px',borderRadius: '10px',marginRight: '10px'}}>
                                                <StarTwoToneIcon/>
                                            </span>
                                            <span>
                                                {`${vote_average} votes`}
                                            </span>
                                        </Grid>

                                        <Grid item >
                                            <span style={{background: '#3d5a58', padding: '13px',borderRadius: '10px',marginRight: '10px'}}>
                                                 <PlayCircleFilledTwoToneIcon />
                                            </span>
                                            <span>
                                                { ` ${ moment(release_date).format('MMMM D, Y') } `}
                                            </span>
                                        </Grid>
                                    </Grid>
                                
                                
                                
                                </Grid>

                            </Grid>
                        </div>
                    )
                }

            }
            
        </Context.Consumer>
    )

}

export default withRouter(FeaturedMovie)








