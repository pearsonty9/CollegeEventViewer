import React, { useState } from 'react';
import axios from 'axios';

import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import format from 'date-fns/format';

import Navbar from '../components/Navbar';
import MapContainer from '../components/MapContainer';
import { useNavigate, useLocation } from 'react-router-dom';

function CreateRSOEvent(props) {
    const [fields, setFields] = useState({
        name: "",
        description: "",
        contactEmail: "",
        contactNumber: "",
        location: "",
        date: Date.now(),
        startTime: Date.now(),
        endTime: Date.now(),
    });

    const { state } = useLocation();

    const [currentPosition, setCurrentPosition] = useState({lat: 28.6024, lng: -81.2001});

    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        setFields({ ...fields, [prop]: event.target.value });
    };

    const handleDateTimeChange = (prop) => (value) => {
        setFields({ ...fields, [prop]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const userid = JSON.parse(localStorage.getItem("userid"));
        const uniName = JSON.parse(localStorage.getItem("university"));
        const eventData = {
            userid: userid,
            contactEmail: fields.contactEmail,
            contactNumber: fields.contactNumber,
            date: format(fields.date, 'MM/dd/yyyy'),
            description: fields.description,
            latitude: currentPosition.lat,
            longitude: currentPosition.lng,
            locName: fields.location,
            start: format(fields.startTime, 'h:mm'),
            end: format(fields.endTime, 'h:mm'),
            uniName: uniName,
            name: fields.name,
            RID: state.RID

        }
        console.log(eventData);
        await axios.post('http://localhost:3000/event/createRSOevent', eventData)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));
        console.log("test");
        navigate("/home");
        // clearFields();
    };
    
    const handleMapClick = (lat, lng) => {
        setCurrentPosition({ lat: lat, lng: lng });
    }

    return (
        <Box>
            <Navbar />
            <Stack spacing={3} sx={{ minWidth: 220, p: 2, mx: "auto", maxWidth: 700, pb: 20}} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h4" style={{alignSelf: "flex-start"}}>Create Event</Typography>
                    <TextField required variant="outlined" color="primary" id="event-name" label="Event name" onChange={handleChange("name")}/>
                    <Stack direction="row" spacing={3} justifyContent="space-between">
                        <TextField required fullWidth variant="outlined" color="primary" id="contact-email" label="Email" onChange={handleChange("contactEmail")}/>
                        <TextField required fullWidth variant="outlined" color="primary" id="contact-phone" label="Phone#" onChange={handleChange("contactNumber")}/>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                        label="Date"
                        required
                        inputFormat="MM/dd/yyyy"
                        value={fields.date}
                        onChange={handleDateTimeChange("date")}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                        label="Start Time"
                        required
                        value={fields.startTime}
                        onChange={handleDateTimeChange("startTime")}
                        renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                        label="End Time"
                        required
                        value={fields.endTime}
                        onChange={handleDateTimeChange("endTime")}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    </Stack>
                    <Stack spacing={1}>
                        <TextField required variant="outlined" color="primary" id="location-name" label="Location" onChange={handleChange("location")}/>
                        <MapContainer handleMapClick={handleMapClick}/>
                    </Stack>
                    <TextField required variant="outlined" multiline minRows={4} color="primary" id="description" label="Description" onChange={handleChange("description")}/>
                    <Button variant="contained" type="submit" color="primary" style={{width: "10rem", alignSelf: "flex-end"}}>Create Event</Button>
                </Stack>
        </Box>
    );
}

export default CreateRSOEvent;