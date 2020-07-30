import React from 'react'
import { TextField, FormControl } from '@material-ui/core';
import Context from '../Config/Context';

function SearchBar() {
    return (
        <Context.Consumer>
            {
                ({state,handleInputChange})=>{
                    return(

                        <section>
                            <FormControl>
                                <TextField 
                                id="outlined-basic" 
                                size="small" 
                                label="Search for Movie..." 
                                variant="filled" 
                                name='movieTitle' 
                                value={state.searchTitle}
                                onChange={handleInputChange}
                                />
                            </FormControl>
                        </section>

                    )

                }
            }
        </Context.Consumer>
    )
}

export default SearchBar
