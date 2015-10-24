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
      pointLabelFontSize: 12,
      scaleLineColor: "#ffffff",
      scaleLineWidth: 1,
      maintainAspectRatio: false,
      showTooltips: false
    };

var map = L.map('map').setView([51.505, -0.09], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rug1.cig20l3pk00n7v0m6fuktu8wh',
    accessToken: 'pk.eyJ1IjoicnVnMSIsImEiOiJjaWcyMGwzemIwMG1wdjNsd2ZjcWJ3NmQwIn0.j1CaTZiiOCtDl4xfSWA_vw'
}).addTo(map);

document.getElementById("userForm").addEventListener("submit", function (e){
  e.preventDefault();
  lineInput = userLine.value;
  getLineData(lineInput);
});


function getLineData(lineInput){
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status === 200) {
      response = JSON.parse(request.response);
      loadMarkers(response.mapData);
      makeChart(response.stationData);
    }
  };
  request.open("POST", '/apirequest');
  request.send(lineInput);
}


function makeChart(response){
  document.getElementById('title').style.visibility = "visible";
  var ctx = stationChart.getContext('2d');
  var chart = new Chart(ctx).Radar(response, options);
}

function loadMarkers(arr){
  arr.forEach(loadEachMarker);
}

function loadEachMarker(station){
  var marker = L.marker([station.lat, station.lng]).addTo(map);
  marker.bindPopup(station.stationName);

}
