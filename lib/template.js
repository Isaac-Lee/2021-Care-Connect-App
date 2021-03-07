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
      if (id != 'records') {
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
      while (i < filelist.length) {
        var id = filelist[i];
        if (id != 'records') {
          list = list + `
          <tr>
            <th scope="row">${i+1}</th>
            <td><a href="/nurse/data/${id}">${id}</a></td>
          </tr>`;
        }
        i = i + 1;
      }
      return list;
    }
  },data_list: function (patient, BeAf) {
    var list = `
      <tr id=${BeAf}>
        <th scope="row">${BeAf}(mg/dL)</th>
        <td>${patient[0].MON}</td>
        <td>${patient[0].TUE}</td>
        <td>${patient[0].WED}</td>
        <td>${patient[0].THU}</td>
        <td>${patient[0].FRI}</td>
        <td>${patient[0].SAT}</td>
        <td>${patient[0].SUN}</td>
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