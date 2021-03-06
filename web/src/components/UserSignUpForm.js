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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

function UserSignUpForm(props) {
    const [values, setValues] = useState({
        type: 'student',
        university: '',
        email: '',
        password: '',
        showPassword: false,
    });

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let navigate = useNavigate();
    
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

    const handelSignUp = (event) => {
        event.preventDefault();
        
        if (values.email === '' || values.password === '') {
            setError(true);
            setErrorMessage("Enter email and password");
        }
        else if (values.type === 'admin') {
            props.setUser({
                email: values.email,
                password: values.password,
            });
            props.setActiveMenu('university');
        }
        else {
            axios.post('http://localhost:3000/user/signup', { username: values.email, password: values.password, university: values.university })
            .then(response => response.data)
            .then(data => {
                const userId = data.userId;
                if (userId !== null) {
                    setError(false);
                    setErrorMessage("New account created");
                    console.log("created user with id " + userId);
                    navigate("/login");
                }
                else {
                    setError(true);
                    setErrorMessage("Could not create account");
                }
            })
            .catch(error => console.log(error));
        }
    }
    
    const login = () => {
        navigate("/");
    }
    
    return (
        <form style={{overflowX: 'none'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column' , padding: 1, width: {xs: '35ch', sm: '50%', md: '50ch'}, my: 20, mx: 'auto' }}>
                <Typography variant='h3' sx={{ my: 1 }}>Create Account</Typography>
                <ToggleButtonGroup
                    color="primary"
                    size="small"
                    value={values.type}
                    exclusive
                    onChange={handleChange('type')}
                    sx={{ my: 1 }}
                >
                        <ToggleButton value="student" sx={{ width: "50%" }}>Student</ToggleButton>
                        <ToggleButton value="admin" sx={{ width: "50%" }}>Admin</ToggleButton>
                </ToggleButtonGroup>
                {values.type === 'student' && <TextField id="university-field" error={error} label="University" onChange={handleChange('university')} fullWidth sx={{ marginY: 1 }}/>}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingX: 1}}>
                    <Button 
                        variant="text" 
                        size="small" 
                        onClick={login}
                    >
                        Have account? Login
                    </Button>
                    <Button 
                        variant="contained" 
                        type="submit" 
                        size="medium" 
                        onClick={handelSignUp} 
                        sx={{ width: '40%', alignSelf: "flex-end" }}
                    >
                        {values.type === 'admin' ? 'Continue' : 'Create Account'}
                    </Button>
                </Box>
            </Box>
        </form>
    );
}

export default UserSignUpForm;