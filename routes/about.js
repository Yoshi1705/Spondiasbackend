const express = require('express');

const pool = require('./../config/db.config');
const upload = require('./../config/multer');

const router = express.Router();

const table_name = 'about_details';

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

router.post('/', upload.single('image'), (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected');
        const date = new Date();
        connection.query(`SELECT MAX(id) FROM ${table_name}`, (e, results, field) => {
            const new_id = +results[0]['MAX(id)'] + 1
            connection.query(`SELECT MAX(randomId) FROM ${table_name}`, (error, results, field) => {
                if (error) throw error;
                const invoice = results[0]['MAX(randomId)'];
                const randomId = invoice.slice(0, 6) + genRandomId(4);
                var post = {
                    id: new_id,
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file.filename,
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
    })
});

router.put('/:id', upload.single('image'), (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('connected');
        const date = new Date();
        const id = req.params.id;
        connection.query(`UPDATE ${table_name} SET name= ?, description= ?, image= ?, status= ?, updated_at= ?  WHERE id= ?`, [req.body.name, req.body.description, req.file.filename, req.body.status, date, id], function (error, results, fields) {
            if (error) throw error;
            res.send(results);
        });

    })
});

router.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) {
            res.send(err)
        } else {
            const id = req.params.id;
            connection.query(`DELETE FROM ${table_name} WHERE id=?`, [id], function (error, results, fields) {
                if (error) throw error;
                res.send(results);
            })
        }
    })
})

module.exports = router;