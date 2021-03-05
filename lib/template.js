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
    var i = 0;
    while(i < filelist.length){
      var id = filelist[i];
      if(patientId == id){
        list = list + `<li class="list-group-item active"><a href="/nurse/${page}/${id}" style="color:black;text-decoration:none;">${id}</a></li>`;
      } else {
        list = list + `<li class="list-group-item"><a href="/nurse/${page}/${id}"  style="color:black;text-decoration:none;">${id}</a></li>`;
      }
      i = i + 1;
      fs.readFile(`data/patients/${id}`, 'utf8', function(err, user){
        user = JSON.parse(user);
      });
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
      while (i < filelist.length) {
        var id = filelist[i];
        list = list + `
          <tr>
            <th scope="row">${i+1}</th>
            <td><a href="nurse/data/${id}">${id}</a></td>
          </tr>`;
        fs.readFile(`./data/patients/${id}`, 'utf8', function(err, user) {
          user = JSON.parse(user);
        });
        i = i + 1;
      }
      return list;
    }
  },data_list: function (patient, BeAf) {
    var list = `
      <tr id=${BeAf}>
        <th scope="row">${BeAf}(mg/dL)</th>
        <td>${patient[0].jan}</td>
        <td>${patient[0].feb}</td>
        <td>${patient[0].mar}</td>
        <td>${patient[0].apr}</td>
        <td>${patient[0].may}</td>
        <td>${patient[0].june}</td>
        <td>${patient[0].july}</td>
        <td>${patient[0].aug}</td>
        <td>${patient[0].sep}</td>
        <td>${patient[0].oct}</td>
        <td>${patient[0].nov}</td>
        <td>${patient[0].dec}</td>
      </tr>`;
    return list;
  },comment: function (comment) {
    var list = `
    <div class="card">
      <div class="card-body">
        ${comment[0].comment}
      </div>
    </div>
    `
    return list;
  }

}