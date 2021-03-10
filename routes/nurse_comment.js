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
  fs.readdir('data/patients', function(error, filelist){
    var i=0;
    while (i < filelist.length) {
      var id = filelist[i];
      if (id != 'records' && id != 'comment') {
        response.redirect(`/nurse/comment/${id}/${year}-${month}-${day}`);
      }
      i += 1;
    }
  });
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
  response.redirect(`/nurse/comment/${request.params.patientId}/${year}-${month}-${day}`);
});

router.get('/:patientId/:date', function (request, response) {  
  var title = 'comment';
  var comment_box;
  var year = request.params.date.split('-')[0];
  var month = request.params.date.split('-')[1];
  var day = request.params.date.split('-')[2];
  
  fs.readFile(`data/patients/comment/${request.params.patientId}-${year}-${month}-${day}`, function(error, comments){
    var comment = '';
    var comment_input =
    `
    <div class="container" style="text-align: center;">
        <form action="../comment_process" method="post">
            <input type="hidden" class="form-control" name="patientId" value=${request.params.patientId}>
            <input type="hidden" class="form-control" name="year" value=${year}>
            <input type="hidden" class="form-control" name="month" value=${month}>
            <input type="hidden" class="form-control" name="day" value=${day}>`
    if (error) {
      comment_box = `
      <div class="card">
          <div class="card-body">
              코멘트가 없습니다
          </div>
      </div>
      `;
      comment_input += `
            <br><input type="text" class="form-control" name="comment" placeholder="코멘트를 여기에 작성해주세요."></input>
            <br><button class="btn btn-primary">등록</button>
          </form>
      </div>`
    } else {
      comment = JSON.parse(comments);
      comment_box = template.comment(comment);
      comment_input +=
      `
              <br><input type="text" class="form-control" name="comment" value="${comment.comments}"></input>
              <br><button class="btn btn-primary">수정</button>
          </form>
      </div>
      `;
    }
    fs.readdir('./data/patients', function(error, patients){
      var list = template.list(patients, request.params.patientId, title);
      var html = page.nurse_HTML(title, '간호사', list,
          `
          <div class="col-md-10">
              <br>
              <div class="calendar"></div>
              <script src="/public/js/calendar.js"></script>
              ${comment_box}
              ${comment_input}
          </div>
          `
          //화면에 출력할 html body
      );
    response.send(html);
    });
  });
});

router.post('/comment_process', function (req, res) {
  //코멘트 등록
  var param = {
    'id': req.body.patientId, 
    'year': req.body.year, 
    'month': req.body.month, 
    'day': req.body.day, 
    'comment': req.body.comment
  };
  var content = {
    "comments" : param.comment
  }
  console.log(param.comment);
  var comment = JSON.stringify(content);
  fs.writeFile(`data/patients/comment/${param.id}-${param.year}-${param.month}-${param.day}`, comment, 'utf8', function(error){
    res.redirect(`/nurse/comment/${req.body.name}/${req.body.year}-${req.body.month}-${req.body.day}`);
  });
});

module.exports = router;