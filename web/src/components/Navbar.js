import React from 'react';
import { Box } from '@mui/system';
import { Stack, Typography, Button } from '@mui/material';

function Navbar(props) {
    return (
        <Box sx={{background: "grey", position: "sticky", top: 0, px: 3, p: 1, zIndex: 999}}>
            <Stack direction="row" justifyContent="flex-end">
                <Button>Logout</Button>
            </Stack>
        </Box>
    );
}

export default Navbar;