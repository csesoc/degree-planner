var express = require('express');
var db = require('../database/db');
var router = express.Router();
const bodyParser = require('body-parser');
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

/* 
 *  Get all degree objects
 * 
 *  Example return:
 *  {
 *    "degrees": [
 *      {
 *        "programid": 3707,
 *        "name": "Bachelor of Engineering (Honours)",
 *        "major": "Software Engineering",
 *        "minor": ""
 *      },
 *      {
 *        ...
 *      }
 *    ]
 *  }
 */

router.get('/degrees', (req, res) => {
    console.log("Degrees api call");
    db.query("SELECT * FROM programs", (err, queryRes) => {
        if (err) {
            throw err;
            res.end();
        } else if (queryRes.rows.length == 0) {
            console.log("query for degrees does not exist");
            res.send({});
        } else {
            res.json({
                "degrees": queryRes.rows
            });
        }
    });
  });  

/* 
 *  Returns all course objects related to a query
 *  
 *  Example return:
 *  {
 *      "courses": [
 *          {
 *              "code": "COMP1511",
 *              "name": "course full name here",
 *              "description": "course desc here",
 *              "offering": T1
 *              ...
 *          },
 *          {
 *              ...
 *          }
 *      ]
 *  }
*/
router.post('/courses', (req, res) => {
    console.log("Courses api call");
    let majorName = ((req.body.major) ? req.body.major : "");
    let minorName = ((req.body.minor) ? req.body.minor : "");

    let courses = [];
    let courseData = [];

    db.query("SELECT courses FROM majors WHERE lower(name) LIKE %$1%", majorName.toLowerCase(),  (err, queryRes) => {
        if (err) {
            throw err;
            res.end();
        } else if (queryRes.rows.length == 0) {
            console.log("query for courses does not exist");
            res.send({});
        } else {
            for (let i = 0; i < queryRes.rows.length; i++) {
                courses.push(queryRes.rows[i].split(",").split("|"))
            }
        }
    });

    db.query("SELECT courses FROM minors WHERE lower(name) LIKE %$1%", minorName.toLowerCase(),  (err, queryRes) => {
        if (err) {
            throw err;
            res.end();
        } else if (queryRes.rows.length == 0) {
            console.log("query for courses does not exist");
            res.send({});
        } else {
            for (let i = 0; i < queryRes.rows.length; i++) {
                courses.push(queryRes.rows[i].split(",").split("|"));
            }
        }
    });
    
    // Returning the output

    for (let i = 0; i < courses.length; i++) {
        db.query("SELECT * FROM courses WHERE code = $1", course[i],  (err, queryRes) => {
            if (err) {
                throw err;
                res.end();
            } else if (queryRes.rows.length == 0) {
                courseData.push(course[i]);
            } else {
                courseData.push(queryRes.rows);
            }
        });
    }

    res.json ({
        "courses": courseData
    });
});

module.exports = router;
