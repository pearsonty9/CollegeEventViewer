const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/:uniName/:userid', async (req, res) => {
    console.log(req.body);
    const uid = req.params.userid;
    const uniName = req.params.uniName;
    try {
        const rows = await db.query(
            `SELECT * FROM eventss E, joined J, university UNI, rso R WHERE
              (E.Category = 'rso' AND (J.UID = '${uid}' AND J.RID = E.rID))
              OR E.Category = 'pub'
              OR (E.Category = 'uni' AND (UNI.uniName = '${uniName}' AND E.uniName = UNI.uniName))`,
        );
        res.json({ events: rows });
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/public', async (req, res) => {
    console.log(req.body);
    const uid = req.body.uid;
    const contactEmail = req.body.contactEmail;
    const date = req.body.date;
    const category = req.body.category;
    const description = req.body.description;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const locName = req.body.locName;
    const start = req.body.start;
    const end = req.body.end;

    try {
        const loc_call = await db.query(
            `SELECT LocID FROM location WHERE (latitude = '${latitude}' AND longitude = '${longitude}')`
        );

        if(loc_call <= 0) {
            const locSet = await db.query(
                `INSERT INTO location (longitude, latitude, locName)
                 VALUES ('${longitude}', '${latitude}', '${locName}')`
            );
            const loc_call = await db.query(
                `SELECT LocID FROM location WHERE (latitude = '${latitude}' AND longitude = '${longitude}')`
            );
        }

        /* make insert location */
        const locID = loc_call;
        
        const rows = await db.query(
            `SELECT * FROM eventss E WHERE (((E.Start <= '${start}' AND E.End >= '${start}') OR (E.Start <= '${end}' AND E.End >= '${end}'))
            AND E.Date = '${date}' AND E.LocID = '${locID}')`
        );
        
        if(rows > 0)
            console.log('Conflict with another event');
        else {
            const ins = await db.query(
                `INSERT INTO eventss (Date, Start, End, LocID, ContactInfo, Category, Description, UID)
                VALUES ('${date}', '${start}', '${end}', '${locID}', '${contactEmail}', '${category}', '${description}', '${uid}')`
            );
            if(ins > 0)
                console.log('Successfully inserted');
            else
                console.log(error);
        }
        res.json({ ins: rows });
    }
    catch (error) {
        console.log(error);
    }
});

module.exports = router;