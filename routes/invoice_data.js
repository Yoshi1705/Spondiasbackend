const express = require('express');
const pool = require('./../config/db.config');

const router = express.Router();

const table_name = 'account_tab';
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
        const date = new Date();
        connection.query(`SELECT MAX(invoiceno) FROM ${table_name}`, (error, results, field) => {
            if (error) throw error;
            console.log(results);
            const invoice = results[0]['MAX(invoiceno)'];
            const invoiceno = +invoice.slice(2) + 1;
            let invoiceStr = invoiceno.toString();
            while(invoiceStr.length < 5) {
                invoiceStr = "0" + invoiceStr;
            }
            const db_invoice = "SP" + invoiceStr;
            var post = {
                invoiceno: db_invoice,
                date: date,
                companyname: req.body.companyname,
                location: req.body.location,
                paymenttype: req.body.paymenttype,
                paymentstatus: req.body.paymentstatus,
                description: req.body.description,
                status: req.body.status,
                created_at: date,
                updated_at: "",
                deleted_at: ""
            }
            connection.query(`INSERT INTO ${table_name} SET ?`, post, (error, results, field) => {
                if (error) throw error;
                res.send(results);
            })
        })
    })
});

router.put('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected');
        const date = new Date();
        const pk = req.params.id;
        connection.query(`UPDATE ${table_name} SET date= ?, companyname= ?, location= ?, paymenttype= ?, paymentstatus= ?, description= ?, status= ?, updated_at= ?  WHERE pk= ?`, [req.body.date, req.body.companyname, req.body.location, req.body.paymenttype, req.body.paymentstatus, req.body.description, req.body.status, date, pk], function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });

    })
});

router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const pk = req.params.id;
        connection.query(`DELETE FROM ${table_name} WHERE pk=?`, [pk], function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
    })
})

module.exports = router;