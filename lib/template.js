var fs = require('fs');

module.exports = {
  HTML: function (title, body, css) {
    return `
      <!doctype html>
      <html>
      <head>
        <title>${title}</title>
        <meta charset="utf-8">
        ${css}
        <link rel="stylesheet" href="/css/bootstrap.css">
        <link rel="stylesheet" href="/chart/Chart.min.css">
        <style>
          html,
          body {
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        ${body}
      </body>
      </html>
      `;
  },list: function (filelist, patientId, page) {
    var list = `
    <div class="col-md-2">
        <br>
            <ul class="list-group">
    `;
    var i=0;
    while (i < filelist.length) {
      var id = filelist[i];
      if (id != 'records' && id != 'comment') {
        if(patientId == id){
          list = list + `<li class="list-group-item active"><a href="/nurse/${page}/${id}" style="color:black;text-decoration:none;">${id}</a></li>`;
        } else {
          list = list + `<li class="list-group-item"><a href="/nurse/${page}/${id}"  style="color:black;text-decoration:none;">${id}</a></li>`;
        }
      }
      i += 1;
    }
    list = list+'</ul></div>';
    return list;
  },patient_list: function (filelist) {
    var list = '';
    if (filelist.length == 0) {
      list = list + `
      <tr>
        <td>담당 환자가 없습니다.</td>
      </tr>`;
      return list;
    } else {
      var i = 0;
      var patient_count = 1;
      while (i < filelist.length) {
        var id = filelist[i];
        if (id != 'records' && id != 'comment') {
          list = list + `
          <tr>
            <th scope="row">${patient_count}</th>
            <td><a href="/nurse/data/${id}">${id}</a></td>
          </tr>`;
          patient_count += 1;
        }
        i = i + 1;
      }
      return list;
    }
  },data_list: function (patient) {
    var list = `
      <tr id='공복혈당'>
        <th scope="row">공복혈당(mg/dL)</th>
        <td>${patient.before_mon}</td>
        <td>${patient.before_tue}</td>
        <td>${patient.before_wed}</td>
        <td>${patient.before_thu}</td>
        <td>${patient.before_fri}</td>
        <td>${patient.before_sat}</td>
        <td>${patient.before_sun}</td>
      </tr>`;
      list += `
      <tr id='식후혈당'>
        <th scope="row">식후혈당(mg/dL)</th>
        <td>${patient.after_mon}</td>
        <td>${patient.after_tue}</td>
        <td>${patient.after_wed}</td>
        <td>${patient.after_thu}</td>
        <td>${patient.after_fri}</td>
        <td>${patient.after_sat}</td>
        <td>${patient.after_sun}</td>
      </tr>`;
    return list;
  },comment: function (comment) {
    if(comment.comments.length == 0){    //코멘트가 없을 경우
      var comment_box = `
      <div class="card">
          <div class="card-body">
              코멘트가 없습니다
          </div>
      </div>
      `;
    } else {                      //코멘트가 있을 경우
      var comment_box = `
      <div class="card">
        <div class="card-body">
          ${comment.comments}
        </div>
      </div>
      `
    }
    return comment_box;
  }

}