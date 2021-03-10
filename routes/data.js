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

    var dt;

    dt = new Date();
    dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();

    var week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var dayOfWeek = week[new Date(dt).getDay()];

    var pdb;

    fs.readFile(`./data/patients/records/blood_${id}`, 'utf8', function(err, user) {
        pdb = JSON.parse(user);
        
    var list = template.list(id, id, title);
    var html = page.HTML(title, id, '',
            `
            <div class="col-md-10">
                <br>
                <div class="col-md-12">
                <h2> Today is ${dayOfWeek} ! </h2>
                    <div id="container" style="width: 100%;">
                        <canvas id="canvas"></canvas>
                    </div>
                    <div "row col-md-12 m-2">
                    <form class="form-inline col-md-12 justify-content-center" action="/edit_process" method="post">

                        <div class="input-group input-group-lg mb-3">
                        <input type="text" placeholder="식전" class="form-control" name="val_before">
                        </div>

                        <div class="input-group input-group-lg mb-3">
                        <input type="text" placeholder="식후" class="form-control" name="val_after">
                        </div>

                        <button class="btn btn-primary" id="addData" type="submit">Edit Data</button>
                    </form>  
                    </div>       
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
                        <tr>
                        <td>  식전 </td>
                        <td> ${pdb.before_mon} </td>
                        <td> ${pdb.before_tue} </td>
                        <td> ${pdb.before_wed} </td>
                        <td> ${pdb.before_thu} </td>
                        <td> ${pdb.before_fri} </td>
                        <td> ${pdb.before_sat} </td>
                        <td> ${pdb.before_sun} </td>
                        </tr>
                        <tr>
                        <td>  식후 </td>
                        <td> ${pdb.after_mon} </td>
                        <td> ${pdb.after_tue} </td>
                        <td> ${pdb.after_wed} </td>
                        <td> ${pdb.after_thu} </td>
                        <td> ${pdb.after_fri} </td>
                        <td> ${pdb.after_sat} </td>
                        <td> ${pdb.after_sun} </td>
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

module.exports = router;