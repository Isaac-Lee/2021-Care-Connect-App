var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');

//db 설정
var mysql = require('mysql');
var db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"", ///
    database:"care_connect",
    port:3306
});

router.get('/', function (req, res) {
    
    
    var title = 'index';
    var html = template.HTML(title,
        `
        <div class="container text-center">
            <form class action="/login_process" method="post">
                <p><img class="w-50" src="./images/logo/케어커넥트 로고 기본.jpg"></p>
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">Id</span>
                  <input type="text" class="form-control" name="user_id">
                </div>
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">Password</span>
                  <input type="password" class="form-control" name="user_pwd">
                </div>
                <button class="btn btn-primary btn-lg">로그인</button>
            </form>
            <form action="/register_btn" method="post">
            <button class="btn btn-primary btn-lg">회원가입</button>
            </form>
        </div>
        `
        //화면에 출력할 html body
    );
    sess = req.session;

    res.send(html);
});

// 회원가입
router.post('/register_btn', function(req, res){  
    res.redirect("/register");  
});

// 로그인
router.post('/login_process', function(req, res){  
    console.log(req.body);
    var id = req.body.user_id;
    var password = req.body.user_pwd;
    db.query('SELECT * FROM users WHERE id = ?', [id],
    function( error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if(results.length > 0) {
                if(results[0].password == password) {
                    req.session.logined = true;
                    req.session.user_id = id;
                    console.log('test!');
                    
                    res.redirect("/"); //이동할 페이지 redirect
                } else {
                    res.send({
                        "code": 204,
                        "success": "id and password does not match"
                    });
                }
            } else {
                res.send({
                    "code":204,
                    "success": "id does not exists"
                });
            }
        }    
    }) 

    // res.redirect("/");
});


//회원가입
router.post('/register_process', function(req, res){  
    console.log(req.body);
    var id = req.body.user_id;
    var password = req.body.user_pwd;
    var name = req.body.user_name;

        var body = req.body;
        console.log(body);

        db.query('SELECT * FROM users WHERE id = ?', [id],
        function( error, results, fields) {
            if (error) {
                console.log("error ocurred", error);
                res.send({
                    "code": 400,
                    "failed": "error ocurred"
                })
            } else {
                if(results.length > 0) {
                        console.log('ID가 이미 존재하는 case!');
                        res.redirect("/register"); // 추후 중복 체크 버튼으로 대체 예정
                }
            }    
        }) 

        // ID가 존재하지 않을 경우, 가입 가능
        db.query('INSERT INTO users VALUES(?, ?, ?)', [id, name, password],
        function( error, results, fields) {
            if(error){ 
                console.log('query is not excuted. insert fail...\n' + error);
            }
            else{
                //각 환자별 데이터 차트 테이블 생성 쿼리
                // db.query('CREATE TABLE test(dd varchar(20) primary key not null)');
               res.redirect('/'); 
            }    
        }); 
});

module.exports = router;