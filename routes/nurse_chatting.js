var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');
var page = require('../lib/page.js');


//데이터 페이지 기본 환자 설정
router.get('/', function(request, response) {
  var title = 'chatting';
  fs.readdir('./data/patients', function(error, filelist){
    var i=0;
    while (i < filelist.length) {
      var id = filelist[i];
      if (id != 'records') {
        response.redirect(`/nurse/chatting/${id}`);
      }
      i += 1;
    }
  });
});

//환자의 건강 상태 차트 및 데이터
router.get('/:patientId', function (request, response) {
    var title = 'chatting';
    fs.readdir('./data/patients', function(error, filelist){                 
      var list = template.list(filelist, request.params.patientId, 'chatting');
      var html = page.nurse_HTML(title, '간호사', list,
        `
        <input type='hidden' id='send_to' value=${request.params.patientId}>
        <div class="vw-100 px-2 bg-light" id="messages">
        </div>
        <div class="vw-100 input-group input-group-lg">
        <input type="text" class="form-control" placeholder="메시지를 입력하세요" id="msg">
        <button class="btn btn-secondary" type="button" id="send-btn">전송</button>
        </div>
        <script src="/socket.io/socket.io.js"></script>
        <script src="/public/js/nurse_chatting.js"></script>
        `
        //화면에 출력할 html body
      );
      response.send(html);
    });
  });

module.exports = router;