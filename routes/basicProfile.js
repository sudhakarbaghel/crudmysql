import express from "express"
import mysql from 'mysql2';
const router = express.Router();

const basicprofile = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'D3@1tN0t#S0E@sy',
    database: 'basicprofile'
});


router.post("", (req, res) => {
    //created a transaction rather then separately using the insert to avoid anamolies
    const q1 = `INSERT INTO  basicinfo ( firstName , middleName , lastName , mNo , email , dob , gender ,martialStatus,  placeOfBirth , citizenship , permanentAddress , paState , paCity , paPincode , currentAddress, caState , caCity , caPincode) VALUES (?)`;
    const q2 = `INSERT INTO emergencyinfo (contactName , contactRelationship , Branch ) VALUES (?)`
    const q3 = `INSERT INTO refinfo (source ,photoURL) VALUES (?) `

    const values1 = [req.body.firstName, req.body.middleName, req.body.lastName, req.body.mNo, req.body.email, req.body.dob, req.body.gender, req.body.martialStatus, req.body.placeOfBirth, req.body.citizenship, req.body.permanentAddress, req.body.paState, req.body.paCity, req.body.paPincode, req.body.currentAddress, req.body.caState, req.body.caCity, req.body.caPincode];
    const values2 = [req.body.contactName, req.body.contactRelationship, req.body.branch]
    const values3 = [req.body.source, req.body.photoURL]

    basicprofile.beginTransaction((err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error starting transaction');
        } else {
            // Insert data into basicinfo table
            basicprofile.query(q1, [values1], (err, result) => {
                if (err) {
                    console.log(err);
                    return basicprofile.rollback(() => {
                        res.status(500).send('Error inserting data into basicinfo table');
                    });
                }
                // Insert data into emergencyinfo table
                basicprofile.query(q2, [values2], (err, result) => {
                    if (err) {
                        console.log(err);
                        return basicprofile.rollback(() => {
                            res.status(500).send('Error inserting data into emergencyinfo table');
                        });
                    }
                    // Insert data into refinfo table
                    basicprofile.query(q3, [values3], (err, result) => {
                        if (err) {
                            console.log(err);
                            return basicprofile.rollback(() => {
                                res.status(500).send('Error inserting data into refinfo table');
                            });
                        }
                        basicprofile.commit((err) => {
                            if (err) {
                                console.log(err);
                                return basicprofile.rollback(() => {
                                    res.status(500).send('Error committing transaction');
                                });
                            }
                            res.status(200).send('Data inserted successfully');
                        });
                    });
                });
            });
        }
    });
})
//get all
router.get("", (req, res) => {
    const id = req.params.id;
    const q1 = `SELECT * FROM basicinfo JOIN emergencyinfo ON basicinfo.userid = emergencyinfo.userid JOIN refinfo ON emergencyinfo.userid = refinfo.userid`;


    basicprofile.query(q1, (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });
})
//get by  id 
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const q1 = `SELECT * FROM basicinfo JOIN emergencyinfo ON basicinfo.userid = emergencyinfo.userid JOIN refinfo ON emergencyinfo.userid = refinfo.userid WHERE basicinfo.userid = ${id}`;


    basicprofile.query(q1, (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });

})
//delete the student
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const q1 = `DELETE basicinfo, emergencyinfo, refinfo FROM basicinfo  INNER JOIN emergencyinfo ON basicinfo.userid = emergencyinfo.userid  INNER JOIN refinfo ON emergencyinfo.userid = refinfo.userid  WHERE basicinfo.userid = ${id}`;


    basicprofile.query(q1, (err, data) => {
        if (err)
            return res.json(err)
        return res.json(data)
    });


})
//update the values
router.put("/:id", (req, res) => {
    let updateValues = {};
    const id = req.params.id;
    // Loop through the request body to get the key-value pairs for the update values
    for (let key in req.body) {
        updateValues[key] = req.body[key];
    }
    const sql = `UPDATE basicinfo JOIN emergencyinfo ON basicinfo.userid = emergencyinfo.userid JOIN refinfo ON emergencyinfo.userid = refinfo.userid SET ? WHERE basicinfo.userid = ${id}`;
    basicprofile.query(sql, updateValues, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error updating data');
        } else {
            res.status(200).json(req.body);
        }
    });
})



export default router;


