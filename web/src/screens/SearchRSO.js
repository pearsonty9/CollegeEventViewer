import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Stack, Card, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

function SearchRSO(props) {

    const [RSOs, setRSOs] = useState([]);

    useEffect(() => {
        const userid = JSON.parse(localStorage.getItem("userid"));
        const university = JSON.parse(localStorage.getItem("university"));

        axios.post(`http://localhost:3000/rso/${university}/${userid}`)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));

        // setRsos(testData);
    }, [])

    return (
        <Box>
            <Navbar />
            <Stack spacing={3}>
                {RSOs.map(rso => (
                    <Card>
                        <Typography>{rso.name}</Typography>
                        <Typography>{rso.description}</Typography>
                        <Typography>{rso.contact}</Typography>
                    </Card>
                ))}
            </Stack>
        </Box>
    );
}

export default SearchRSO;