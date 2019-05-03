var express = require('express');
var router = express.Router();


/* (адрес запроса, функция) */
router.get('/', function(req, res, next) {

    var list = require('../data/proff' + req.query.profNum + '.json');

    var ticket = list['ticket'+req.query.ticketNum];

    var numCorrect=0; //считаем число правильных ответов

    //массив который пробросим на страницу Результатов
    var arrRes ={};

    for (var i=1;i<Object.keys(ticket).length;i++) {

        var correct = ticket['qustion' + i].valid;   //переменная с правильным ответом

        if (correct === req.query[i]) {
           //console.log("Вы ответили верно! " + ticket['qustion' + i].answers[correct]);
            numCorrect++; //считаем число правильных ответов
        } else {
            arrRes['mistake'+i]={};
            arrRes['mistake'+i].titleQuestion = ticket['qustion' + i].title;
            arrRes['mistake'+i].isGet = 1;
            arrRes['mistake'+i].rightQuestion = ticket['qustion' + i].answers[correct];
            if (req.query[i] == undefined){
                arrRes['mistake'+i].isGet = 0;
            } else {
                arrRes['mistake'+i].userAnswer = ticket['qustion' + i].answers[req.query[i]];
            }
        }
    }

    arrRes.countCorrect =numCorrect;
    arrRes.countQuestions = Object.keys(ticket).length-1;


    //скармливаем объект аррРес в резул
    res.render('result', {
        name:req.query.name,
        position:req.query.position,
        profa:req.query.profa,
        profNum:req.query.profNum,
        ticketNum:req.query.ticketNum,
        res: arrRes
    });

});

module.exports = router;
