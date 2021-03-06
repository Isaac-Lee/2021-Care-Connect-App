//express.js를 사용하여 back-end 구현
var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

//제작한 router 호출
var indexRouter = require('./routes/index');
var dataRouter = require('./routes/data');
var commentRouter = require('./routes/comment');
var chattingRouter = require('./routes/chatting');
var registerRouter = require('./routes/register');
var nurseRouter = require('./routes/nurse');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(helmet({
  contestSecurityPolicy: false
}));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true}));


//필요한 주요 페이지 4개
app.use('/', indexRouter);
app.use('/data', dataRouter);
app.use('/comment', commentRouter);
app.use('/chatting', chattingRouter);
app.use('/register', registerRouter);
app.use('/nurse', nurseRouter);

//bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/chart', express.static(__dirname + '/node_modules/chart.js/dist'));

app.use('/public', express.static(__dirname + '/public'));

//예외처리
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

/*app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});*/


// socket.io 관련된 부분
app.io = require('socket.io')();

var name_id_match = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('user_connect', (data)=> {
    console.log(data.name + ' logged in. id: ' + socket.id);
    name_id_match[data.name] = socket.id;
    console.log(name_id_match);
  });
  socket.on('sendMessage', (data) => {
    console.log(data);
    io.to(name_id_match['간호사']).emit('updateMessage', data);
  });
  socket.on('nurse_sendMessage', (data) => {
    console.log(data);
    io.to(name_id_match[data.sendto]).emit('updateMessage', data);
  });
  socket.on('disconnect', () => {
  console.log('user disconnected');
  });
});

server.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});