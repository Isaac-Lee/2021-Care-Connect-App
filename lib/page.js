var template = require('./template.js');

module.exports = {
    HTML: function (title, id, list, body) {
        var html = 
        `
        <nav class="vw-100 navbar navbar-expand-lg navbar-light bg-light">
            <img class="w-25" src="../images/logo/main_logo.png" alt="">
            <span class="navbar-text h2" id="user_name">
              ${id}
            </span>
        </nav>
        `;
        var css = '';
        if(title == 'data'){
            html +=
            `
            <ul class="nav nav-tabs justify-content-center mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="/data">건강 데이터</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/comment">간호사 코멘트</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/chatting">채팅</a>
                </li>
            </ul>
            `
        }
        else if(title == 'comment'){
            html +=
            `
            <ul class="nav nav-tabs justify-content-center mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/data">건강 데이터</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/comment">간호사 코멘트</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/chatting">채팅</a>
                </li>
            </ul>
            `
            css += '<link rel="stylesheet" href="/public/css/calendar.css">'
        }
        else if(title == 'chatting'){
          html +=
          `
          <ul class="nav nav-tabs justify-content-center mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/data">건강 데이터</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/comment">간호사 코멘트</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="/chatting">채팅</a>
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
    }, nurse_HTML: function (title, id, list, body) {
      var html = 
      `
      <nav class="vw-100 navbar navbar-expand-lg navbar-light bg-light">
          <img class="w-25" src="http://localhost:3000/images/logo/main_logo.png" alt="">
          <span class="navbar-text h2" id="user_name">
            ${id}
          </span>
      </nav>
      `;
      var css = '';
      if(title == 'list'){
          html +=
          `
          <ul class="nav nav-tabs justify-content-center mr-auto">
              <li class="nav-item active">
                  <a class="nav-link" href="/nurse/list">환자 목록</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/data">환자 데이터</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/comment">코멘트</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/chatting">채팅</a>
              </li>
          </ul>
          `
    }
    else if(title == 'data'){
          html +=
          `
          <ul class="nav nav-tabs justify-content-center mr-auto">
              <li class="nav-item active">
                  <a class="nav-link" href="/nurse/list">환자 목록</a>
              </li>
              <li class="nav-item active">
                  <a class="nav-link" href="/nurse/data">환자 데이터</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/comment">코멘트</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/chatting">채팅</a>
              </li>
          </ul>
          `
      }
      else if(title == 'comment'){
          html +=
          `
          <ul class="nav nav-tabs justify-content-center mr-auto">
              <li class="nav-item active">
                  <a class="nav-link" href="/nurse/list">환자 목록</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/data">환자 데이터</a>
              </li>
              <li class="nav-item active">
                  <a class="nav-link" href="/nurse/comment">코멘트</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/chatting">채팅</a>
              </li>
          </ul>
          `
          css += '<link rel="stylesheet" href="/public/css/calendar.css">'
      }
      else if(title == 'chatting'){
        html +=
        `
        <ul class="nav nav-tabs justify-content-center mr-auto">
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/list">환자 목록</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/data">환자 데이터</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="/nurse/comment">코멘트</a>
              </li>
              <li class="nav-item active">
                  <a class="nav-link" href="/nurse/chatting">채팅</a>
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