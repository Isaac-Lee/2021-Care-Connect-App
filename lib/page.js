var template = require('./template.js');

module.exports = {
    HTML: function (title, id, list, body) {
        var html = 
        `
        <nav class="vw-100 navbar navbar-expand-lg navbar-light bg-light">
            <a class="w-25 navbar-brand" href="/chatting">
            <img class="w-100" src="../images/logo/케어커넥트 로고 기본.png" alt="">
            </a>
            <span class="navbar-text h2">
              ${id}
            </span>
        </nav>
        `;
        var css = '';
        if(title == 'data'){
            html +=
            `
            <ul class="nav nav-tabs justify-content-center mr-auto">
              <li class="nav-item">
                  <a class="nav-link active" href="/data"><span class="mb-0 h1">건강 상태 데이터</span></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/comment"><span class="mb-0 h1">간호사 코멘트</span></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/chatting"><span class="mb-0 h1">간호사 채팅</span></a>
              </li>
            </ul>
            `
        }
        else if(title == 'comment'){
            html +=
            `
            <ul class="nav nav-tabs justify-content-center mr-auto">
              <li class="nav-item">
                  <a class="nav-link" href="/data"><span class="mb-0 h1">건강 상태 데이터</span></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link active" href="/comment"><span class="mb-0 h1">간호사 코멘트</span></a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/chatting"><span class="mb-0 h1">간호사 채팅</span></a>
              </li>
            </ul>
            `
            css += '<link rel="stylesheet" href="/public/css/calendar.css">'
        }
        else if(title == 'chatting'){
          html +=
          `
          <ul class="nav nav-tabs justify-content-center">
          <li class="nav-item">
                <a class="nav-link" href="/data"><span class="mb-0 h1">건강 상태 데이터</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/comment"><span class="mb-0 h1">간호사 코멘트</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="/chatting"><span class="mb-0 h1">간호사 채팅</span></a>
            </li>
          </ul>
          `
          css += '<link rel="stylesheet" href="/public/css/chatting.css">'
      }
        html +=
        `
        <div class="row m-0" id="content">
            ${list}
            ${body}
        </div>
        `
        return template.HTML(title, html, css);
    }
    
}