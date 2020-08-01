import React from 'react'
import { Grid, Typography, Button } from "@material-ui/core";
import moment from 'moment'

function MovieToolTip({ movie: {title, release_date, vote_average, overview } }) {

    const handleHover = e => console.log('Event In Tool Tip: ', e)




    return (
            <div onMouseEnter={handleHover}>

                <Grid container direction="column" spacing={1} >
                    <Grid item >
                        <Typography variant='h6'>{title}</Typography>
                    </Grid>
                    
                    <Grid item>
                        <Typography variant='subtitle2'>{moment(release_date).format('MM/DD/YYYY')}</Typography>
                        <Typography variant='subtitle2'>{vote_average} / 10</Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant='body1'>{overview}</Typography>
                    </Grid>

                    <Grid item>
                        <Button variant="contained" color="primary">Watch Movie</Button>
                    </Grid>
                </Grid>

            </div>
    )
}

export default MovieToolTip
