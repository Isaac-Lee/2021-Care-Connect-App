var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');
var page = require('../lib/page.js')


//환자 목록 페이지
router.get('/', function (request, response) {
  var title = 'chatting';
  response.redirect(`/chatting/${request.session.userid}`);
});

router.get('/:patientId', function (request, response) {
  var title = 'chatting';
  var id = request.session.userid;
    var html = page.nurse_HTML(title, id, "",
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