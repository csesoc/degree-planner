var express = require('express');
var router = express.Router();

/*
 * Get list of all courses objects
 * Example return:
 * {
 *   "courses": [
 *     {
 *       "code": "COMP1917",
 *       "name": "Computing 1A",
 *       "desc": "...",
 *       "prereqs": [],
 *       "coreqs": [],
 *       "exclusions": ["ENGG1811"],
 *       "gened": 1,
 *       "outline": "...",
 *       "uoc": 6
 *     },
 *     {
 *       ...
 *     }
 *   ]
 * }
 */
router.get('/courses', function(req, res, next) {
  console.log("courses api call");
  db.query("SELECT * FROM pathways_courses", (err, queryRes) => {
      if (err) {
        throw err;
        res.end();
      } else if (queryRes.rows.length == 0) {
        console.log("query for ${req.params.code} does not exist");  
        res.send({});
      } else {
          res.json({
              "courses": queryRes.rows
          });
      }
  });
});

/*
 * Get all relations to the specified course
 *
 * Example return: 
 * { 
 *   "relations": [
 *     {
 *       "source": "COMP1917",
 *       "destination": "COMP1927",
 *       "type": "prereq"
 *     }, 
 *     {
 *       "source": "COMP1927",
 *       "destination": "COMP2041",
 *       "type": "prereq"
 *     }
 *   ]
 * }
 */
router.get('/relations/:code([A-S]{4}[0-9]{4})', function(req, res, next) {
  console.log("relations api call");
  db.query("SELECT * FROM pathways_relationships WHERE source LIKE $1 OR destination LIKE $1", [req.params.code], (err, queryRes) => {
      if (err) {
        throw err;
        res.end();
      } else if (queryRes.rows.length == 0) {
        console.log("query for ${req.params.code} does not exist");  
        res.send({});
      } else {
          res.json({
              "relations": queryRes.rows
          });
      }
  });
});

module.exports = router;
