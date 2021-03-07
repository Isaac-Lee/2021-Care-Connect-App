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
  fs.readdir('./data/patients', function(error, filelist){
    var i=0;
    while (i < filelist.length) {
      var id = filelist[i];
      if (id != 'records') {
        response.redirect(`/nurse/comment/${id}`);
      }
      i += 1;
    }
  });
});

router.get('/:patientId', function (request, response) {
  
});

router.post('/comment_process', function (req, res) {  

});

module.exports = router;