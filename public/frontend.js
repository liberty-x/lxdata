var request = new XMLHttpRequest();
var userLine = document.getElementById("userLine");
var log = document.getElementById('log');
var lineInput;
var response;

document.getElementById("userForm").addEventListener("submit", function (e){
  e.preventDefault();
  lineInput = userLine.value;
  getLineData(lineInput);
});

function getLineData (lineInput) {
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status === 200) {
      response = JSON.parse(request.response);
      printResponse(response);
    }
  };
  request.open("POST", '/apirequest');
  request.send(lineInput);
}

function printResponse (response) {
  var htmlString = "";
  log.innerHTML = response.datasets.reduce(function(previousValue, currentValue, index, array) {
    previousValue += '<div class="station"><h4>' + currentValue.label + '</h4><p>Gates: ' + currentValue.data[0] + '</p><p>Lines: ' + currentValue.data[1] + '</p><p>Payphones: ' + currentValue.data[2] + '</p><p>Escalators: ' + currentValue.data[3] + '</p><p>Cash Machines: ' + currentValue.data[4] + '</p></div>';
    return previousValue;
  }, htmlString);
}
