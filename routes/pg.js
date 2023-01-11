import express from "express"
import mysql from 'mysql2';
const router = express.Router();

const pg = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D3@1tN0t#S0E@sy',
    database: 'pg'
});
//insert data id and scores
router.post("", (req, res) => {
    let keys = Object.keys(req.body);
    let values = [];

    // Loop thropgh the request body to get the values
    keys.forEach(function (key) {
        values.push(req.body[key]);
    });

    const q = `INSERT INTO pginfo (${keys.join(',')}) VALUES (?)`;
    pg.query(q, [values], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });

})
//get data using id  
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const q1 = `SELECT * FROM pginfo where userID= ${id}`;
    pg.query(q1, (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });
})
//update the test score using id and test name
router.put("/:id", (req, res) => {
    const id = req.params.id;
    let updateValues = {};
    for (let key in req.body) {
        updateValues[key] = req.body[key];
    }
    const q1 = `UPDATE pginfo set ? WHERE userID= ${id}`;
    pg.query(q1, [updateValues], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });

})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const q1 = `DELETE FROM pginfo where userID= ${id}`;
    pg.query(q1, (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });


})



export default router;

