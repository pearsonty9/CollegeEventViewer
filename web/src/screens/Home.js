import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import EventCard from "../components/EventCard";
import { Paper, Grid, Button, Typography } from '@mui/material';

import Navbar from '../components/Navbar'; 

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home(props) {

    const [events, setEvents] = useState([]);
    const [rsos, setRsos] = useState([]);

    const navigate = useNavigate();
    const userType = JSON.parse(localStorage.getItem("userType"));
    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem("userid"));
        const university = JSON.parse(localStorage.getItem("university"));

        fetchRSO(userid);
        fetchEvents(userid, university);
        
    }, []);

    const fetchRSO = async(userid) => {
        await axios.get(`http://localhost:3000/rso/user/${userid}`)
        .then(res => res.data)
        .then(data => setRsos(data.rsos))
        .catch(error => console.log(error));
    }

    const fetchEvents = async(userid, university) => {
        await axios.get(`http://localhost:3000/event/getAll/${university}/${userid}`)
        .then(res => res.data)
        .then(data => setEvents(data.events))
        .catch(error => console.log(error));
    }

    const sidebarStyle = {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        p: 2,
        top: 80,
        position: "sticky",
        maxHeight: "800px",
        overflow: "auto"
    };

    return (
        <Box sx={{backgroundColor: "#EBEBEB", minHeight: "100vh", pb: 20}}>
            <Navbar />
            <Grid container columnSpacing={5} columns={16} sx={{backgroundColor: "#EBEBEB", margin: "auto", width: "70%", minWidth: "1200px", minHeight: "50vh", my: 2}}>
                <Grid item xs={4}>
                    <Paper sx={sidebarStyle}>
                        <Typography sx={{fontSize: 20}}>Actions</Typography>
                        {userType !== "STU" ? <Button onClick={() => navigate("/createevent")} sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Create Event</Button> : null}
                        <Button onClick={() => navigate("/createrso")} sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Create RSO</Button>
                        <Button onClick={() => navigate("/searchrso")} sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Find RSO</Button>
                        {userType === "SUP" ? <Button onClick={() => navigate("/approve")} sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Approve Events</Button> : null}
                    </Paper>
                </Grid >
                <Grid item xs={8} sx={{display: "flex", flexDirection: "column", gap: 3, mt: 3}}>
                    <Typography sx={{textAlign: "left", fontSize: 24}}>Events</Typography>
                    {events.length > 0 ? events.map((event) => (
                        <EventCard event={event} key={event.name}/>
                    ))
                    :<Typography sx={{fontSize: 20}}>No events avilable</Typography>
                    }
                </Grid>
                <Grid item xs={4}>
                    <Paper sx={sidebarStyle}>
                        <Typography sx={{fontSize: 20}}>RSOs</Typography>
                        {rsos.length > 0 ? rsos.map((item) => (
                                <Button key={item.rsoName} onClick={() => navigate("/rso", { state:  {rso: item} })} sx={{ height: 40, backgroundColor: "#C4C4C4", display: "flex", justifyContent: "center" }}>
                                    {item.rsoName}
                                </Button>
                        ))
                        : <Button onClick={() => navigate("/searchrso")} sx={{height: 40, backgroundColor: "#C4C4C4", color: "black"}}>Join an RSO</Button>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Home;