import React, { useState } from 'react';

import { Box, Stack, TextField, Button, Typography } from '@mui/material';

import Navbar from '../components/Navbar';

function CreateRSO(props) {
    const [fields, setFields] = useState({
        name: "",
        description: "",
        contact: "",
        members: [],
        domainEmail: "",
    });

    const handleChange = (prop) => (event) => {
        setFields({ ...fields, [prop]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // axios.post('http://localhost:8080/projects', formData)
        // .then(res => res.data)
        // .then(data => console.log(data))
        // .catch(error => console.log(error));
        clearFields();
    };

    const clearFields = () => {
        setFields({
            name: "",
            description: "",
            contact: "",
            members: [],
            domainEmail: "",
        });
    }

    return (
        <Box>
            <Navbar />
            <Stack spacing={3} sx={{ minWidth: 220, p: 2, mx: "auto", maxWidth: 700}} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h4" style={{alignSelf: "flex-start"}}>Create RSO</Typography>
                    <TextField required variant="outlined" color="primary" id="rso-name" label="RSO name" onChange={handleChange("name")}/>
                    <TextField required variant="outlined" color="primary" id="contact" label="Contact" onChange={handleChange("contact")}/>
                    <TextField required variant="outlined" multiline minRows={4} color="primary" id="description" label="Description" onChange={handleChange("description")}/>
                    <Button variant="contained" type="submit" color="primary" style={{width: "10rem", alignSelf: "flex-end"}}>Create RSO</Button>
                </Stack>
        </Box>
    );
}

export default CreateRSO;