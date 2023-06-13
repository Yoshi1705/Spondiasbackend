const express = require('express');
const pool = require('./../config/db.config');

const router = express.Router();

const table_name = 'employee';
const genRandomId = (l) => {
    let Id = ""
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < l; i++) {
        Id += characters.charAt(Math.floor(Math.random() * 36));
    }
    return Id;
};

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected');
        connection.query(`SELECT * FROM ${table_name}`, (error, rows) => {
            connection.release();

            if (!error) {
                res.send(rows);
            } else {
                console.log(error);
            }
        })
    })
});

router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected');
        const randomId = genRandomId(10);
        const date = new Date();
        const user_id = req.params.id;
        var post = {
            emp_id: req.body.emp_id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            contactNo: req.body.contactNo,
            dob: req.body.dob,
            email: req.body.email,
            joining_date: req.body.joining_date,
            qualification: req.body.qualification,
            address: req.body.address,
            pan_no: req.body.pan_no,
            passport_number: req.body.passport_number,
            marital_status: req.body.marital_status,
            image: req.body.image,
            bxp: req.body.bxp,
            pxp: req.body.pxp,
            nda_image: "",
            aadhar_image: "",
            status: req.body.status,
            isActive: req.body.isActive,
            created_at: date,
            created_by: user_id,
            randomId: randomId
        }
        connection.query(`INSERT INTO ${table_name} SET ?`, post, (error, results, field) => {
            if (error) throw error;
            res.send(results);
        })
    })
});

router.put('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected');
        const date = new Date();
        const user_id = req.params.id;
        connection.query(`UPDATE ${table_name} SET emp_id=?, firstname= ?, lastname= ?, gender= ?, contactNo= ?, dob= ?, email= ?, joining_date= ?, qualification= ?, address= ?, pan_no= ?, passport_number= ?, marital_status= ?, image= ?, bxp= ?, pxp= ?, nda_image= ?, aadhar_image= ?, status= ?, isActive= ?, updated_at= ?, updated_by=? WHERE id= ?`, [req.body.emp_id, req.body.firstname, req.body.lastname, req.body.gender, req.body.contactNo, req.body.dob, req.body.email, req.body.joining_date, req.body.qualification, req.body.address, req.body.pan_no, req.body.passport_number, req.body.marital_status, req.body.image, req.body.bxp, req.body.pxp, "", "", req.body.status, req.body.isActive, date, user_id, user_id], function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });

    })
});

router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const user_id = req.params.id;
        connection.query(`DELETE FROM ${table_name} WHERE id=?`, [user_id], function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
    })
})

module.exports = router;