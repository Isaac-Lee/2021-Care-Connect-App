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