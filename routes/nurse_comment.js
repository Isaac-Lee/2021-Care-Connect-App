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
  var title = 'comment';
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  fs.readdir('./data/patients', function(error, filelist){
    var i=0;
    while (i < filelist.length) {
      var id = filelist[i];
      if (id != 'records') {
        response.redirect(`/nurse/comment/${id}/${year}-${month}-${day}`);
      }
      i += 1;
    }
  });
});

router.get('/:patientId', function (request, response) {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  response.redirect(`/nurse/comment/${request.params.patientId}/${year}-${month}-${day}`);
});

router.post('/:patientId/:date', function (req, res) {  
  var title = 'comment';
  var id = request.session.user_id;
  var comment_box;
  var year = request.params.date.split('-')[0];
  var month = request.params.date.split('-')[1];
  var day = request.params.date.split('-')[2];
  var comment_input =
  `
  <div class="container" style="text-align: center;">
      <form action="../comment_process" method="post">
          <input type="hidden" class="form-control" name="name" value=${request.params.patientId}>
          <input type="hidden" class="form-control" name="year" value=${year}>
          <input type="hidden" class="form-control" name="month" value=${month}>
          <input type="hidden" class="form-control" name="day" value=${day}>
          <br><input type="text" class="form-control" name="comment" placeholder="Comment">
          <br><button class="btn btn-primary">등록</button>
      </form>
  </div>
  `;
  // TODO 코멘트 부분은 수정해야함
  var comment = "";

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

router.post('/comment_process', function (req, res) {  
  //코멘트 등록
  
});

module.exports = router;