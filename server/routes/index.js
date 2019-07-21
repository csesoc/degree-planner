var express = require('express');
var router = express.Router();

router.get('/get-data', function(req, res, next) {
  res.json({ data: "swag" });
});

module.exports = router;
