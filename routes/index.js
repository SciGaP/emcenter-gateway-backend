var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/curl-script', function (req, res, next) {
    res.set({"content-disposition": "attachment; filename=\"emc-curl-script.sh\""});
    res.send(
        `
# TODO
        `
    );
});

module.exports = router;
