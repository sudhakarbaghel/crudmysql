import express from "express"
import mysql from 'mysql2';
const router = express.Router();

const aptitudescore = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D3@1tN0t#S0E@sy',
    database: 'aptitudescore'
});
//insert data id and scores
router.post("", (req, res) => {

    const q = `INSERT INTO  aptitudescoreinfo ( userID, test, status, examdate, quantitative, verbal, analytical, reasoning, total, email, username, password) VALUES (?)`;

    const values = [req.body.userID, req.body.test, req.body.status, req.body.examdate, req.body.quantitative, req.body.verbal, req.body.analytical, req.body.reasoning, req.body.total, req.body.email, req.body.username, req.body.password];
    aptitudescore.query(q, [values], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });
})
//get data using id and name of test
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const test = req.query.test;
    const q1 = `SELECT * FROM aptitudescoreinfo where userID= ${id} AND test= ?`;
    aptitudescore.query(q1, [test], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });
})
//update the test score using id and test name
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const test = req.query.test;

    let updateValues = {};
    for (let key in req.body) {
        updateValues[key] = req.body[key];
    }
    const q1 = `UPDATE aptitudescoreinfo set ? WHERE userID= ${id} AND test= ?`;
    aptitudescore.query(q1, [updateValues, test], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });

})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const test = req.query.test;
    const q1 = `DELETE FROM aptitudescoreinfo where userID= ${id} AND test= ?`;


    aptitudescore.query(q1, [test], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });


})



export default router;

