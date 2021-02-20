var sendBtn = document.getElementById('send-btn');
var msgTxt = document.getElementById('msg');
var msgDiv = document.getElementById('messages');

var socket = io();

sendBtn.addEventListener('click', function() {
  console.log("send msg");
  var message = msgTxt.value; 
  if(!message) return false;
  socket.emit('sendMessage', { message }); // 소캣에 문자 전송을을 했다는 것을 알림
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

// 메시지를 사용자의 화면에 출력해주는 부분
function drawChatMessage(data){ 
  var wrap = document.createElement('p');
  var message = document.createElement('span'); 
  var name = document.createElement('span'); 
  name.innerText = data.name + " "; 
  message.innerText = data.message; 
  name.classList.add('output__user__name'); 
  message.classList.add('output__user__message'); 
  wrap.classList.add('output__user'); 
  wrap.dataset.id = socket.id; 
  wrap.appendChild(name);
  wrap.appendChild(message);
  return wrap; 
}