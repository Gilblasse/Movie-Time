import React from 'react'
import {Typography} from '@material-ui/core';




function FeaturedInfo({featured}) {
    console.log('FeaturedINFO: ', featured)
    return (
        <div style={{ display: 'flex', marginBottom: '50px', color: '#fff' }}>
            <div style={{marginRight: '15px', width: '50px', background: `url(https://image.tmdb.org/t/p/w500${featured.poster_path}) no-repeat center center`, backgroundSize: 'cover', border: '1.5px solid white', borderRadius: '20px'}}>
                
                {/* <img width='50px' height='60px' style={{borderRadius: '30px', border: '1px solid white' }} src={`https://image.tmdb.org/t/p/w500${featured.poster_path}`} alt={`${featured.title}`}/> */}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <Typography variant='h6'>{featured.title}</Typography>
                <Typography variant='body2'> Rated: {featured.Rated ? featured.Rated : 'N/A'} </Typography>   
            </div>
        </div>
    )
}

export default FeaturedInfo
