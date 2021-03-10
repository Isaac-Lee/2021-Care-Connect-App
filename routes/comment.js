var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');
var page = require('../lib/page.js');
const { err } = require('dialog');

router.get('/', function (request, response) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + String(month);
  }
  if (day < 10) {
    day = "0" + String(day);
  }
  var id = request.session.userid;
  response.redirect(`/comment/${id}/${year}-${month}-${day}`);
});

router.get('/:patientId', function (request, response) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  if (month < 10) {
    month = "0" + String(month);
  }
  if (day < 10) {
    day = "0" + String(day);
  }
  response.redirect(`/comment/${request.params.patientId}/${year}-${month}-${day}`);
});

router.get('/:patientId/:date', function (request, response) {  
  var title = 'comment';
  var comment_box;
  var year = request.params.date.split('-')[0];
  var month = request.params.date.split('-')[1];
  var day = request.params.date.split('-')[2];
  
  fs.readFile(`data/patients/comment/${request.params.patientId}-${year}-${month}-${day}`, function(error, comments){
    var comment = '';
    if (error) {
      comment_box = `
      <div class="card">
          <div class="card-body">
              코멘트가 없습니다
          </div>
      </div>
      `;
    } else {
      comment = JSON.parse(comments);
      comment_box = template.comment(comment);
    }
    var html = page.HTML(title, '간호사', '',
          `
          <div class="col-md-10">
              <br>
              <div class="calendar"></div>
              <script src="/public/js/calendar.js"></script>
              ${comment_box}
          </div>
          `
          //화면에 출력할 html body
      );
    response.send(html);
  });
});

module.exports = router;