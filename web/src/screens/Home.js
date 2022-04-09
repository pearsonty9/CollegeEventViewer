import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from "../components/EventCard";
import { Paper, Grid, Button, Typography } from '@mui/material';

import testData from "../events";
import Navbar from '../components/Navbar'; 

import axios from 'axios';

function Home(props) {

    const [events, setEvents] = useState([]);
    const [rsos, setRsos] = useState([]);

    useEffect(() => {
        const req = {
            mesage: "Test"
        };

        axios.post('http://localhost:8080/rso', req)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));

        axios.post('http://localhost:8080/event', req)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));

        // setEvents(testData);
        // setRsos(testData);
        
    }, []);

    const sidebarStyle = {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        position: "sticky",
        top: 80,
        maxHeight: "800px",
        overflow: "auto"
    };

    return (
        <Box sx={{backgroundColor: "#EBEBEB", minHeight: "100vh"}}>
            <Navbar />
            <Grid container columnSpacing={5} columns={16} sx={{backgroundColor: "#EBEBEB", margin: "auto", width: "70%", minWidth: "1200px", minHeight: "50vh"}}>
                <Grid item xs={4}>
                    <Paper sx={sidebarStyle}>
                        <Typography sx={{fontSize: 20}}>Actions</Typography>
                        <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Create Event</Button>
                        <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Create RSO</Button>
                        <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Find RSO</Button>
                    </Paper>
                </Grid >
                <Grid item xs={8} sx={{display: "flex", flexDirection: "column", gap: 3, mt: 3}}>
                    <Typography sx={{textAlign: "left", fontSize: 24}}>Events</Typography>
                    {events.length > 0 ?events.map((event) => (
                        <Card event={event} key={event.name}/>
                    ))
                    :<Typography sx={{fontSize: 20}}>No events avilable</Typography>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={sidebarStyle}>
                        <Typography sx={{fontSize: 20}}>RSOs</Typography>
                        {rsos.length > 0 ? rsos.map((item) => (
                                <Button sx={{ height: 40, backgroundColor: "#C4C4C4", display: "flex", justifyContent: "center" }}>
                                    {item.name}
                                </Button>
                        ))
                        : <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Join an RSO</Button>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;