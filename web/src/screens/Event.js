import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Stack, Button, Card, TextField, Slider } from '@mui/material';
import Navbar from '../components/Navbar';
import CommentCard from '../components/CommentCard';
import MapContainer from '../components/MapContainer';

import { useNavigate, useLocation } from 'react-router-dom';

function Event(props) {
    const { state } = useLocation();
    const [newComment, setNewComment] = useState("");
    const [rating, setRating] = useState(5);
    const [comments, setComments] = useState([]);
    const [approved, setApproved] = useState(state.event.approved);

    const [isAdmin, setIsAdmin] = useState(false);

    const userid = JSON.parse(localStorage.getItem("userid"));
    const username = JSON.parse(localStorage.getItem("username"));

    const navigate = useNavigate();

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

    const createComment = async () => {
        const commentData = {
            UID: userid,
            date: state.event.Date,
            start: state.event.Start,
            end: state.event.End,
            textfield: newComment,
            rating: rating,
            username: username
        }

        const comment = await axios.post(`http://localhost:3000/comment/newComment`, commentData);
        console.log(comment.data.inserted.insertId);
        addComment({...commentData, CID: comment.data.inserted.insertId});
    }

    const addComment = (commentData) => {
        setComments([...comments, commentData]);
        setNewComment("");
        setRating(5);
    }

    const removeComment = (CID) => {
        setComments(comments.filter(comment => comment.CID !== CID));
    }

    const approve = () => {
        const req = {
            date: state.event.Date,
            start: state.event.Start,
            end: state.event.End
        }
        axios.post(`http://localhost:3000/event/approveEvent`, req)
        .then(res => res.data)
        .then(data => console.log(data))
        .catch(error => console.log(error));
        setApproved(1);
        navigate("/approve");
    }
    
    useEffect(() => {
        const req = {
            date: state.event.Date,
            start: state.event.Start,
            end: state.event.End
        }
        const userType = JSON.parse(localStorage.getItem("userType"));
        if (userType === "SUP") {
            setIsAdmin(true);
        }
        axios.post(`http://localhost:3000/comment/viewComments`, req)
        .then(res => res.data)
        .then(data => {
            setComments(data.comments);
        })
        .catch(error => console.log(error));
    }, [])

    return (
        <Box sx={{background: "#EBEBEB", minHeight: "100vh", pb: 20}}>
           <Navbar />
            <Paper sx={{maxWidth: "800px", marginX: "auto", marginY: "20px", textAlign: "left", p: 2}}>
                <Typography variant='h4'>{state.event.name}</Typography>
                <Typography variant="h5" sx={{ml: 3}}>{state.event.uniName} - {state.event.rsoName}</Typography>
                <Stack sx={{mt: 2}}>
                    <Typography >Date: {state.event.Date}</Typography>
                    <Typography >Time: {state.event.Start} - {state.event.End}</Typography>
                </Stack>
                <Stack sx={{mt: 2}}>
                    <Typography style={{fontSize: "20px"}}>Contact Info</Typography>
                    <Typography sx={{ml: 3}}>Email: {state.event.ContactEmail}</Typography>
                    <Typography sx={{ml: 3}}>Phone#: {state.event.ContactNumber}</Typography>
                </Stack>
                <Stack direction="row" sx={{justifyContent: "flex-end"}}>
                    {isAdmin && state.event.Category === "pub" && approved === 0 ? <Button variant="outlined" onClick={approve}>Approve Event</Button>: state.event.Category === "pub" && approved === 1 ? <Typography>Event has been approved</Typography> : null}
                </Stack>
            </Paper>
            <Stack sx={{maxWidth: "800px", marginX: "auto", marginY: "20px", textAlign: "left"}}>
                <Stack direction="row" spacing={1} sx={{alignItems: "baseline"}}>
                    <Typography variant='h6'>Location: </Typography>
                    <Typography>{state.event.locName}</Typography>
                </Stack>
                <MapContainer disabled={true} position={{lat: parseFloat(state.event.latitude), lng:  parseFloat(state.event.longitude)}}/>
            </Stack>
            <Box sx={{maxWidth: "800px", marginX: "auto", marginY: "20px", textAlign: "left"}}>
                <Typography variant='h6'>Description: </Typography>
                <Typography>{state.event.Description}</Typography>
            </Box>
            <Box sx={{maxWidth: "800px", marginX: "auto", marginY: "20px", textAlign: "left"}}>
                <Typography variant='h6'>Comments: </Typography>
                <Stack spacing={3} sx={{maxWidth: "800px", marginX: "auto", marginY: "20px",}}>
                    {comments.length > 0 ? comments.map((comment) => (
                        <CommentCard comment={comment} removeComment={removeComment} key={comment.CID}/>
                    ))
                    :null
                    }
                    <Card>
                        <Stack spacing={1} sx={{p: 2}}>
                            <Typography sx={{fontSize: "18px"}}>Create Comment</Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography>Comment:</Typography>
                                <TextField required fullWidth value={newComment} size="small" variant="outlined" color="primary" id="new-comment" onChange={handleCommentChange}/>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                <Typography>Raiting: {rating}</Typography>
                                <Slider
                                    style={{width: "80%", marginRight: 30}}
                                    aria-label="Temperature"
                                    value={rating}
                                    getAriaValueText={toString}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                    onChange={handleRatingChange}
                                />
                            </Stack>
                            <Button onClick={createComment} variant="contained" sx={{alignSelf: "flex-end"}}>Comment</Button>
                        </Stack>
                    </Card>
                </Stack>
            </Box>
        </Box>
    );
}

export default Event;