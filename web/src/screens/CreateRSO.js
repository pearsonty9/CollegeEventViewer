import React, { useState } from 'react';
import axios from 'axios';

import { Box, Grid, TextField, Button, Typography } from '@mui/material';
import Add from '@mui/icons-material/Add';

import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function CreateRSO(props) {
    const [fields, setFields] = useState({
        name: "",
        domainEmail: "",
        contactEmail: "",
        contactNumber: "",
        description: "",
        membersList: ["", "", "", ""],
    });

    const navigate = useNavigate();

    const handleChange = (prop) => (event) => {
        setFields({ ...fields, [prop]: event.target.value });
    };

    const handleMembersList = (index) => (event) => {
        let members = fields.membersList;
        members[index] = event.target.value;
        setFields({ ...fields, "membersList": members });
    }

    const addMember = () => {
        setFields({ ...fields, membersList: [...fields.membersList, ""]});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userid = JSON.parse(localStorage.getItem("userid"));
        const uniName = JSON.parse(localStorage.getItem("university"));

        const req = {
            ...fields,
            userID: userid,
            uniName: uniName,
        }
        await axios.post('http://localhost:3000/rso', req)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));
        clearFields();
        const userType = JSON.parse(localStorage.getItem("userType"));
        if (userType === "STU")
            localStorage.setItem("userType", JSON.stringify("ADM"));
        navigate("/home");
    };

    const clearFields = () => {
        setFields({
            name: "",
            domainEmail: "",
            contactEmail: "",
            contactNumber: "",
            description: "",
            membersList: ["", "", "", ""],
        });
    }

    return (
        <Box>
            <Navbar />
            <Grid container spacing={3} sx={{ minWidth: 220, p: 2, mx: "auto", maxWidth: 700, pb: 20}} component="form" onSubmit={handleSubmit}>
                <Grid item xs={12}>
                    <Typography variant="h4" style={{alignSelf: "flex-start"}}>Create RSO</Typography>
                </Grid>
                <Grid item xs={12} justifyContent="space-between">
                    <TextField required fullWidth variant="outlined" color="primary" id="rso-name" label="RSO name" onChange={handleChange("name")}/>
                </Grid>
                <Grid item xs={6} justifyContent="space-between">
                    <TextField required fullWidth variant="outlined" color="primary" id="contact-email" label="Contact Email" onChange={handleChange("contactEmail")}/>
                </Grid>
                <Grid item xs={6} justifyContent="space-between">
                    <TextField required fullWidth variant="outlined" color="primary" id="contact-number" label="Contact Number" onChange={handleChange("contactNumber")}/>
                </Grid>
                {fields.membersList.map((item, index) => (
                    <Grid item xs={4} key={index}>
                        <TextField fullWidth variant="outlined" color="primary" id="member-email" label="Member" onChange={handleMembersList(index)}/>
                    </Grid>
                ))}
                <Grid item xs={4}>
                    <Button variant="outlined" startIcon={<Add />} onClick={addMember}>Add Member</Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField required fullWidth variant="outlined" multiline minRows={4} color="primary" id="description" label="Description" onChange={handleChange("description")}/>
                </Grid>
                <Grid item xs={12} sx={{display: "flex", justifyContent: "flex-end"}}>
                    <Button variant="contained" type="submit" color="primary" style={{width: "10rem"}}>Create RSO</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CreateRSO;