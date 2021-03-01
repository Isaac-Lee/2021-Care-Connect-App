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
    var list = template.patient_list(patients);
        var html = page.HTML(title, id, list,
            `
            <div class="col-md-12">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">이름</th>
                            <th scope="col">나이</th>
                            <th scope="col">병명</th>
                            <th scope="col">정기검사요일</th>
                            <th scope="col">평균 공복 혈당</th>
                            <th scope="col">평균 식후 혈당</th>
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

module.exports = router;