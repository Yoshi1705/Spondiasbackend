const express = require('express');
const pool = require('./../config/db.config');

const router = express.Router();

const table_name = 'item_tab';

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected');
        connection.query(`SELECT * FROM ${table_name}`, (error, rows) => {
            connection.release();
            if (!error) {
                res.send(rows);
            } else {
                res.send(error)
            }
        })
    })
});

// Doubt with fk
router.post('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const date = new Date();
        connection.query(`SELECT MAX(randomId) FROM ${table_name}`, (error, results, field) => {
            if (error) throw error;
            const invoice = results[0]['MAX(randomId)'];
            const randomId = invoice.slice(0, 6) + genRandomId(4);
            var post = {
                itemno: req.body.itemno,
                itemname: req.body.itemname,
                price: req.body.price,
                address: req.body.address,
                created_at: date,
                updated_at: "",
                randomId: randomId,
                status: req.body.status
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
        const id = req.params.id;
        connection.query(`UPDATE ${table_name} SET email= ?, contact_no= ?, address= ?, status= ?, updated_at= ?  WHERE id= ?`, [req.body.email, req.body.contact_no, req.body.address, req.body.status, date, id], function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });

    })
});

router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        const id = req.params.id;
        connection.query(`DELETE FROM ${table_name} WHERE id=?`, [id], function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        })
    })
})

module.exports = router;