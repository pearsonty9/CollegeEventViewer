import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function UniversitySignUpForm(props) {
    const [values, setValues] = useState({
        name: '',
        location: '',
        description: '',
        numStudents: 0,
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handelSignUp = (event) => {
        event.preventDefault();
        console.log({ type: 'admin', ...props.user, ...values });
        // Verify fields

        // Make api call to create university
        // have to get username and password state some how
        axios.post('http://localhost:3000/user/signupUniversity', { type: 'admin', ...props.user, ...values })
        .then(response => response.data)
        .then(data => {
            const userId = data.userId;
            if (userId !== null) {
                setError(false);
                setErrorMessage("new account created");
                console.log("created user with id " + userId);
            }
            else {
                setError(true);
                setErrorMessage("could not create account");
            }
        })
        .catch(error => console.log(error));
    }
    
    const login = () => {
        props.setActiveMenu('user');
    }
    
    return (
        <form style={{overflowX: 'none'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' , padding: 1, width: {xs: '35ch', sm: '50%', md: '50ch'}, my: 20, mx: 'auto' }}>
                <Typography variant='h3' sx={{ my: 1 }}>Create University</Typography>
                <TextField id="name-field" error={error} label="Name" onChange={handleChange('name')} fullWidth sx={{ marginY: 1 }}/>
                <TextField id="location-field" error={error} label="Location" onChange={handleChange('location')} fullWidth sx={{ marginY: 1 }}/>
                <TextField id="description-field" multiline rows={5} error={error} label="Description" onChange={handleChange('description')} fullWidth sx={{ marginY: 1 }}/>
                <FormControl sx={{ width: '100%', marginY: 1 }} variant="outlined">
                <FormHelperText id="login-helper-text" error={error}>{errorMessage}</FormHelperText>
                </FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 1}}>
                    <Button 
                        variant="text" 
                        size="small" 
                        onClick={login}
                    >
                        back
                    </Button>
                    <Button 
                        variant="contained" 
                        type="submit" 
                        size="medium" 
                        onClick={handelSignUp} 
                        sx={{ width: '40%', alignSelf: "flex-end" }}
                    >
                        Create Account
                    </Button>
                </Box>
            </Box>
        </form>
    );
}

export default UniversitySignUpForm;