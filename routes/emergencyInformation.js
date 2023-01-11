import express from "express"
import mysql from 'mysql2';
const router = express.Router();

const basicprofile = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D3@1tN0t#S0E@sy',
    database: 'basicprofile'
});
//no need of inserting emergency data bcz it is already exist 
// router.post("", (req, res) => {

//     const q = `INSERT INTO   emergencyinfo ( userID , test , status , examdate , reading ,writing , listening ,speaking,  total , email ,username, password) VALUES (?)`;

//     const values = [req.body.userID, req.body.test, req.body.status, req.body.examdate, req.body.reading, req.body.writing, req.body.listening, req.body.speaking, req.body.total, req.body.email, req.body.username, req.body.password];
//     basicprofile.query(q, [values], (err, data) => {
//         if (err)
//             return res.json(err)
//         return res.json(data)
//     });
// })
//get data using id  
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const q1 = `SELECT * FROM  emergencyinfo where userID= ${id}`;
    basicprofile.query(q1,(err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });
})
//update the  emergency details
router.put("/:id", (req, res) => {
    const id = req.params.id;

    let updateValues = {};
    for (let key in req.body) {
        updateValues[key] = req.body[key];
    }
    const q1 = `UPDATE  emergencyinfo set ? WHERE userID= ${id}`;
    basicprofile.query(q1, [updateValues], (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });

})
//commented delete route  

// router.delete("/:id", (req, res) => {
//     const id = req.params.id;
//     const q1 = `DELETE FROM  emergencyinfo where userID= ${id}`;


//     basicprofile.query(q1,(err, data) => {
//         if (err)
//             return res.json(err)
//         return res.json(data)
//     });


// })



export default router;

