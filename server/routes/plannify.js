var express = require('express');
var db = require('../database/db');
var router = express.Router();
const bodyParser = require('body-parser');
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Converts a string into a string that allows for a more forgiving SQL search
function searchConversion(searchTerm) {
    return "%" + searchTerm + "%"
}

/* 
 *  Gets a course based on a query
 * 
 *  Example return:
 *  {
 *    "code": "COMP1511",
 *    ...
 *  }
 */

router.get('/course/:CODE([A-Z]{4}[0-9]{4})', (req, res) => {
    db.query("SELECT * FROM courses WHERE code LIKE $1",[req.params.CODE], (err, queryRes) => {
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
    let majorName = req.body["majorName"].toLowerCase();
    let minorName = req.body["minorName"].toLowerCase();
    
    let courses = [];
    let courseData = [];

    if (majorName.length) {
        db.query("SELECT courses FROM majors WHERE lower(name) LIKE $1", [searchConversion(majorName)], (err, queryRes) => {
            if (err) {
                throw err;
                res.end();
            } else if (queryRes.rows.length == 0) {
                console.log("query for major courses does not exist");
            } else {
                for (let i = 0; i < queryRes.rows.length; i++) {
                    let coursesTemp = queryRes.rows[i]["courses"].split(/[,|\s]+/);
                    for (let j = 0; j < coursesTemp.length; j++) {
                        if (courses.indexOf(coursesTemp[j]) == -1) {
                            courses.push(coursesTemp[j]);
                        } else {
                            continue;
                        }
                    }
                }
            }
        });
    }

    if (minorName.length) {
        db.query("SELECT courses FROM minors WHERE lower(name) LIKE $1", [searchConversion(minorName)], (err, queryRes) => {
            if (err) {
                throw err;
                res.end();
            } else if (queryRes.rows.length == 0) {
                console.log("query for minor courses does not exist");
            } else {
                for (let i = 0; i < queryRes.rows.length; i++) {
                    let coursesTemp = queryRes.rows[i]["courses"].split(/[,|\s]+/);
                    for (let j = 0; j < coursesTemp.length; j++) {
                        if (courses.indexOf(coursesTemp[j]) == -1) {
                            courses.push(coursesTemp[j]);
                        } else {
                            continue;
                        }
                    }
                }
            }
        });
    }
    
    // Returning the output
    setTimeout(function(){
        for (let i = 0; i < courses.length; i++) {
            db.query("SELECT * FROM pathways_courses WHERE code LIKE $1", [searchConversion(courses[i])], (err, queryRes) => {
                if (err) {
                    throw err;
                    res.end();
                } else if (queryRes.rows.length == 0) {
                    courseData.push(courses[i]);
                } else {
                    courseData.push(queryRes.rows[0]);
                }
            });
        }
    }, 5000);
    
    setTimeout(function(){
        res.json ({
            "courses": courseData   
        });
    }, 10000);
});

module.exports = router;
