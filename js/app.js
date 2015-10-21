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
    labels: ["Gates", "Lines", "Payphones", "Escalators", "Cash Machines"],
    datasets: []
  };

  return largestStations.reduce(function(previousValue, currentValue, index, array) {
    previousValue.datasets[index] = {
      label: currentValue.commonName.replace(' Underground Station', ''),
      data: [
        app.getValueFromStation(currentValue, 'Gates'),
        currentValue.lines.length,
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
