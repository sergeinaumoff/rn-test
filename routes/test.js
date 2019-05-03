var express = require('express');
var router = express.Router();


/* (адрес запроса, функция) */
router.get('/', function(req, res, next) {

        var list = require('../data/proff' + req.query.select + '.json');

        var countTickets = Object.keys(list).length;

        var rndNum = Math.floor(Math.random() * (countTickets - 1) + 1);


        res.render('test', {
            name: req.query.inputName,
            position: req.query.inputPosition,
            profa: list.title,
            profNum:req.query.select,
            ticket: list['ticket' + rndNum]
        });

});



module.exports = router;
