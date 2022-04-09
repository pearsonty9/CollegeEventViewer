import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

function Event(props) {

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [university, setUniversity] = useState("");
    const [rso, setRso] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [contact, setContact] = useState("");

    return (
        <Box>
            <Paper>
                <Typography>{name}</Typography>
                <Typography>{university} - {rso}</Typography>
            </Paper>
            <Paper>
                <Typography>{type}</Typography>
                <Typography>{description}</Typography>
                <Typography>{date}</Typography>
                <Typography>{startTime} - {endTime}</Typography>
                <Typography>{location}</Typography>
            </Paper>
            <Paper>
                <Typography>Event Contact Info</Typography>
                <Typography>{contact}</Typography>
            </Paper>
        </Box>
    );
}

export default Event;