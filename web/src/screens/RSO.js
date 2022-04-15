import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Stack, Typography, Paper, Button } from '@mui/material';

import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';

function RSO(props) {

    const { state } = useLocation();
    const userid = JSON.parse(localStorage.getItem("userid"));
    const navigate = useNavigate();

    const [name, setName] = useState(state.rso.rsoName);
    const [university, setUniversity] = useState(state.rso.uniName);
    const [description, setDescription] = useState(state.rso.description);
    const [email, setContact] = useState(state.rso.ContactEmail);
    const [phone, setPhone] = useState(state.rso.ContactNumber);


    const [events, setEvents] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem("userid"));
        if (userid === state.rso.UID)
            setIsAdmin(true);
        fetchActiveMember();
        fetchRSOEvents();
    }, [])

    const fetchRSOEvents = async () => {
        console.log("Test");
        await axios.get(`http://localhost:3000/event/rso/${state.rso.RID}`)
        .then(res => res.data)
        .then(data => setEvents(data.events))
        .catch(error => console.log(error));
    }

    const fetchActiveMember = async() => {
        await axios.get(`http://localhost:3000/rso/user/active/${userid}/${state.rso.RID}`)
        .then(res => res.data)
        .then(data => setIsActive(data.isActive))
        .catch(error => console.log(error));
    }

    const joinRSO = async () => {
        await axios.post(`http://localhost:3000/rso/join`, {userid: userid, rsoid: state.rso.RID})
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));
        setIsActive(true);
    }

    const leaveRSO = async () => {
        await axios.post(`http://localhost:3000/rso/leave`, {userid: userid, rsoid: state.rso.RID})
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));
        setIsActive(false);
    }

    const createEvent = () => {
        navigate("/creatersoevent", { state:  {RID: state.rso.RID} });
    }

    return (
        <Box sx={{background: "#EBEBEB", minHeight: "100vh", pb: 20}}>
            <Navbar />
            <Paper sx={{maxWidth: "800px", marginX: "auto", marginY: "20px", textAlign: "left", p: 2}}>
                <Typography variant='h4'>{name}</Typography>
                <Typography variant="h5" sx={{ml: 3}}>{university}</Typography>
                <Stack sx={{mt: 2}}>
                    <Typography style={{fontSize: "20px"}}>Contact Info</Typography>
                    <Typography sx={{ml: 3}}>Email: {email}</Typography>
                    <Typography sx={{ml: 3}}>Phone#: {phone}</Typography>
                    <Stack direction="row" spacing={3} justifyContent="flex-end">
                        {isAdmin ? <Button onClick={createEvent} variant="outlined">Create Event</Button> : !isActive ? <Button onClick={joinRSO} variant="outlined">Join</Button> : <Button onClick={leaveRSO} variant="outlined" sx={{alignSelf: "flex-end"}}>Leave</Button>}
                    </Stack>
                </Stack>
            </Paper>
            <Box sx={{maxWidth: "800px", marginX: "auto", marginY: "20px", textAlign: "left"}}>
                <Typography variant='h6'>Description: </Typography>
                <Typography>{description}</Typography>
            </Box>
            <Stack spacing={3} sx={{maxWidth: "800px", marginX: "auto", marginY: "20px"}}>
                {events.length > 0 ? events.map((event) => (
                    <EventCard event={event} key={event.name}/>
                ))
                :<Typography sx={{fontSize: 20}}>No events avilable</Typography>
                }
            </Stack>
        </Box>
    );
}

export default RSO;