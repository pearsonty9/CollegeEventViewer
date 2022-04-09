import React, { useState } from 'react';

import { Box, Stack, TextField, Button, Typography } from '@mui/material';

import Navbar from '../components/Navbar';

function CreateEvent(props) {
    const [fields, setFields] = useState({
        name: "",
        description: "",
        contact: "",
        location: {},
        date: Date.now(),
        startTime: "",
        endTime: "",
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
            date: Date.now(),
            startTime: "",
            endTime: "",
            location: {},
            contact: "",
        });
    }

    return (
        <Box>
            <Navbar />
            <Stack spacing={3} sx={{ minWidth: 220, p: 2, mx: "auto", maxWidth: 700}} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h4" style={{alignSelf: "flex-start"}}>Create Event</Typography>
                    <TextField required variant="outlined" color="primary" id="event-name" label="Event name" onChange={handleChange("name")}/>
                    <TextField required variant="outlined" color="primary" id="contact" label="Contact" onChange={handleChange("contact")}/>
                    <Stack direction="row" spacing={3}>
                        <TextField required variant="outlined" type="date" color="primary" id="event-date" label="Event Date" InputLabelProps={{shrink: true,}} value={fields.eventDate} onChange={handleChange("eventDate")} style={{width: "40%"}}/>
                        <TextField required variant="outlined" type="time" color="primary" id="start-time" label="Start Time" InputLabelProps={{shrink: true,}} value={fields.eventTime} onChange={handleChange("startTime")} style={{width: "40%"}}/>
                        <TextField required variant="outlined" type="time" color="primary" id="end-time" label="End Time" InputLabelProps={{shrink: true,}} value={fields.eventTime} onChange={handleChange("endTime")} style={{width: "40%"}}/>
                    </Stack>
                    <TextField required variant="outlined" multiline minRows={4} color="primary" id="description" label="Description" onChange={handleChange("description")}/>
                    <Button variant="contained" type="submit" color="primary" style={{width: "10rem", alignSelf: "flex-end"}}>Create Event</Button>
                </Stack>
        </Box>
    );
}

export default CreateEvent;