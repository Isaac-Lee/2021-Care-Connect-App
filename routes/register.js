var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

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
    
    var title = 'register';
    var html = template.HTML(title,
        `
        <div class="container text-center">
            <form class action="/register_process" method="post">
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">Name</span>
                  <input type="text" class="form-control" name="user_name">
                </div>
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">Id</span>
                  <input type="text" placeholder="영문과 숫자를 조합해서 작성해주세여" class="form-control" name="user_id">
                </div>
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">Password</span>
                  <input type="password" class="form-control" name="user_pwd">
                </div>

                <button class="btn btn-primary btn-lg" type="submit">완료</button>
            </form> 
        </div>
        `,
        ""
    );
    sess = req.session;

    res.send(html);
});


module.exports = router;