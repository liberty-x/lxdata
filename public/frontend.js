var request = new XMLHttpRequest ();
var lineInput = document.getElementById("userLine").value;

(function loadMap(){
  var map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'rug1.cig20l3pk00n7v0m6fuktu8wh',
      accessToken: 'pk.eyJ1IjoicnVnMSIsImEiOiJjaWcyMGwzemIwMG1wdjNsd2ZjcWJ3NmQwIn0.j1CaTZiiOCtDl4xfSWA_vw'
  }).addTo(map);
}());

document.getElementById("userForm").addEventListener("submit", function (e){
  e.preventDefault();
  var lineInput = document.getElementById("userLine").value;
  getLineData(lineInput);
});

function getLineData (lineInput) {
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status === 200) {
      var mapData = request.responseText;
      console.log(JSON.parse(mapData).arr);
    }
  };
  request.open("POST", '/apirequest');
  request.send(lineInput);
}
