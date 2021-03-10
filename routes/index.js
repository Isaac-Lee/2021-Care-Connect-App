var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var session = require('express-session');
var sanitizeHtml = require('sanitize-html');
//template 파일을 이용해서 필요한 body값을 넣어주면 공통적인 html 코드를 자동 생성
var template = require('../lib/template.js');


router.get('/', function (req, res) {
    var title = 'index';
    var html = template.HTML(title,
        `
        <div class="layer" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%)">
        <div class="container text-center">
        <p><img class="w-50" src="./images/logo/케어커넥트 로고 기본.jpg"></p>
            <div class="col justify-content-center">
                <form id="frm" class action="/login_process" method="post">
                <div class="input-group input-group-lg mb-3">
                    <span class="input-group-text">Id</span>
                    <input type="text" class="form-control" name="user_id">
                    </div>
                    <div class="input-group input-group-lg mb-3">
                    <span class="input-group-text">Password</span>
                    <input type="password" class="form-control" name="user_pwd">
                    </div>
                    <div style="float:none; margin:0 auto">
                    <button style="width: 100%;" class="btn btn-lg btn-primary">로그인</button>
                    </div>
                    
                </form>
                <div style="float:none; margin-top: 15px;" class="row justify-content-center" >
                    <p style="margin-right: 10px;"> 계정이 존재하지 않으신가요? </p> 
                    <form action="/register_btn" method="post">
                    <button class="btn btn-sm btn-outline-primary">회원가입</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
        `,
        ""
        //화면에 출력할 html body
    );
    sess = req.session;

    res.send(html);
});

// 회원가입
router.post('/register_btn', function(req, res){  
    res.redirect("/register");  
});

// 로그인
router.post('/login_process', function(req, res){  
    var post = req.body;
    var user_id = post.user_id;
    var user_pw = post.user_pwd; 
    var msg = require ('dialog')

    var isExist = false;

    if (user_id == "nurse") {
      req.session.userid = user_id;
      req.session.save(function(){
        console.log(req.session.nickname + " login");
        res.redirect("/nurse");
      });
    } else {
      fs.readdir('./data/patients', function(error, filelist){

        isExist = filelist.includes(user_id);          
        if (!isExist) {
            msg.info('존재하지 않는 아이디입니다.');
            res.redirect('/');
        } else {
          fs.readFile(`./data/patients/${user_id}`, 'utf8', function(err, user) { 
            user = JSON.parse(user);
            if (user.user_pw !== user_pw) {
                msg.info('비밀번호가 틀렸습니다.');
                res.redirect('/');
            }
            else {
              req.session.is_logined = true;
              req.session.userid = user.user_id;
              req.session.pw = user.user_pw;
              req.session.name = user.user_name;
              req.session.age = user.age;

              req.session.save(function(){
                console.log(req.session.nickname + " login");
                res.redirect(`/chatting`);
              });
            }
          });
        }
      });
    }
});


//회원가입
router.post('/register_process', function(req, res){  
    var post = req.body;
    var id = post.user_id;
    var pwd = post.user_pwd;
    var name = post.user_name;
    var age = post.age;
    var type = post.diabetes_type;
    var years = post.diabetes_years;
    var msg = require ('dialog')

    let isExist = false;

    fs.readdir('./data/patients', function(error, filelist){
        isExist = filelist.includes(id);
        if(!isExist){
            var user = {
                "user_id":id,
                "user_name":name,
                "user_pw":pwd,
                "age":age,
                "type":type,
                "years":years
            }
            var init_data = {
                "user_name": name,
                "before_mon":0,
                "before_tue":0,
                "before_wed":0,
                "before_thu":0,
                "before_fri":0,
                "before_sat":0,
                "before_sun":0,
                "after_mon":0,
                "after_tue":0,
                "after_wed":0,
                "after_thu":0,
                "after_fri":0,
                "after_sat":0,
                "after_sun":0
            }

            var content = JSON.stringify(user);
            var content_blood = JSON.stringify(init_data);

            fs.writeFile(`data/patients/${id}`, content, 'utf8', function(error){});
            fs.writeFile(`data/patients/records/blood_${id}`, content_blood, 'utf8', function(error){});
            // fs.writeFile(`data/patients/records/blood_after_${id}`, content_blood, 'utf8', function(error){});

            res.redirect('/');
        }
        else{
            msg.info('ID가 존재합니다.');
            res.redirect('/register')
        }
    });

});


// edit data post
router.post('/edit_process', function(req, res){  
  var post = req.body;
  var id = req.session.userid;
  var before = post.val_before;
  var after = post.val_after;
  var msg = require ('dialog')
  console.log('test', id)
  fs.readFile(`./data/patients/records/blood_${id}`, 'utf8', function(err, user) { 
      user = JSON.parse(user);

      var dt;

      dt = new Date();
      dt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();

      var week = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
      var dayOfWeek = week[new Date(dt).getDay()];
      
      user[`before_${dayOfWeek}`] = before;
      user[`after_${dayOfWeek}`] = after;

      var content = JSON.stringify(user);

      fs.writeFile(`data/patients/records/blood_${id}`, content, 'utf8', function(error){});
      res.redirect('/data');
  });

});

module.exports = router;