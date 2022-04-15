const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.get('/getAll/:uniName/:userid', async (req, res) => {
    console.log(req.params);
    const uid = req.params.userid;
    const uniName = req.params.uniName;
    let events = [];
    try {
        const rows = await db.query(
            `SELECT DISTINCT * FROM eventss E join joined ON (joined.RID = E.RID AND joined.UID = '${uid}') join rso ON (rso.RID = joined.RID AND joined.UID = '${uid}') 
            join location ON (location.LocID = E.LocID) WHERE
            E.Category = 'rso'`
        );
        events = [...events, ...rows];
        const rows2 = await db.query(
            `SELECT DISTINCT * FROM eventss E join location ON (location.LocID = E.LocID) WHERE
            (E.Category = 'pri' AND E.uniName = '${uniName}')`
        );
        events = [...events, ...rows2];
        const rows3 = await db.query(
            `SELECT DISTINCT * FROM eventss E join location ON (location.LocID = E.LocID) WHERE
            E.Category = 'pub' AND E.approved = 1`
        );
        events = [...events, ...rows3];
        res.json({events: events});
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/getUnapproved', async (req, res) => {
    const uniName = req.body.uniName;
    try {
        const rows = await db.query(
            `SELECT DISTINCT * FROM eventss E join location ON (location.LocID = E.LocID) WHERE approved = 0 AND E.uniName = '${uniName}' AND Category = 'pub'`
        );
        console.log(rows);
        res.json({events: rows});
    }
    catch (error) {
        console.log(error);
    }
})

router.post('/createPublicEvent', async (req, res) => {
    console.log(req.body);
    const uid = req.body.userid;
    const contactEmail = req.body.contactEmail;
    const contactNumber = req.body.contactNumber;
    const date = req.body.date;
    const description = req.body.description;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const locName = req.body.locName;
    const start = req.body.start;
    const end = req.body.end;
    const uniName = req.body.uniName;
    const name = req.body.name;

    try {
        let locID;
        const loc_call = await db.query(
            `SELECT * FROM location WHERE (latitude = '${latitude}' AND longitude = '${longitude}')`
        );

        if(loc_call <= 0) {
            const locSet = await db.query(
                `INSERT INTO location (longitude, latitude, locName)
                 VALUES ('${longitude}', '${latitude}', '${locName}')`
            );
            locID = locSet.insertId;
        }
        else {
            locID = loc_call[0].LocID;
        }

        const rows = await db.query(
            `SELECT * FROM eventss E WHERE (((E.Start <= '${start}' AND E.End >= '${start}') OR (E.Start <= '${end}' AND E.End >= '${end}'))
            AND E.Date = '${date}' AND E.LocID = '${locID}')`
        );
        
        if(rows > 0)
            console.log('Conflict with another event');
        else {
            const ins = await db.query(
                `INSERT INTO eventss (Date, Start, End, LocID, contactEmail, contactNumber, Category, Description, UID, uniName, name)
                VALUES ('${date}', '${start}', '${end}', '${locID}', '${contactEmail}', '${contactNumber}', 'pub', '${description}', '${uid}', '${uniName}', '${name}')`
            );
            if(ins > 0)
                console.log('Successfully inserted');
            res.json({ inserted: ins });
        }
    } 
    catch (error) {
        console.log(error);
        return res.json({message: "invalid event entry"});
    }
});

router.post('/createRSOevent', async (req, res) => {
    console.log(req.body);
    const uid = req.body.userid;
    const contactEmail = req.body.contactEmail;
    const date = req.body.date;
    const description = req.body.description;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const locName = req.body.locName;
    const start = req.body.start;
    const end = req.body.end;
    const RID = req.body.RID;
    const uniName = req.body.uniName;
    const name = req.body.name;

    try {
        let locID;
        const loc_call = await db.query(
            `SELECT * FROM location WHERE (latitude = '${latitude}' AND longitude = '${longitude}')`
        );

        if(loc_call <= 0) {
            const locSet = await db.query(
                `INSERT INTO location (longitude, latitude, locName)
                 VALUES ('${longitude}', '${latitude}', '${locName}')`
            );
            locID = locSet.insertId;
        }
        else {
            locID = loc_call[0].LocID;
        }
        
        const rows = await db.query(
            `SELECT * FROM eventss E WHERE (((E.Start <= '${start}' AND E.End >= '${start}') OR (E.Start <= '${end}' AND E.End >= '${end}'))
            AND E.Date = '${date}' AND E.LocID = '${locID}')`
        );
        
        if(rows > 0)
            console.log('Conflict with another event');
        else {
            const ins = await db.query(
                `INSERT INTO eventss (Date, Start, End, LocID, contactEmail, Category, Description, UID, RID, uniName, name)
                VALUES ('${date}', '${start}', '${end}', '${locID}', '${contactEmail}', 'rso', '${description}', '${uid}', '${RID}', '${uniName}', '${name}')`
            );
            if(ins > 0)
                console.log('Successfully inserted');
        }
        res.json({ ins: rows });
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/createUniEvent', async (req, res) => {
    console.log(req.body);
    const uid = req.body.userid;
    const contactEmail = req.body.contactEmail;
    const date = req.body.date;
    const description = req.body.description;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const locName = req.body.locName;
    const start = req.body.start;
    const end = req.body.end;
    const uniName = req.body.uniName;
    const name = req.body.name;

    try {
        let locID;
        const loc_call = await db.query(
            `SELECT * FROM location WHERE (latitude = '${latitude}' AND longitude = '${longitude}')`
        );

        if(loc_call <= 0) {
            const locSet = await db.query(
                `INSERT INTO location (longitude, latitude, locName)
                 VALUES ('${longitude}', '${latitude}', '${locName}')`
            );
            locID = locSet.insertId;
        }
        else {
            locID = loc_call[0].LocID;
        }

        
        const rows = await db.query(
            `SELECT * FROM eventss E WHERE (((E.Start <= '${start}' AND E.End >= '${start}') OR (E.Start <= '${end}' AND E.End >= '${end}'))
            AND E.Date = '${date}' AND E.LocID = '${locID}')`
        );
        
        if(rows > 0)
            console.log('Conflict with another event');
        else {
            const ins = await db.query(
                `INSERT INTO eventss (Date, Start, End, LocID, contactEmail, Category, Description, UID, uniName, name)
                VALUES ('${date}', '${start}', '${end}', '${locID}', '${contactEmail}', 'pri', '${description}', '${uid}', '${uniName}', '${name}')`
            );
            if(ins > 0)
                console.log('Successfully inserted');
        }
        res.json({ ins: rows });
    }
    catch (error) {
        console.log(error);
        return res.json({message: "invalid event entry"});
    }
});

router.get('/rso/:rsoid', async(req,res) => {
    const RID = req.params.rsoid;
    try {
        const rows = await db.query(
            `SELECT Date, Start, End, name, E.ContactNumber, E.ContactEmail, E.Description, rsoName, locName, E.uniName, latitude, longitude FROM eventss E, rso R, location L WHERE
              (E.Category = 'rso' AND E.RID = ${RID} AND r.RID = E.RID AND E.LocID = L.LocID)`,
        );
        res.json({ events: rows });
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/approveEvent', async (req, res) => {
    console.log(req.body);
    const start = req.body.start;
    const end = req.body.end;
    const date = req.body.date;

    try {

        const approved = await db.query(
            `UPDATE eventss SET approved = 1 WHERE Start = '${start}' AND End = '${end}' AND Date = '${date}'`
        );
        res.json({ updated: approved });
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = router;