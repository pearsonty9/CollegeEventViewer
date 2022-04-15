import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Stack, Card, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';

function UnapprovedEvents(props) {

    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const university = JSON.parse(localStorage.getItem("university"));
        axios.post(`http://localhost:3000/event/getUnapproved/`, {uniName: university})
        .then(res => res.data)
        .then(data => setEvents(data.events))
        .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchEvents();
    }, [])

    return (
        <Box sx={{backgroundColor: "#EBEBEB", minHeight: "100vh", pb: 20}}>
            <Navbar />
            <Stack spacing={2} sx={{mx: "auto", maxWidth: 700}}>
                <Typography variant="h4" sx={{margin: 3, textAlign: "left"}}>Unapproved Events</Typography>
                {events.length > 0 ? events.map(event => (
                    <EventCard event={event}/>
                )): <Typography>There are no unapproved events</Typography>}
            </Stack>
        </Box>
    );
}

export default UnapprovedEvents;