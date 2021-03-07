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
  var title = 'data';
  fs.readdir('./data/patients', function(error, filelist){
    var i=0;
    while (i < filelist.length) {
      var id = filelist[i];
      if (id != 'records') {
        response.redirect(`/nurse/data/${id}`);
      }
      i += 1;
    }
  });
});

router.get('/:patientId', function (request, response) {
  var title = 'data';
    var id = request.session.userid;
    fs.readFile(`./data/patients/records/blood_${request.params.patientId}`, 'utf8', function(err, user) {
    var pdb = JSON.parse(user);
    fs.readdir('./data/patients', function(error, filelist){
      var list = template.list(filelist, request.params.patientId, 'chatting');
      var html = page.nurse_HTML(title, id, list,
            `
            <div class="col-md-10">
                <br>
                <div class="col-md-12">
                    <div id="container" style="width: 100%;">
                        <canvas id="canvas"></canvas>
                    </div>
                    <script src="/chart/Chart.js"></script>
                </div>
                <br>
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">MON</th>
                                <th scope="col">TUE</th>
                                <th scope="col">WED</th>
                                <th scope="col">THU</th>
                                <th scope="col">FRI</th>
                                <th scope="col">SAT</th>
                                <th scope="col">SUN</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                        <td> 0 </td>
                        <td> ${pdb.before_mon} </td>
                        <td> ${pdb.before_tue} </td>
                        <td> ${pdb.before_wed} </td>
                        <td> ${pdb.before_thu} </td>
                        <td> ${pdb.before_fri} </td>
                        <td> ${pdb.before_sat} </td>
                        <td> ${pdb.before_sun} </td>
                        </tr>
                        </tbody>

                    </table>
                </div>
            </div>
            <script src="/public/js/utils.js"></script>
            <script src="/public/js/chart.js"></script>
            `
            //화면에 출력할 html body
        );
    response.send(html);
    });
    });
});

module.exports = router;