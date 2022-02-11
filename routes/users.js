const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/login', async (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    try {
        const rows = await db.query(
            `SELECT * FROM users WHERE Username='${username}' AND Password='${password}'`,
        );
        res.json({ users: rows });
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/signup', async (req, res) => {
    console.log(req.body);
    const type = req.body.type;
    const username = req.body.username;
    const password = req.body.password;
    try {
        const results = await db.query(
            `INSERT INTO users (Username, Password) VALUES ('${username}', '${password}')`,
        );
        console.log(results);
        res.json({ userId: results.insertId });
    }
    catch (error) {
        console.log("error: " + error.code);
        res.json({ userId: null });
    }
});

module.exports = router;