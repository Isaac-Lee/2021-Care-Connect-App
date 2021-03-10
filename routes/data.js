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
    var title = 'data';
    var id = request.session.userid;

    response.redirect(`/data/${id}`);
});

//환자의 건강 상태 차트 및 데이터
router.get('/:patientId', function (request, response) {
    var title = 'data';
    var id = request.session.userid;

    var pdb;

    fs.readFile(`./data/patients/records/blood_${id}`, 'utf8', function(err, user) {
        pdb = JSON.parse(user);
        
        var data_list = template.data_list(pdb);
        var html = page.HTML(title, id, '',
            `
            <div class="col-md-10">
                <br>
                <div class="col-md-12">
                    <div id="container" style="width: 100%;">
                        <canvas id="canvas"></canvas>
                    </div>
                    <button class="btn btn-primary" id="addData">추가</button>
                    <button class="btn btn-primary" id="removeData">수정</button>
                    <script src="/chart/Chart.js"></script>
                </div>
                <br>
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">type</th>
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
                          ${data_list}
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

module.exports = router;