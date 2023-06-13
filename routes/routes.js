const express = require('express');

const router = express.Router();

const item_tab_SELECT = 'SELECT * From item_tab';


// router.get('/item-tab', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err;
//         console.log('connected');
//         connection.query('SELECT * From item_tab', (error, rows) => {
//             connection.release();

//             if(!err) {
//                 res.send(rows);
//             } else {
//                 console.log(err);
//             }
//         })
//     })
// });

// router.post('/item-tab', (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err;
//         console.log('connected');
//         connection.query('SELECT * From item_tab', (error, rows) => {
//             connection.release();

//             if(!err) {
//                 res.send(rows);
//             } else {
//                 console.log(err);
//             }
//         })
//     })
// })

module.exports = router;