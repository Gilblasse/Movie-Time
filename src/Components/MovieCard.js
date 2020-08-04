import React from "react";
import { Card, CardActionArea,CardMedia, CardContent,Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Context from "../Config/Context";
import { withRouter } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";





// const theme = createMuiTheme({
//   overrides: {
//     // Style sheet name 
//     MuiCardActionArea: {
//       // Name of the rule
//       root: {
//         '&:hover': {
//           opacity: 0.8
//         }
//       },

//       focusHighlight: {
//         opacity: 1
//       }


//     }
//   }
// });




function MovieCard(props) {
  const {
    movie: { poster_path, title },
  } = props;


  const useStyles = makeStyles({
    root: {
      width: 250,
      marginTop: 50,
      borderRadius: 25,
    //   '&:hover': {
    //     background: "#f00",
    //  }
    },
    media: {
      height: 360,
    },
  });



  const classes = useStyles();

  const handleClick = (show, movie) => {
    show(movie.id);
    props.history.push(`/movies/${movie.title}`);
  };



  return (
    <Context>
      {({ showMovie }) => {
        return !props.movie || !showMovie ? (
          <div style={{ marginBottom: 40 }}>
            <Skeleton variant="rect" width={210} height={318} />
            <Skeleton variant="text" />
          </div>
        ) : (

          <div>

            {/* <ThemeProvider theme={theme}> */}
              <Card className={classes.root} onClick={() => handleClick(showMovie, props.movie)} raised>
                <CardActionArea  >
                  <CardMedia
                    className={classes.media}
                    image={`https://image.tmdb.org/t/p/w500${poster_path}`}
                    title={title}
                  />

                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="body1"
                      align="center"
                      color="textSecondary"
                      component="p"
                    >
                      <strong>
                        {title.length > 17 ? `${title.slice(0, 18)} ...` : title}
                      </strong>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            {/* </ThemeProvider> */}
          </div>
          
        );
      }}
    </Context>
  );
}

export default withRouter(MovieCard);
