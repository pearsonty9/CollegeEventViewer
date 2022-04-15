const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/newComment', async (req, res) => {
    console.log(req.body);
    const userID = req.body.UID;
    const date = req.body.date;
    const start = req.body.start;
    const end = req.body.end;
    const text = req.body.textfield;
    const rating = req.body.rating;

    try {
        const insertComments = await db.query(
            `INSERT INTO comments (UID, Date, Start, End, textfield, rating) VALUES ('${userID}', '${date}', '${start}', '${end}', '${text}', ${rating})`,
        );
        res.json({ inserted: insertComments });
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/editComment', async (req, res) => {
    console.log(req.body);
    const comID = req.body.CID;
    const text = req.body.text;
    const rating = req.body.rating;

    try{
        const editComments = await db.query(
            `UPDATE comments SET textfield = '${text}', rating = ${rating} WHERE CID = ${comID}`,
        );
        res.json({ edited: editComments });
    }
    catch (error) {
        console.log(error);
    }    
});

router.post('/deleteComment', async (req, res) => {
    const comID = req.body.CID;

    try{
        const deleteComments = await db.query(
            `DELETE FROM comments WHERE CID = '${comID}'`,
        );
        res.json({ deleted: deleteComments });
    }
    catch (error) {
        console.log(error);
    }    
});

router.post('/viewComments', async (req, res) => {
    const date = req.body.date;
    const start = req.body.start;
    const end = req.body.end;

    try{
        const rows = await db.query(
            `SELECT * FROM comments C, users U WHERE (Date = '${date}' AND Start = '${start}' AND End = '${end}' AND C.UID = U.UID)`,
        );
        res.json({ comments: rows });
    }
    catch (error) {
        console.log(error);
    }    
});

module.exports = router;