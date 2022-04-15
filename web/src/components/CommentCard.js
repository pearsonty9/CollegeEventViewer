import React, { useState } from 'react';
import axios from 'axios';

import { Card, Box, Typography, Button, Stack, TextField, Slider } from '@mui/material';

function CommentCard({comment, removeComment}) {
    const [text, setText] = useState(comment.textfield);
    const [rating, setRating] = useState(comment.rating);

    const [isEditing, setIsEditing] = useState(false);
    const userid = JSON.parse(localStorage.getItem("userid"));

    const deleteComment = async () => {
        await axios.post(`http://localhost:3000/comment/deleteComment`, {CID: comment.CID});
        removeComment(comment.CID);
    }

    const handleSaveComment = async (event) => {
        await axios.post(`http://localhost:3000/comment/editComment`, {CID: comment.CID, text: text, rating: rating});
        setIsEditing(false);
    }

    const handleCancelComment = (event) => {
        setIsEditing(false);
    }

    const handleEditComment = (event) => {
        setIsEditing(true);
    }

    const handleCommentChange = (event) => {
        setText(event.target.value);
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    }

    return (
        <Card sx={{px: 2, py: 1}}>
            <Typography sx={{fontSize: "18px"}}>{comment.username}</Typography>
            <Box sx={{ml: 2}}>
                {isEditing ? 
                <>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography>Comment:</Typography>
                    <TextField fullWidth value={text} size="small" variant="outlined" color="primary" id="new-comment" onChange={handleCommentChange}/>
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
                </>
                :
                <>
                    <Typography>{text}</Typography>
                    <Typography>Raiting: {rating}</Typography>
                </>}
                {
                    (userid === comment.UID) ?
                    <Stack direction="row" justifyContent="flex-end">
                        {isEditing ? <Button onClick={handleCancelComment}>Cancel</Button> : <Button onClick={handleEditComment}>Edit</Button>}
                        {isEditing ? <Button onClick={handleSaveComment}>Save</Button> : <Button onClick={deleteComment}>Delete</Button>}
                    </Stack>
                    : null
                }
            </Box>
        </Card>
    );
}

export default CommentCard;