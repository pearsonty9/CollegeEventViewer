import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Stack, Typography, Paper } from '@mui/material';

import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';

function RSO(props) {

    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/event/rso/${props.rsoid}`)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));

        // setEvents(testData);
    }, [])

    return (
        <Box>
            <Navbar />
            <Paper>
                <Typography>{name}</Typography>
                <Typography>{university}</Typography>
            </Paper>
            <Paper>
                <Typography>{description}</Typography>
            </Paper>
            <Paper>
                <Typography>RSO Contact Info</Typography>
                <Typography>{contact}</Typography>
            </Paper>

            <Stack spacing={3}>
                {events.length > 0 ?events.map((event) => (
                    <EventCard event={event} key={event.name}/>
                ))
                :<Typography sx={{fontSize: 20}}>No events avilable</Typography>
                }
            </Stack>
        </Box>
    );
}

export default RSO;