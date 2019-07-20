var express = require('express');
var db = require('../database/db');
var router = express.Router();

router.get('/course/:CODE([A-S]{4}[0-9]{4})', (req, res) => {
    db.query("SELECT * FROM course WHERE code LIKE $1",[req.params.CODE], (err, queryRes) => {
        if (err) {
            throw err;
            res.end();
        } else if (queryRes.rows.length == 0) {
            console.log("query for ${req.params.CODE} does not exist");
            res.send({});
        } else {
            res.send(queryRes.rows[0]);
        }
    });
});

module.exports = router;
