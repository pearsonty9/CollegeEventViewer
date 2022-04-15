const express = require('express');
const router = express.Router();
const db = require('../db.js');

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const rows = await db.query(
            `SELECT * FROM users WHERE username='${username}' AND password='${password}'`,
        );
        res.json({ users: rows });
    }
    catch (error) {
        console.log(error);
    }
});

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const university = req.body.university;
    try {
        const results = await db.query(
            `INSERT INTO users (username, password, userType, uniName) VALUES ('${username}', '${password}', 'STU', '${university}')`,
        );
        res.json({ userId: results.insertId });
    }
    catch (error) {
        console.log("error: " + error.code);
        res.json({ userId: null });
    }
});

router.post('/adminSignup', async (req, res) => {
    const username = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const description = req.body.description;
    try {
        const createUniversity = await db.query(
            `INSERT INTO university (uniName, description, numOfStudents, location) VALUES ('${name}', '${description}', 0, 'Test')`,
        );
        const createUser = await db.query(
            `INSERT INTO users (username, password, userType, uniName) VALUES ('${username}', '${password}', 'SUP', '${name}')`,
        );
        res.json({ userId: createUser.insertId });
    }
    catch (error) {
        console.log("error: " + error.code);
        res.json({ userId: null });
    }
});

module.exports = router;