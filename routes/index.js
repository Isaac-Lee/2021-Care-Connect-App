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
    password:"3412",
    database:"care_connect",
    port:3306
});

//간호사 인증용 로그인 페이지
router.get('/', function (req, res) {
    
    
    var title = 'index';
    var html = template.HTML(title,
        `
        <div class="container text-center">
            <form class action="/login_process" method="post">
                <p><img class="w-50" src="./images/logo/케어커넥트 로고 기본.jpg"></p>
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">E-mail</span>
                  <input type="email" class="form-control" name="user_id">
                </div>
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">Password</span>
                  <input type="password" class="form-control" name="user_pwd">
                </div>
                <button class="btn btn-primary btn-lg">로그인</button>
            </form>
        </div>
        `
        //화면에 출력할 html body
    );
    sess = req.session;

    res.send(html);
});

// 로그인
router.post('/login_process', function(req, res){  
    console.log(req.body);
    var id = req.body.user_id;
    var password = req.body.user_pwd;
    // db.query('SELECT * FROM users WHERE email = ?', [id],
    // function( error, results, fields) {
    //     if (error) {
    //         // console.log("error ocurred", error);
    //         res.send({
    //             "code": 400,
    //             "failed": "error ocurred"
    //         })
    //     } else {
    //         // console.log('The solution is: ', results);
    //         if(results.length > 0) {
    //             if(results[0].password == password) {
    //                 req.session.logined = true;
    //                 req.session.user_id = id;
    //                 res.redirect("/chatting");
    //             } else {
    //                 res.send({
    //                     "code": 204,
    //                     "success": "Email and password does not match"
    //                 });
    //             }
    //         } else {
    //             res.send({
    //                 "code":204,
    //                 "success": "Email does not exists"
    //             });
    //         }
    //     }    
    // }) 

    // 디자인 작업 할동안 바로바로 리다이렉션
    res.redirect("/chatting");
});

module.exports = router;