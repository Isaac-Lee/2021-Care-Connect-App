var Day = ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
var color = Chart.helpers.color;

//차트에 필요한 데이터
var chartdata_before = document.getElementById("공복혈당");
var before_data = [];
var chartdata_after = document.getElementById("식후혈당");
var after_data = [];
for(var i = 1; i < chartdata_before.children.length; i++) {
    before_data.push(chartdata_before.children[i].childNodes[0].nodeValue);
}
for(var i = 1; i < chartdata_after.children.length; i++) {
    after_data.push(chartdata_after.children[i].childNodes[0].nodeValue);
}
var barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: '공복혈당',
        backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: before_data
    }, {
        label: '식후혈당',
        backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
        borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: after_data
    }]

};

//차트 화면에 출력
window.onload = function () {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myBar = new Chart(ctx, {
        type: 'line',
        data: barChartData,
        options: {
            responsive: true,
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'line Chart'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 80,
                        max: 250
                    }
                }]
            }
        }
    });
};

//차트 1달 추가
document.getElementById('addData').addEventListener('click', function () {
    if (barChartData.datasets.length > 0) {
        var month = Day[barChartData.labels.length % Day.length];
        barChartData.labels.push(month);

        for (var index = 0; index < barChartData.datasets.length; ++index) {
            // window.myBar.addData(randomScalingFactor(), index);
            barChartData.datasets[index].data.push(randomScalingFactor());
        }

        window.myBar.update();
    }
});

//차트 1달 삭제
document.getElementById('removeData').addEventListener('click', function () {
    barChartData.labels.splice(-1, 1); // remove the label first

    barChartData.datasets.forEach(function (dataset) {
        dataset.data.pop();
    });

    window.myBar.update();
});