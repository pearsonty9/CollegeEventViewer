import React from 'react';

import { Card, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function EventCard({event}) {

    const navigate = useNavigate();

    const {name, uniName, rsoName, Description, locName, Date, Start, End} = event;
    return (
        <Card sx={{textAlign: "left"}}>
            <Box sx={{backgroundColor: "#C4C4C4", px: 2, py: 1}}>
                <Typography variant='h5' sx={{lineHeight: 1, my: 0.5}}>{name}</Typography>
                <Typography variant='subtitle1' sx={{lineHeight: 1, mx: 1}}>{uniName} - {rsoName}</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
                <Box>
                    <Typography variant='body'><strong>Description: </strong>{Description}</Typography><br/>
                    <Typography variant='body'><strong>Location: </strong>{locName}</Typography><br/>
                    <Typography variant='body'><strong>Date: </strong>{Date}</Typography><br/>
                    <Typography variant='body'><strong>Time: </strong>{Start} - {End}</Typography>
                </Box>
                <Box sx={{display: "flex", ml: 2}}>
                    <Button onClick={() => navigate("/event", { state: { event } })} variant="contained" sx={{alignSelf: "flex-end"}}>View</Button>
                </Box>
            </Box>
        </Card>
    );
}

export default EventCard;