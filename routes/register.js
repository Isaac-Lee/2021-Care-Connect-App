var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

var template = require('../lib/template.js');


router.get('/', function (req, res) {
    
    var title = 'register';
    var html = template.HTML(title,
        `
        <div class="container text-center">
        <div>
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
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">Age</span>
                  <input type="text" class="form-control" name="user_age">
                </div>
                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">당뇨병 유형</span>
                  <input placeholder="1 or 2"  type="text" class="form-control" name="diabetes_type">
                </div>

                <div class="input-group input-group-lg mb-3">
                  <span class="input-group-text">당뇨병 앓은 년수</span>
                  <input type="text" class="form-control" name="diabetes_years">
                </div>


                <button class="btn btn-primary btn-lg" type="submit">완료</button>
            </form> 
        </div>
        </div>
        `,
        ""
    );
    sess = req.session;

    res.send(html);
});


module.exports = router;