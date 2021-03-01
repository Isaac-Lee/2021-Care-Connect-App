var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');
var page = require('../lib/page.js')

var listRouter = require('./nurse_list');
router.use('/list', listRouter);

//환자 목록 페이지
router.get('/', function(request, response) {
  var title = 'data';
  var id = request.session.user_id;
  response.redirect("/nurse/list")
});

module.exports = router;