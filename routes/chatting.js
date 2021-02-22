var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
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

//환자 목록 페이지
router.get('/', function (request, response) {
  var title = 'data';
  var id = request.session.user_id;
  db.query(`SELECT * FROM users`, function(error, patients) {
      response.redirect(`/chatting/${patients[0].name}`);
  })
});

router.get('/:patientId', function (request, response) {
  var title = 'chatting';
  var id = request.session.user_id;
  sql = `SELECT * FROM users`;
  db.query(sql, function(error, patients) {
      var list = template.list(patients, request.params.patientId, title);
      var html = page.HTML(title, id, "",
          `
          <div class="vw-100 px-2 bg-light" id="messages">
          </div>
          <div class="vw-100 input-group input-group-lg">
          <input type="text" class="form-control" placeholder="메시지를 입력하세요" id="msg">
          <button class="btn btn-secondary" type="button" id="send-btn">전송</button>
          </div>
          <script src="/socket.io/socket.io.js"></script>
          <script src="/public/js/chatting.js"></script>
          `
          //화면에 출력할 html body
      );
      response.send(html);
  });
});

module.exports = router;