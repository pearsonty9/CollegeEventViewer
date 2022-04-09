import React from 'react';

import { Card, Box, Typography, Button } from '@mui/material';

function RSOCard({rso}) {
    const {name, university, description, contact} = rso;
    return (
        <Card sx={{textAlign: "left"}}>
            <Box sx={{backgroundColor: "#C4C4C4", px: 2, py: 1}}>
                <Typography variant='h5' sx={{lineHeight: 1, my: 0.5}}>{name}</Typography>
                <Typography variant='subtitle1' sx={{lineHeight: 1, mx: 1}}>{university}</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
                <Box>
                    <Typography variant='body'><strong>Description: </strong>{description}</Typography><br/>
                    <Typography variant='body'><strong>Time: </strong>{contact}</Typography>
                </Box>
                <Box sx={{display: "flex", ml: 2}}>
                    <Button variant="contained" sx={{alignSelf: "flex-end"}}>View</Button>
                </Box>
            </Box>
        </Card>
    );
}

export default RSOCard;