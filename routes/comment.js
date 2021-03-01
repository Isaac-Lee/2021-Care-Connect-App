var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
router.use(express.static('public'));
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');
var page = require('../lib/page.js')

//db 설정
var mysql = require('mysql');
var db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"001023",
    database:"care_connect",
    port:3306
});

//코멘트 페이지 기본 환자 설정
router.get('/', function(request, response) {
    var title = 'data';
    var id = 1;
    var date = new Date();
    var year = 2020;
    var month = 11;
    var day = 1;
    db.query(`SELECT * FROM patient`, function(error, patients) {
        response.redirect(`/comment/${patients[0].name}/${year}-${month}-${day}`);
    })
});

//환자 페이지 기본 날짜 설정
router.get('/:patientId', function (request, response) {
    var title = 'data';
    var id = 1;
    var date = new Date();
    var year = 2020;
    var month = 11;
    var day = 1;
    response.redirect(`/comment/${request.params.patientId}/${year}-${month}-${day}`);
})

//주간 환자 상태 체크 코멘트
router.get('/:patientId/:date', function (request, response) {
    var title = 'comment';
    var id = 1;
    var comment_box;
    var year = 2020;
    var month = 11;
    var day = 1;
    var comment_input =
    `
    <div class="container" style="text-align: center;">
        <form action="../comment_process" method="post">
            <input type="hidden" class="form-control" name="name" value=asd>
            <input type="hidden" class="form-control" name="year" value=${year}>
            <input type="hidden" class="form-control" name="month" value=${month}>
            <input type="hidden" class="form-control" name="day" value=${day}>
            <br><input type="text" class="form-control" name="comment" placeholder="Comment">
            <br><button class="btn btn-primary">등록</button>
        </form>
    </div>
    `;
    console.log(`SELECT comment FROM comment_${year}_${month} WHERE name='${request.params.patientId}' AND day='${day}'`);
    db.query(`SELECT comment FROM comment_${year}_${month} WHERE name='${request.params.patientId}' AND day='${day}'`, function(error, comment) {
        if(comment.length == 0){    //코멘트가 없을 경우
            comment_box = `
            <div class="card">
                <div class="card-body">
                    코멘트가 없습니다
                </div>
            </div>
            `;
        }else{                      //코멘트가 있을 경우
            comment_box = template.comment(comment);
        }
    });
    db.query(`SELECT * FROM patient`, function(error, patients) {
        var list = template.list(patients, request.params.patientId, title);
        var html = page.HTML(title, id, list,
            `
            <div class="col-md-10">
                <br>
                <div class="calendar"></div>
                <script src="../js/calendar.js"></script>
                ${comment_box}
                ${comment_input}
            </div>
            `
            //화면에 출력할 html body
        );
        response.send(html);
    });
});

router.post('/comment_process', function (req, res) {  
    //코멘트 등록
    console.log(req.body.comment);
    var sql = `INSERT INTO comment_${req.body.year}_${req.body.month} VALUES(?,?,?)`
    var param = [req.body.name,req.body.day,req.body.comment];
    db.query(sql, param, function(err, rows) {
        if (err){
            console.log(err);
        }
        else{
            console.log(rows.insertId);
            res.redirect(`/comment/${req.body.name}/${req.body.year}-${req.body.month}-${req.body.day}`);
        }
    });
});

module.exports = router;