import React, { useState } from 'react';
import axios from 'axios';

import { Box, Stack, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import format from 'date-fns/format';

import Navbar from '../components/Navbar';
import MapContainer from '../components/MapContainer';
import { useNavigate } from 'react-router-dom';

function CreateEvent(props) {
    const [fields, setFields] = useState({
        name: "",
        description: "",
        contactEmail: "",
        contactNumber: "",
        location: "",
        date: Date.now(),
        startTime: Date.now(),
        endTime: Date.now(),
        type: "private",
    });

    const [currentPosition, setCurrentPosition] = useState({lat: 28.6024, lng: -81.2001});
    const [errorMessage, setErrorMessage] = useState("");

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
        }
        console.log(eventData);
        let res;
        if (fields.type === "private") {
            res = await axios.post('http://localhost:3000/event/createUniEvent', eventData)
        }
        else {
            res = await axios.post('http://localhost:3000/event/createPublicEvent', eventData)
        }
        console.log(res.data);
        if (res.data.message === "invalid event entry")
            setErrorMessage("cannot create event due to conflicting date, time and location");
        else {
            navigate("/home");
        }
    };

    
    const handleMapClick = (lat, lng) => {
        setCurrentPosition({ lat: lat, lng: lng });
    }

    return (
        <Box>
            <Navbar />
            <Stack spacing={3} sx={{ minWidth: 220, p: 2, mx: "auto", maxWidth: 700, pb: 20}} component="form" onSubmit={handleSubmit}>
                    <Typography variant="h4" style={{alignSelf: "flex-start"}}>Create Event</Typography>
                    <Stack direction="row" justifyContent="space-between">
                        <TextField required sx={{width: "65%"}}variant="outlined" color="primary" id="event-name" label="Event name" onChange={handleChange("name")}/>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="private"
                            name="radio-buttons-group"
                            onChange={handleChange("type")}
                        >
                            <FormControlLabel value="public" control={<Radio />} label="Public" />
                            <FormControlLabel value="private" control={<Radio />} label="Private" />
                        </RadioGroup>
                    </Stack>
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
                    <Typography variant="body2" style={{color: "red", textAlign: "left", margin: "0"}}>{errorMessage}</Typography>
                    <Button variant="contained" type="submit" color="primary" style={{width: "10rem", alignSelf: "flex-end"}}>Create Event</Button>
                </Stack>
        </Box>
    );
}

export default CreateEvent;