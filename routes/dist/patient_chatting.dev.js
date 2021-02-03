"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var fs = require('fs');

var sanitizeHtml = require('sanitize-html'); //template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성


var template = require('../lib/template.js');

var page = require('../lib/page.js'); //db 설정


var mysql = require('mysql');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "3412",
  database: "care_connect",
  port: 3306
}); //환자 목록 페이지

router.get('/', function (request, response) {
  var title = 'data';
  var id = request.session.user_id;
  db.query("SELECT * FROM patient", function (error, patients) {
    response.redirect("/chatting/".concat(patients[0].name));
  });
});
router.get('/:patientId', function (request, response) {
  var title = 'chatting';
  var id = request.session.user_id;
  sql = "SELECT * FROM patient";
  db.query(sql, function (error, patients) {
    var list = template.list(patients, request.params.patientId, title);
    var html = page.HTML(title, id, list, "\n          <div id=\"chetting-box\" class=\"col\">\n            <div class=\"container\">\n              <div class=\"row w-100 bg-light float-right\" style=\"height: 500px;\"></div>\n              <div class=\"row float-right\">\n                <input class=\"float-right\" type='text' size=\"80\" placeholder=\"\uBA54\uC2DC\uC9C0\uB97C \uC785\uB825\uD558\uC138\uC694\">\n                <button class='btn btn-secondary float-right'>\uC804\uC1A1</button>\n              </div>\n            </div>\n          </div>\n          " //화면에 출력할 html body
    );
    response.send(html);
  });
});
module.exports = router;