import express from "express"
import mysql from 'mysql2';
const router = express.Router();

const englishscore = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D3@1tN0t#S0E@sy',
    database: 'englishscore'
});
//insert data id and scores
router.post("", (req, res) => {

    const q = `INSERT INTO  englishscoreinfo ( userID , test , status , examdate , reading ,writing , listening ,speaking,  total , email ,username, password) VALUES (?)`;
     
    const values = [req.body.userID, req.body.test, req.body.status, req.body.examdate, req.body.reading, req.body.writing, req.body.listening, req.body.speaking, req.body.total, req.body.email, req.body.username,req.body.password];
    englishscore.query(q,[values], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });
})
//get data using id and name of test
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const test = req.query.test;
    const q1 = `SELECT * FROM englishscoreinfo where userID= ${id} AND test= ?`;
    englishscore.query(q1, [test],(err, data) => {
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
    const q1 = `UPDATE englishscoreinfo set ? WHERE userID= ${id} AND test= ?`;
    englishscore.query(q1,[updateValues,test], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });

})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const test = req.query.test;
    const q1 = `DELETE FROM englishscoreinfo where userID= ${id} AND test= ?`;


    englishscore.query(q1, [test], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });


})
 


export default router;

