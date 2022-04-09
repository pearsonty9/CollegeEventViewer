const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/', async (req, res) => {
    console.log(req.body);
    const userID = req.body.userID;
    const uniName = req.body.uniName;
    const rsoEmail = req.body.rsoEmail;
    const rsoName = req.body.password;
    const memberList = req.body.memberList;

    try {
        if(memberList.length() < 5)
            return console.log("Member list must be at least 5");
        const give = await db.query(
            `INSERT INTO rso (domainEmail, uID, uniName, rsoName) VALUES ('${rsoEmail}', '${userID}', '${uniName}', '${rsoName}')`,
        );
        const rsoID = give.rsoID;
        for( const i in memberList) {
            const insertMembers = await db.query(
                `INSERT INTO joined (uID, RID) VALUES ('${memberList[i]}', '${rsoID}')`,
            );
        }
        res.json({ rsoid: rsoID });
    }
    catch (error) {
        console.log(error);
    }
});


module.exports = router;