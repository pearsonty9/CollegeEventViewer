import React from 'react';
import { Box } from '@mui/system';
import { Stack, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar(props) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("userid", JSON.stringify(null));
        localStorage.setItem("university", JSON.stringify(null));
        navigate("/login");
    }

    return (
        <Box sx={{background: "grey", position: "sticky", top: 0, px: 3, p: 1, zIndex: 999}}>
            <Stack direction="row" justifyContent="space-between">
                <Typography variant="h5" onClick={() => navigate("/home")} style={{color: "white", marginInline: 16, alignSelf: "center", cursor: "pointer"}}>Event Dashboard</Typography>
                <Button sx={{mx: 3, color: "white"}} onClick={handleLogout}>Logout</Button>
            </Stack>
        </Box>
    );
}

export default Navbar;