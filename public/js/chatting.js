var sendBtn = document.getElementById('send-btn');
var msg = document.getElementById('msg');
var msgDiv = document.getElementById('messages');

const socket = io();

sendBtn.addEventListener('click', function() {
  socket.emit('chat messege', msg.value);
  socket.on('chat messege', (msg) => {
    var msgLi = document.createElement('li');
    msgLi.appendChild(document.createTextNode(msg));
    msgDiv.append(msgLi);
  });
});