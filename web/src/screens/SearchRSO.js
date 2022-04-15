import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Stack, Card, Typography, Button } from '@mui/material';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function SearchRSO(props) {

    const [RSOs, setRSOs] = useState([]);
    const navigate = useNavigate();

    const fetchRSOs = async () => {
        const university = JSON.parse(localStorage.getItem("university"));
        await axios.get(`http://localhost:3000/rso/uni/${university}`)
        .then(res => res.data)
        .then(data => setRSOs(data.rsos))
        .catch(error => console.log(error));
    }

    useEffect(() => {
        fetchRSOs();
    }, [])

    return (
        <Box sx={{backgroundColor: "#EBEBEB", minHeight: "100vh", pb: 20}}>
            <Navbar />
            <Stack spacing={2} sx={{mx: "auto", maxWidth: 700}}>
                <Typography variant="h4" sx={{margin: 3, textAlign: "left"}}>Search RSOs</Typography>
                {RSOs.length > 0 ? RSOs.map(rso => (
                    <Card key={rso.rsoName} sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 120, p: 2 }}>
                        <Stack alignItems="flex-start" textAlign="left">
                            <Typography variant="h5">{rso.rsoName}</Typography>
                            <Typography sx={{ml: 2}} variant="body1">Description: </Typography>
                            <Typography sx={{ml: 4}}>{rso.description === null ? "No description provided": rso.description}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="flex-end">
                            <Button onClick={() => navigate("/rso", {state: {rso: rso}})}>View</Button>
                        </Stack>
                    </Card>
                )): 
                <>
                    <Typography>There are no RSO for your University events</Typography>
                    <Button variant="contained" onClick={() => navigate("/createrso")}>Create one</Button>
                </>}
            </Stack>
        </Box>
    );
}

export default SearchRSO;