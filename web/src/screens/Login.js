import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Typography, Button } from '@mui/material';

import axios from 'axios';

function Login(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handelSignIn = (event) => {
        event.preventDefault();
        
        if (values.email === '' || values.password === '') {
            setError(true);
            setErrorMessage("incorrect username or password");
        }

        else {
            axios.post('http://localhost:3000/user/login', { username: values.email, password: values.password })
            .then(response => response.data)
            .then(data => {
                const users = data.users;
                if (users.length !== 0) {
                    setError(false);
                    setErrorMessage("logged in user");
                }
                else {
                    setError(true);
                    setErrorMessage("incorrect username or password");
                }
            })
            .catch(error => console.log(error));
        }
    }
    
      return (
        <form>
            <Box sx={{ display: 'flex', flexDirection: 'column' , padding: 1, width: {xs: '35ch', sm: '50%', md: '50ch'}, my: 20, mx: 'auto' }}>
                <Typography variant='h3' sx={{ my: 2 }}>Login</Typography>
                <TextField id="email-field" error={error} label="Email" onChange={handleChange('email')} fullWidth sx={{ marginY: 1 }}/>
                <FormControl sx={{ width: '100%', marginY: 1 }} variant="outlined">
                <InputLabel htmlFor="password-field-label" error={error}>Password</InputLabel>
                <OutlinedInput
                    id="password-field"
                    error={error}
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
                <FormHelperText id="login-helper-text" error={error}>{errorMessage}</FormHelperText>
                </FormControl>
                <Button 
                    variant="contained" 
                    type="submit" 
                    size="medium" 
                    onClick={handelSignIn} 
                    sx={{ width: '30%', alignSelf: "flex-end" }}>
                    Sign in
                </Button>
            </Box>
        </form>
      );
}

export default Login;