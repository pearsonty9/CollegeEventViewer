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
    catch {
        console.log("Query failed");
    }
});

module.exports = router;