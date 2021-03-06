var sendBtn = document.getElementById('send-btn');
var msgTxt = document.getElementById('msg');
var msgDiv = document.getElementById('messages');
var userName = document.getElementById('user_name');
var sendTo = document.getElementById('send_to');

var socket = io();

window.onload = function() {
  var name_id = {name: userName.innerHTML.trim()};
  console.log(name_id);
  socket.emit('user_connect', name_id);
}

sendBtn.addEventListener('click', function() {
  var msg = msgTxt.value;
  if(!msg) return false;
  var data = {message: msg, sendto: sendTo.value, name: '간호사', id: socket.id};
  socket.emit('nurse_sendMessage', data);
  data.name = userName.innerText.trim();
  var chatMessageEl = drawChatMessage(data);
  msgDiv.appendChild(chatMessageEl);
  msgTxt.value = ''; 
});

socket.on('updateMessage', function(data){
  if(data.name === 'SERVER'){
    var info = document.getElementById('info'); 
    info.innerHTML = data.message; setTimeout(() => { 
      info.innerText = '';
    }, 1000);
  } else {
    var chatMessageEl = drawChatMessage(data);
    msgDiv.appendChild(chatMessageEl);
  }
});

// 다른 사용자의 메시지를 사용자의 화면에 출력해주는 부분
function drawChatMessage(data){
  var wrap = document.createElement('p');
  var message = document.createElement('span');
  var name = document.createElement('span');
  name.innerText = data.name + " ";
  message.innerText = data.message;
  name.classList.add('output__user__name');
  message.classList.add('output__user__message');
  wrap.classList.add('input__chat');
  wrap.dataset.id = socket.id;
  wrap.appendChild(name);
  wrap.appendChild(message);
  return wrap; 
}

// 자신의 메시지를 사용자의 화면에 출력해주는 부분
function drawMyChatMessage(data){
  var wrap = document.createElement('p');
  var message = document.createElement('span');
  var name = document.createElement('span');
  name.innerText = " " + data.name;
  message.innerText = data.message;
  name.classList.add('output__user__name');
  message.classList.add('output__user__message');
  wrap.classList.add('user__chat');
  wrap.dataset.id = socket.id;
  wrap.appendChild(message);
  wrap.appendChild(name);
  return wrap; 
}