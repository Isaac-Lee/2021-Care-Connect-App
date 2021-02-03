var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');
var page = require('../lib/page.js');

//db 설정
var mysql = require('mysql');
var db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"3412",
    database:"care_connect",
    port:3306
});

//데이터 페이지 기본 환자 설정
router.get('/', function(request, response) {
    var title = 'data';
    var id = request.session.user_id;
    db.query(`SELECT * FROM patient`, function(error, patients) {
        response.redirect(`/data/${patients[0].name}`);
    })
});

//환자의 건강 상태 차트 및 데이터
router.get('/:patientId', function (request, response) {
    var title = 'data';
    var id = request.session.user_id;
    var patient_data_after;
    var patient_data_before;
    var sql = `SELECT * FROM blood_sugar_before WHERE name='${request.params.patientId}'`;
    db.query(sql, function(error, patient) {
        patient_data_before = template.data_list(patient, "공복혈당");
    });
    sql = `SELECT * FROM blood_sugar_after WHERE name='${request.params.patientId}'`;
    db.query(sql, function(error, patient) {
        patient_data_after = template.data_list(patient, "식후혈당");
    });
    sql = `SELECT * FROM patient`;
    db.query(sql, function(error, patients) {
        var list = template.list(patients, request.params.patientId, title);
        var html = page.HTML(title, id, list,
            `
            <div class="col-md-10">
                <br>
                <div class="col-md-12">
                    <div id="container" style="width: 100%;">
                        <canvas id="canvas"></canvas>
                    </div>
                    <button class="btn btn-primary" id="addData">Add Data</button>
                    <button class="btn btn-primary" id="removeData">Remove Data</button>
                    <script src="/chart/Chart.js"></script>
                </div>
                <br>
                <div class="col-md-12">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">JAN</th>
                                <th scope="col">FEB</th>
                                <th scope="col">MAR</th>
                                <th scope="col">APR</th>
                                <th scope="col">MAY</th>
                                <th scope="col">JUN</th>
                                <th scope="col">JUL</th>
                                <th scope="col">AUG</th>
                                <th scope="col">SEP</th>
                                <th scope="col">OCT</th>
                                <th scope="col">NOV</th>
                                <th scope="col">DEC</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${patient_data_before}
                            ${patient_data_after}
                        </tbody>
                    </table>
                </div>
            </div>
            <script src="../js/utils.js"></script>
            <script src="../js/chart.js"></script>
            `
            //화면에 출력할 html body
        );
        response.send(html);
    });
});

module.exports = router;