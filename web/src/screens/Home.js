import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from "../components/EventCard";
import { Paper, Grid, Button, Typography } from '@mui/material';

import testData from "../events";

function Home(props) {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        setEvents(testData);
    }, []);

    return (
        <Grid container spacing={6} sx={{px: "18%", backgroundColor: "#EBEBEB"}}>
            <Grid item xs={3.2}>
                <Paper sx={{display: "flex", flexDirection: "column", gap: 1, p: 2, position: "sticky", top: 20}}>
                    <Typography sx={{fontSize: 20}}>Actions</Typography>
                    <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Action</Button>
                    <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Action</Button>
                    <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Action</Button>
                    <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Action</Button>
                    <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Action</Button>
                    <Button sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Action</Button>
                </Paper>
            </Grid >
            <Grid item  xs={5.6} sx={{display: "flex", flexDirection: "column", gap: 3, mt: 3}}>
                <Typography sx={{textAlign: "left", fontSize: 24}}>Events</Typography>
                {events.map((event) => (
                    <Card event={event} key={event.name}/>
                ))}
            </Grid>
            <Grid item xs={3.2}>
                <Paper sx={{display: "flex", flexDirection: "column", gap: 1, p: 2, position: "sticky", top: 20}}>
                    <Typography sx={{fontSize: 20}}>RSOs</Typography>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                    <Paper sx={{height: 40, backgroundColor: "#C4C4C4",}}>RSO name</Paper>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Home;