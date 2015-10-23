var app = module.exports = {};

app.getStationData = function(body){
  var stationArray = JSON.parse(body),
      largestStations = app.getLargestStations(stationArray);
  return app.buildGraphObject(largestStations);
};

app.getLargestStations = function (stationArray) {
  var sortedArray = stationArray.sort(function (a,b) {
        a = app.getValueFromStation(a, 'Gates');
        b = app.getValueFromStation(b, 'Gates');
        if (a > b) {
          return -1;
        }
        if (a < b) {
          return 1;
        }
        return 0;
      });
  return sortedArray.slice(0,4);
};

app.buildGraphObject = function (largestStations) {
  var object = {
    labels: ["Gates", "Lifts", "Payphones", "Escalators", "Cash Machines"],
    datasets: []
  };

  return largestStations.reduce(function(previousValue, currentValue, index, array) {
    previousValue.datasets[index] = {
      label: currentValue.commonName.replace(' Underground Station', ''),
      // add chart formatting (needs to be made dynamic)
      fillColor: "rgba(255, 0, 0, 0.2)",
      strokeColor: "rgba(255, 0, 0, 1)",
      pointColor: "rgba(255, 0, 0, 1)",
      pointStrokeColor: "#fff",
      pointHighlightFill: "#fff",
      pointHighlightStroke: "rgba(220,220,220,1)",
      // end of chart formatting
      data: [
        app.getValueFromStation(currentValue, 'Gates'),
        app.getValueFromStation(currentValue, 'Lifts'),
        app.getValueFromStation(currentValue, 'Payphones'),
        app.getValueFromStation(currentValue, 'Escalators'),
        app.getValueFromStation(currentValue, 'Cash Machines')
      ]
    };
    return previousValue;
  }, object);
};

app.getValueFromStation = function (stationObject, key) {
  key = stationObject.additionalProperties.find(function(element, index, array) {
    if (element.key === key) return true;
  });
  return key ? Number(key.value) : 0; // ternary solves a little bug with Paddington H&C line
};

app.SpecificTubeLine = function (body){
  var all = JSON.parse(body).map(app.onlyGetTubeStops);
  return all;
};

app.onlyGetTubeStops = function (value){
    return {
      stationName: value.commonName,
      lng: value.lon,
      lat: value.lat
    };
};
