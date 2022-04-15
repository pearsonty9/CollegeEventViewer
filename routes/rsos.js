const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/', async (req, res) => {
    const userID = req.body.userID;
    const uniName = req.body.uniName;
    const rsoEmail = req.body.domainEmail;
    const rsoName = req.body.name;
    const contactNumber = req.body.contactNumber;
    const contactEmail = req.body.contactEmail;
    const description = req.body.description;
    const memberList = req.body.membersList;

    try {
        if(memberList.length < 4)
            return console.log("Member list must be at least 5");
        const give = await db.query(
            `INSERT INTO rso (domainEmail, UID, uniName, rsoName, ContactNumber, ContactEmail, description) VALUES
            ('${rsoEmail}', '${userID}', '${uniName}', '${rsoName}', '${contactNumber}', '${contactEmail}', '${description}')`,
        );
        const rsoID = give.insertId;
        await db.query(
            `INSERT INTO joined (UID, RID) VALUES (${userID}, ${rsoID})`,
        );
        for(const i in memberList) {
            const usersID = await db.query(
                `SELECT UID FROM users WHERE username = '${memberList[i]}'`,
            );
            if (usersID.length < 1)
                return res.json({ message: "invalid members "});
            
            const insertMembers = await db.query(
                `INSERT INTO joined (UID, RID) VALUES (${usersID[0].UID}, ${rsoID})`,
            );
        }
        await db.query(
            `UPDATE users SET userType = 'ADM' WHERE UID = '${userID}' AND userType = 'STU'`
        );
        res.json({rsoid: rsoID});
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/user/:userid', async (req, res) => {
    const userid = req.params.userid;

    try {
        const rows = await db.query(
            `SELECT * FROM joined J, rso R WHERE J.UID = ${userid} AND J.RID = R.RID`,
        );
        res.json({ rsos: rows });
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/user/active/:userid/:rsoid', async (req, res) => {
    const userid = req.params.userid;
    const rsoid = req.params.rsoid;

    try {
        const rows = await db.query(
            `SELECT * FROM joined J WHERE J.UID = ${userid} AND J.RID = ${rsoid}`,
        );
        res.json({ isActive: (rows.length > 0) });
    }
    catch (error) {
        console.log(error);
    }
});

router.get('/uni/:uniName', async (req, res) => {
    const uniName = req.params.uniName;

    try {
        const rows = await db.query(
            `SELECT * FROM rso WHERE uniName = '${uniName}'`,
        );
        res.json({ rsos: rows });
    }
    catch (error) {
        console.log("error: " + error);
    }
});

router.post('/join', async (req, res) => {
    const userid = req.body.userid;
    const rsoid = req.body.rsoid;

    try {
        const query = await db.query(
            `INSERT INTO joined (UID, RID) VALUES (${userid}, ${rsoid})`,
        );
        res.json(query.insertId);
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/leave', async (req, res) => {
    const userid = req.body.userid;
    const rsoid = req.body.rsoid;

    try {
        const query = await db.query(
            `DELETE FROM joined WHERE UID = ${userid} && RID = ${rsoid}`,
        );
        res.json(query.affectedRows);
    }
    catch (error) {
        console.log(error);
    }
});


module.exports = router;