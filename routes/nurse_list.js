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
    var title = 'list';
    var id = request.session.userid;
    fs.readdir('./data/patients', function(error, filelist){                 
      var list = template.patient_list(filelist);
      console.log(list);
      var html = page.nurse_HTML(title, id, "",
          `
          <div class="col-md-12">
              <table class="table">
                  <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">환자 아이디</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${list}
                  </tbody>
              </table>
          </div>
          `
          //화면에 출력할 html body
      );
      response.send(html);
    });
});

module.exports = router;