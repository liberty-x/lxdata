var request = new XMLHttpRequest();
var userLine = document.getElementById("userLine");
var chartData = document.getElementById('chartData');
var stationChart = document.getElementById('stationChart');
var lineInput;
var response;
var options = {
      pointLabelFontColor: "#ffffff",
      responsive: true,
      animationSteps: 200,
      animationEasing: "easeOutExpo",
      pointLabelFontSize: 18,
      scaleLineColor: "#ffffff",
      scaleLineWidth: 1,
      maintainAspectRatio: false,
      legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
    };

document.getElementById("userForm").addEventListener("submit", function (e){
  e.preventDefault();
  lineInput = userLine.value;
  getLineData(lineInput);
});

function getLineData(lineInput){
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status === 200) {
      response = JSON.parse(request.response);
      printResponse(response);
      makeChart(response);
    }
  };
  request.open("POST", '/apirequest');
  request.send(lineInput);
}

// doesn't need to be displayed in final app
function printResponse(response){
  var htmlString = "";
  chartData.innerHTML = response.datasets.reduce(function(previousValue, currentValue, index, array) {
    previousValue += '<div class="station"><h4>' + currentValue.label + '</h4><p>Gates: ' + currentValue.data[0] + '</p><p>Lifts: ' + currentValue.data[1] + '</p><p>Payphones: ' + currentValue.data[2] + '</p><p>Escalators: ' + currentValue.data[3] + '</p><p>Cash Machines: ' + currentValue.data[4] + '</p></div>';
    return previousValue;
  }, htmlString);
}

function makeChart(response){
  var ctx = stationChart.getContext('2d');
  var chart = new Chart(ctx).Radar(response, options);
}
